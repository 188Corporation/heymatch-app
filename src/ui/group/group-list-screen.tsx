import { useGroupList } from 'api/reads'
import dayjs from 'dayjs'
import { CloseSvg, GroupsPlaceHolderSvg, SearchSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { GroupMember, Group_v2, JobTitle } from 'infra/types'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import { DateData } from 'react-native-calendars'
import Modal from 'react-native-modal'
import { openSettings } from 'react-native-permissions'
import { useStores } from 'store/globals'
import { PermissionType } from 'store/permission'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { CalendarModal } from 'ui/common/CalenderModal'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { Body, Body2, Caption, DescBody2, H2, H3 } from 'ui/common/text'

export const GroupListScreen = observer(() => {
  const { locationStore, permissionStore, alertStore, groupListStore } =
    useStores()

  const [filterParams, setFilterParams] = useState('')
  const [isVisibleDateFilterModal, setIsVisibleDateFilterModal] =
    useState(false)
  const [isVisibleMembersFilterModal, setIsVisibleMembersFilterModal] =
    useState(false)

  const [isVisibleDistanceFilterModal, setIsVisibleDistanceFilterModal] =
    useState(false)

  const { data: groupLists, size, setSize } = useGroupList(filterParams)

  const getDisplayedMembersFilter = () => {
    return groupListStore.membersFilter
      ? groupListStore.membersFilter < 5
        ? `${groupListStore.membersFilter}명`
        : `${groupListStore.membersFilter}명 이상`
      : '멤버수'
  }

  const getDisplayedDistanceFilter = () => {
    return groupListStore.distanceFilter
      ? groupListStore.distanceFilter === 500
        ? `${groupListStore.distanceFilter}m 이내`
        : `${groupListStore.distanceFilter / 1000}km 이내`
      : '거리'
  }

  const getDisplayedDateFilter = () => {
    if (!groupListStore.dateFilter) return '날짜'
    return `${dayjs(groupListStore.dateFilter.startDate).format(
      'M월D일',
    )}-${dayjs(groupListStore.dateFilter.endDate).format('M월D일')}`
  }

  useEffect(() => {
    locationStore.getLocation(true)
  }, [locationStore])

  useEffect(() => {
    let params = ''
    if (groupListStore.dateFilter) {
      params = `${params}&meetup_date_after=${groupListStore.dateFilter.startDate}&meetup_date_before=${groupListStore.dateFilter.endDate}`
    }
    if (groupListStore.distanceFilter && locationStore._location) {
      params = `${params}&dist=${groupListStore.distanceFilter}&point=${locationStore._location.lng},${locationStore._location.lat}`
    }
    if (groupListStore.membersFilter) {
      params = `${params}&member_num=${groupListStore.membersFilter}`
    }
    setFilterParams(params)
  }, [
    groupListStore.dateFilter,
    groupListStore.distanceFilter,
    groupListStore.membersFilter,
    locationStore._location,
  ])

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
            navigation.navigate('SearchPlaceResultsScreen')
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
                  selected={!!groupListStore.dateFilter}
                  onPress={() => setIsVisibleDateFilterModal(true)}
                >
                  <FilterTypography filter={!!groupListStore.dateFilter}>
                    {getDisplayedDateFilter()}
                  </FilterTypography>
                  <TouchableOpacity
                    onPress={() => groupListStore.setDateFilter(null)}
                  >
                    {!!groupListStore.dateFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>
                <FilterTouchable
                  selected={!!groupListStore.membersFilter}
                  onPress={() => setIsVisibleMembersFilterModal(true)}
                >
                  <FilterTypography filter={!!groupListStore.membersFilter}>
                    {getDisplayedMembersFilter()}
                  </FilterTypography>
                  <TouchableOpacity
                    onPress={() => groupListStore.setMembersFilter(null)}
                  >
                    {!!groupListStore.membersFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>

                <FilterTouchable
                  selected={!!groupListStore.distanceFilter}
                  onPress={() => setIsVisibleDistanceFilterModal(true)}
                >
                  <FilterTypography filter={!!groupListStore.distanceFilter}>
                    {getDisplayedDistanceFilter()}
                  </FilterTypography>
                  <TouchableOpacity
                    onPress={() => {
                      groupListStore.setDistanceFilter(null)
                      groupListStore.setSearchPlaceKeyword('')
                    }}
                  >
                    {!!groupListStore.distanceFilter && <CloseSvg />}
                  </TouchableOpacity>
                </FilterTouchable>
              </FilterButtonContainer>
            </ScrollView>
          </View>
          {groupLists && groupLists[0].data.count ? (
            <>
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
                ListFooterComponent={<ActivityIndicator size='large' />}
              />
            </>
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: 100,
              }}
            >
              <GroupsPlaceHolderSvg />
              <H3>생성된 그룹이 없어요</H3>
              <DescBody2>헤이매치의 첫 번째 그룹이 되어주세요😊</DescBody2>
            </View>
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
            setValue={(v) => groupListStore.setMembersFilter(v)}
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
            setValue={(v) => groupListStore.setDistanceFilter(v)}
          />
        </FilterModal>
        <FilterModal
          isVisible={isVisibleDateFilterModal}
          onClose={() => setIsVisibleDateFilterModal(false)}
        >
          <PeriodCalenderModal
            setIsVisibleDateFilterModal={setIsVisibleDateFilterModal}
          />
        </FilterModal>
      </Container>
    </KeyboardAvoidingView>
  )
})

const PeriodCalenderModal = ({
  setIsVisibleDateFilterModal,
}: {
  setIsVisibleDateFilterModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { groupListStore } = useStores()
  const [selectedValue, setSelectedValue] = useState<{
    startDate?: string
    endDate?: string
  } | null>(groupListStore.dateFilter)

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
    }
    period[endDate] = {
      endingDay: true,
      selected: true,
      color: '#FF4369',
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
        },
      }
    }
    if (selectedValue.startDate && selectedValue.endDate) {
      return getDatesPeriod(selectedValue.startDate, selectedValue.endDate)
    }
  }

  return (
    <CalendarModal
      disabled={!selectedValue?.startDate || !selectedValue?.endDate}
      markedDates={getMarkedDatesPeriod()}
      markingType='period'
      onDayPress={updateSortedDate}
      onSelect={() => {
        groupListStore.setDateFilter(selectedValue)
        setIsVisibleDateFilterModal(false)
      }}
      onClose={() => {
        groupListStore.setDateFilter(null)
        setIsVisibleDateFilterModal(false)
      }}
    />
  )
}

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
  setValue: (v: any) => void
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
