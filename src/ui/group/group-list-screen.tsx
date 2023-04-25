import { useGroupList } from 'api/reads'
import dayjs from 'dayjs'
import { CloseSvg, SearchSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { GroupMember, Group_v2, JobTitle } from 'infra/types'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { ReactNode, useEffect, useState } from 'react'
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { openSettings } from 'react-native-permissions'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { Body, Body2, Caption, H2, H3 } from 'ui/common/text'
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
}
LocaleConfig.defaultLocale = 'ko'

export const GroupListScreen = observer(() => {
  const { locationStore, permissionStore, alertStore, groupListStore } =
    useStores()

  const [filterParams, setFilterParams] = useState('')

  const [dateFilter, setDateFilter] = useState<{
    startDate?: string
    endDate?: string
  } | null>(null)
  const [membersFilter, setMembersFilter] = useState<number | null>(null)
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null)

  const [isVisibleDateFilterModal, setIsVisibleDateFilterModal] =
    useState(false)
  const [isVisibleMembersFilterModal, setIsVisibleMembersFilterModal] =
    useState(false)

  const [isVisibleDistanceFilterModal, setIsVisibleDistanceFilterModal] =
    useState(false)

  const { data: groupLists, size, setSize } = useGroupList(filterParams)

  const getDisplayedMembersFilter = () => {
    return membersFilter
      ? membersFilter < 5
        ? `${membersFilter}명`
        : `${membersFilter}명 이상`
      : '멤버수'
  }

  const getDisplayedDistanceFilter = () => {
    return distanceFilter
      ? distanceFilter === 500
        ? `${distanceFilter}m 이내`
        : `${distanceFilter / 1000}km 이내`
      : '거리'
  }

  const getDisplayedDateFilter = () => {
    if (!dateFilter) return '날짜'
    return `${dayjs(dateFilter.startDate).format('M월D일')}-${dayjs(
      dateFilter.endDate,
    ).format('M월D일')}`
  }

  useEffect(() => {
    locationStore.getLocation(true)
  }, [locationStore])

  useEffect(() => {
    let params = ''
    if (dateFilter) {
      params = `${params}&meetup_date_after=${dateFilter.startDate}&meetup_date_before=${dateFilter.endDate}`
    }
    if (distanceFilter && locationStore._location) {
      params = `${params}&dist=${distanceFilter}&point=${locationStore._location.lng},${locationStore._location.lat}`
    }
    if (membersFilter) {
      params = `${params}&member_num=${membersFilter}`
    }
    setFilterParams(params)
  }, [dateFilter, distanceFilter, locationStore._location, membersFilter])

  useEffect(() => {
    if (permissionStore.location === 'blocked') {
      alertStore.open({
        title: '헤이매치 필수 권한',
        body: '헤이매치를 시작하려면 위치 권한이 필요해요.',
        mainButton: '권한 설정하러 가기',
        onMainPress: () => openSettings(),
      })
    } else {
      permissionStore
        .request(PermissionType.location)
        .then(() => locationStore.getLocation(true))
    }
  }, [permissionStore, locationStore, alertStore])

  return (
    <KeyboardAvoidingView>
      <Container>
        <TopInsetSpace />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchPlaceResults')
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'center',
            height: 48,
          }}
        >
          <SearchSvg />
          <H2
            style={{
              marginLeft: 4,
              color: groupListStore.searchPlaceKeyword
                ? Colors.black
                : Colors.gray.v300,
            }}
          >
            {groupListStore.searchPlaceKeyword || '장소를 검색해볼까요?'}
          </H2>
        </TouchableOpacity>
        <>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FilterButtonContainer>
                <FilterTouchable
                  selected={!!dateFilter}
                  onPress={() => setIsVisibleDateFilterModal(true)}
                >
                  <FilterTypography filter={!!dateFilter}>
                    {getDisplayedDateFilter()}
                  </FilterTypography>
                  <TouchableOpacity onPress={() => setDateFilter(null)}>
                    {!!dateFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>
                <FilterTouchable
                  selected={!!membersFilter}
                  onPress={() => setIsVisibleMembersFilterModal(true)}
                >
                  <FilterTypography filter={!!membersFilter}>
                    {getDisplayedMembersFilter()}
                  </FilterTypography>
                  <TouchableOpacity onPress={() => setMembersFilter(null)}>
                    {!!membersFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>

                <FilterTouchable
                  selected={!!distanceFilter}
                  onPress={() => setIsVisibleDistanceFilterModal(true)}
                >
                  <FilterTypography filter={!!distanceFilter}>
                    {getDisplayedDistanceFilter()}
                  </FilterTypography>
                  <TouchableOpacity onPress={() => setDistanceFilter(null)}>
                    {!!distanceFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>
              </FilterButtonContainer>
            </ScrollView>
          </View>
          {groupLists && (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={groupLists
                .map((groupList) => groupList.data.results)
                .flat()}
              renderItem={(group) => {
                return (
                  <GroupItem
                    key={String(group.item.created_at)}
                    group={group.item}
                  />
                )
              }}
              onEndReached={() => setSize(size + 1)}
            />
          )}
        </>

        <FilterModal
          isVisible={isVisibleMembersFilterModal}
          onClose={() => setIsVisibleMembersFilterModal(false)}
        >
          <ModalContent
            title='멤버수'
            onClose={() => setIsVisibleMembersFilterModal(false)}
            formList={[
              { label: '1명', value: 1 },
              { label: '2명', value: 2 },
              { label: '3명', value: 3 },
              { label: '4명', value: 4 },
              { label: '5명 이상', value: 5 },
            ]}
            setValue={setMembersFilter}
          />
        </FilterModal>

        <FilterModal
          isVisible={isVisibleDistanceFilterModal}
          onClose={() => setIsVisibleDistanceFilterModal(false)}
        >
          <ModalContent
            title='거리'
            onClose={() => setIsVisibleDistanceFilterModal(false)}
            formList={[
              {
                label: '1km 이내',
                value: 1000,
              },
              {
                label: '5km 이내',
                value: 5000,
              },
              {
                label: '10km 이내',
                value: 10000,
              },
              {
                label: '20km 이내',
                value: 20000,
              },
              {
                label: '50km 이내',
                value: 50000,
              },
            ]}
            setValue={setDistanceFilter}
          />
        </FilterModal>
        <FilterModal
          isVisible={isVisibleDateFilterModal}
          onClose={() => setIsVisibleDateFilterModal(false)}
        >
          <CalendarModal
            value={dateFilter}
            onClose={() => setIsVisibleDateFilterModal(false)}
            setValue={setDateFilter}
          />
        </FilterModal>
      </Container>
    </KeyboardAvoidingView>
  )
})

const GroupItem = ({ group }: { group: Group_v2 }) => {
  const convertJobtitle = (jobTitle: JobTitle) => {
    switch (jobTitle) {
      case 'employee':
        return '직장인'
      case 'college_student':
        return '대학(원)생'
      case 'businessman':
        return '사업가'
      case 'part_time':
        return '아르바이트'
      case 'self_employed':
        return '자영업'
      case 'etc':
        return '기타'
    }
  }

  const getOrganization = (groupMember: GroupMember) => {
    const verifiedSchoolName = groupMember.user.verified_school_name
    const verifiedCompanyName = groupMember.user.verified_company_name
    if (!verifiedSchoolName && !verifiedCompanyName) {
      return groupMember.user.job_title
        ? convertJobtitle(groupMember.user.job_title)
        : '기타'
    }
    if (verifiedCompanyName) {
      return verifiedCompanyName
    }
    if (verifiedSchoolName) {
      return verifiedSchoolName
    }
  }

  const isVerifiedGroup = (_group: Group_v2): boolean => {
    return _group.group_members.some(
      (member) =>
        member.user.verified_company_name || member.user.verified_school_name,
    )
  }

  return (
    <GroupItemContainer>
      <Caption style={{ color: Colors.primary.red, marginBottom: 2 }}>
        {toMonthDayString(group.meetup_date)}
      </Caption>
      <H3 style={{ marginBottom: 16 }}>{group.title}</H3>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ProfilePhotoContainer style={{ marginRight: 6 }}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
            source={{
              uri: group.group_members[0].user.user_profile_images[0]
                .thumbnail_blurred,
            }}
          />
        </ProfilePhotoContainer>
        <ProfilePhotoContainer
          style={{
            marginRight: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Caption style={{ color: Colors.gray.v400 }}>
            +{group.group_members.length - 1}
          </Caption>
        </ProfilePhotoContainer>
        <View
          style={{
            height: '100%',
            width: 127,
            paddingVertical: 7,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <VerifiedSvg
              style={{ marginRight: 4 }}
              fill={
                isVerifiedGroup(group) ? Colors.primary.blue : Colors.gray.v400
              }
            />
            <Caption style={{ color: Colors.gray.v400 }} numberOfLines={1}>
              {group.group_members
                .map((groupMember) => getOrganization(groupMember))
                .join('/')}
            </Caption>
          </View>

          <GroupDesc_v2 data={group} />
        </View>
      </View>
    </GroupItemContainer>
  )
}

const Container = styled(View)`
  margin-bottom: 155px;
  padding: 33px 20px 0px 20px;
`

const FilterButtonContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const FilterTouchable = styled(TouchableOpacity)<{ selected: boolean }>`
  border-radius: 12px;
  background-color: ${(p) =>
    p.selected ? Colors.primary.blueDisabled : Colors.gray.v100};
  width: auto;
  height: 37px;
  padding: 8px 16px 8px 16px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const GroupItemContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 162px;
  padding: 20px 24px 24px 24px;
  background-color: ${Colors.gray.v100};
  border-radius: 20px;
  margin-bottom: 12px;
`

const ProfilePhotoContainer = styled(View)`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  background-color: ${Colors.gray.v200};
`

const FilterModal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{
        margin: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
    >
      {isVisible && <>{children}</>}
    </Modal>
  )
}

const ModalContent = ({
  title,
  onClose,
  formList,
  setValue,
  defalutIndex,
}: {
  title: string
  onClose: () => void
  formList: { value: any; label: string }[]
  setValue: React.Dispatch<React.SetStateAction<any | null>>
  defalutIndex?: number
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const [selectedValue, setSelectedValue] = useState<{
    value: any
    label: string
  }>(defalutIndex ? formList[defalutIndex] : formList[0])
  return (
    <FilterModalContainer isOpen={isOpenDropdown}>
      <H2 style={{ marginLeft: 8, marginBottom: 10 }}>{title}</H2>
      {!isOpenDropdown ? (
        <FilterModalDropdownItem onPress={() => setIsOpenDropdown(true)}>
          <Body style={{ marginRight: 'auto', color: Colors.gray.v400 }}>
            {selectedValue.label}
          </Body>
        </FilterModalDropdownItem>
      ) : (
        <View style={{ backgroundColor: Colors.gray.v100, borderRadius: 12 }}>
          {formList.map((form) => {
            return (
              <FilterModalDropdownItem
                key={form.label}
                onPress={() => {
                  setIsOpenDropdown(false)
                  setSelectedValue(form)
                }}
              >
                <Body style={{ marginRight: 'auto', color: Colors.gray.v400 }}>
                  {form.label}
                </Body>
              </FilterModalDropdownItem>
            )
          })}
        </View>
      )}
      <View style={{ flexDirection: 'row', width: '50%', marginTop: 'auto' }}>
        <Button
          text='다음에'
          textColor={Colors.gray.v400}
          color={Colors.white}
          onPress={onClose}
        />
        <Button
          text='선택하기'
          textColor={Colors.white}
          color={Colors.primary.blue}
          onPress={() => {
            setValue(selectedValue.value)
            onClose()
          }}
        />
      </View>
    </FilterModalContainer>
  )
}

const FilterModalContainer = styled(View)<{ isOpen: boolean }>`
  padding: 40px 20px 44px 20px;
  width: 100%;
  height: ${(p) => (p.isOpen ? '490px' : '270px')};
  background-color: #fff;
  margin-top: auto;
  border-radius: 40px;
`
const FilterModalDropdownItem = styled(TouchableOpacity)`
  height: 56px;
  background-color: ${Colors.gray.v100};
  align-items: center;
  padding-horizontal: 20px
  padding-vertical: 16px
  border-radius: 12px
`

const CalendarModal = ({
  value,
  onClose,
  setValue,
}: {
  value: {
    startDate?: string
    endDate?: string
  } | null
  onClose: () => void
  setValue: React.Dispatch<
    React.SetStateAction<{
      startDate?: string
      endDate?: string
    } | null>
  >
}) => {
  const [selectedValue, setSelectedValue] = useState<{
    startDate?: string
    endDate?: string
  } | null>(value)

  const updateSortedDate = (date: DateData) => {
    if (!selectedValue?.startDate) {
      setSelectedValue({ startDate: date.dateString })
      return
    }
    if (
      selectedValue.startDate &&
      !selectedValue.endDate &&
      selectedValue.startDate === date.dateString
    ) {
      setSelectedValue((prev) => {
        return { ...prev, endDate: date.dateString }
      })
      return
    }
    if (selectedValue.startDate && !selectedValue.endDate) {
      setSelectedValue((prev) => {
        if (isEarlier(selectedValue.startDate!, date.dateString)) {
          return {
            ...prev,
            endDate: date.dateString,
          }
        } else {
          return {
            startDate: date.dateString,
            endDate: selectedValue.startDate,
          }
        }
      })
      return
    }
    if (selectedValue.startDate && selectedValue.endDate) {
      setSelectedValue({ startDate: date.dateString })
      return
    }
  }

  const getDatesPeriod = (startDate: string, endDate: string) => {
    const period = {} as any
    period[startDate] = {
      startingDay: true,
      selected: true,
      color: '#FF4369',
      customContainerStyle: { borderRadius: 12 },
    }
    period[endDate] = {
      endingDay: true,
      selected: true,
      color: '#FF4369',
      customContainerStyle: { borderRadius: 12 },
    }
    getDates(startDate, endDate).forEach((date) => {
      period[date] = {
        selected: true,
        color: '#FF4369',
      }
    })
    return period
  }

  const getMarkedDatesPeriod = () => {
    if (!selectedValue) return {}
    if (selectedValue.startDate && !selectedValue.endDate) {
      return {
        [selectedValue.startDate]: {
          startingDay: true,
          selected: true,
          color: '#FF4369',
          customContainerStyle: {
            container: { borderRadius: 12 },
          },
        },
      }
    }
    if (selectedValue.startDate && selectedValue.endDate) {
      return getDatesPeriod(selectedValue.startDate, selectedValue.endDate)
    }
  }

  return (
    <CalenderModalContainer>
      <View style={{ marginBottom: 32 }}>
        <Calendar
          monthFormat={'yyyy년 M월'}
          minDate={String(new Date())}
          markingType={'period'}
          markedDates={getMarkedDatesPeriod()}
          onDayPress={(date: DateData) => {
            updateSortedDate(date)
          }}
          theme={{
            arrowColor: Colors.black,
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', width: '50%', marginTop: 'auto' }}>
        <Button
          text='다음에'
          textColor={Colors.gray.v400}
          color={Colors.white}
          onPress={() => {
            onClose()
          }}
        />
        <Button
          text='선택하기'
          textColor={Colors.white}
          color={Colors.primary.blue}
          disabled={!selectedValue?.startDate || !selectedValue?.endDate}
          onPress={() => {
            setValue(selectedValue)
            onClose()
          }}
        />
      </View>
    </CalenderModalContainer>
  )
}

const CalenderModalContainer = styled(View)`
  padding: 32px 45px 44px 45px;
  width: 100%;
  margin-top: auto;
  border-radius: 40px;
  background-color: #fff;
`

function getDates(startDate: string, endDate: string) {
  let dates = []
  let currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().slice(0, 10))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates.slice(1, -1)
}

function isEarlier(startDate: string, endDate: string) {
  return new Date(startDate).toISOString() < new Date(endDate).toISOString()
}

const FilterTypography = styled(Body2)<{ filter: boolean }>`
  color: ${(p) => (p.filter ? Colors.primary.blueD1 : Colors.black)};
  font-weight: ${(p) => (p.filter ? '600' : '400')};
`

function toMonthDayString(meetUpDate: string) {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const month = new Date(meetUpDate).getMonth() + 1
  const date = new Date(meetUpDate).getDate()
  const dayOfWeek = weekdays[new Date(meetUpDate).getDay()]
  return `${month}월 ${date}일 (${dayOfWeek})`
}
