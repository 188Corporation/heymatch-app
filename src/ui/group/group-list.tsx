import { useGroupList } from 'api/reads'
import dayjs from 'dayjs'
import { SearchSvg, Verified } from 'image'
import { Colors } from 'infra/colors'
import { GroupMember, Group_v2, JobTitle } from 'infra/types'
import React, { ReactNode, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
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

export const GroupList = () => {
  const { data: groupList } = useGroupList()

  const [searchPlace, setSearchPlace] = useState<string>('')
  const [dateFilter, setDateFilter] = useState<{
    startDate?: string
    endDate?: string
  } | null>(null)
  const [isVisibleDateFilterModal, setIsVisibleDateFilterModal] =
    useState(false)
  const [membersFilter, setMembersFilter] = useState<number | null>(null)
  const [isVisibleMembersFilterModal, setIsVisibleMembersFilterModal] =
    useState(false)
  const [heightFilter, setHeightFilter] = useState<{
    minHeight: number
    maxHeight: number
  } | null>(null)
  const [isVisibleHeightFilterModal, setIsVisibleHeightFilterModal] =
    useState(false)
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null)
  const [isVisibleDistanceFilterModal, setIsVisibleDistanceFilterModal] =
    useState(false)
  const getDisplayedMembersFilter = () => {
    return membersFilter
      ? membersFilter < 5
        ? `${membersFilter}명`
        : `${membersFilter}명 이상`
      : '멤버수'
  }

  const getDisplayedHeightFilter = () => {
    if (!heightFilter) return '키'
    if (heightFilter.minHeight === 0 && heightFilter.maxHeight === 150)
      return '150cm 이하'
    else if (heightFilter.minHeight === 181 && heightFilter.maxHeight === 300)
      return '181cm 이상'
    else return `${heightFilter.minHeight}cm ~ ${heightFilter.maxHeight}cm`
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

  return (
    <>
      <FlexScrollView>
        <Container>
          <TopInsetSpace />
          <SearchInput
            value={searchPlace}
            onValueChange={(v: string) => setSearchPlace(v)}
          />
          <FilterButtonContainer>
            <FilterTouchable
              selected={!!dateFilter}
              onPress={() => setIsVisibleDateFilterModal(true)}
            >
              <FilterTypography filter={!!dateFilter}>
                {getDisplayedDateFilter()}
              </FilterTypography>
            </FilterTouchable>
            <FilterTouchable
              selected={!!membersFilter}
              onPress={() => setIsVisibleMembersFilterModal(true)}
            >
              <FilterTypography filter={!!membersFilter}>
                {getDisplayedMembersFilter()}
              </FilterTypography>
            </FilterTouchable>
            <FilterTouchable
              selected={!!heightFilter}
              onPress={() => setIsVisibleHeightFilterModal(true)}
            >
              <FilterTypography filter={!!heightFilter}>
                {getDisplayedHeightFilter()}
              </FilterTypography>
            </FilterTouchable>
            <FilterTouchable
              selected={!!distanceFilter}
              onPress={() => setIsVisibleDistanceFilterModal(true)}
            >
              <FilterTypography filter={!!distanceFilter}>
                {getDisplayedDistanceFilter()}
              </FilterTypography>
            </FilterTouchable>
          </FilterButtonContainer>
          {groupList &&
            groupList.results.map((group) => {
              return <GroupItem key={String(group.created_at)} group={group} />
            })}
          <FilterModal isVisible={isVisibleMembersFilterModal}>
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
          <FilterModal isVisible={isVisibleHeightFilterModal}>
            <ModalContent
              title='키'
              onClose={() => setIsVisibleHeightFilterModal(false)}
              formList={[
                {
                  label: '150cm 이하',
                  value: { minHeight: 0, maxHeight: 150 },
                },
                {
                  label: '151cm ~ 160cm',
                  value: { minHeight: 151, maxHeight: 160 },
                },
                {
                  label: '161cm ~ 170cm',
                  value: { minHeight: 161, maxHeight: 170 },
                },
                {
                  label: '171cm ~ 180cm',
                  value: { minHeight: 171, maxHeight: 180 },
                },
                {
                  label: '181cm 이상',
                  value: { minHeight: 181, maxHeight: 300 },
                },
              ]}
              setValue={setHeightFilter}
            />
          </FilterModal>
          <FilterModal isVisible={isVisibleDistanceFilterModal}>
            <ModalContent
              title='거리'
              onClose={() => setIsVisibleDistanceFilterModal(false)}
              formList={[
                { label: '500m 이내', value: 500 },
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
                  label: '50km 이내',
                  value: 50000,
                },
              ]}
              setValue={setDistanceFilter}
            />
          </FilterModal>
          <FilterModal isVisible={isVisibleDateFilterModal}>
            <CalendarModal
              value={dateFilter}
              onClose={() => setIsVisibleDateFilterModal(false)}
              setValue={setDateFilter}
            />
          </FilterModal>
        </Container>
      </FlexScrollView>
    </>
  )
}

const SearchInput = ({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (v: string) => void
}) => {
  return (
    <View>
      <View style={{ position: 'absolute', left: 0, top: 10 }}>
        <SearchSvg />
      </View>
      <TextInput
        value={value}
        onChangeText={onValueChange}
        placeholder='장소를 검색해볼까요?'
        style={{
          width: '100%',
          height: 48,
          fontSize: 20,
          fontWeight: '700',
          paddingLeft: 32,
        }}
      />
    </View>
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
    const a = _group.group_members.some(
      (member) =>
        member.user.verified_company_name || member.user.verified_school_name,
    )
    console.log(
      _group.group_members.map((x) => [
        x.user.verified_company_name,
        x.user.verified_school_name,
      ]),
      a,
    )
    return a
  }

  return (
    <GroupItemContainer>
      <Caption style={{ color: Colors.primary.red, marginBottom: 2 }}>
        만남 날짜 D-{getDifferenceInDays(group.meetup_date)}
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
            <Verified
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
  children,
}: {
  isVisible: boolean
  children: ReactNode
}) => {
  return (
    <Modal
      isVisible={isVisible}
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
}: {
  title: string
  onClose: () => void
  formList: { value: any; label: string }[]
  setValue: React.Dispatch<React.SetStateAction<any | null>>
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  // 디폴트값은 어떻게 결정할까?
  const [selectedValue, setSelectedValue] = useState<{
    value: any
    label: string
  }>(formList[2])
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
      setSelectedValue(null)
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
          customContainerStyle: { borderRadius: 12 },
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

function getDifferenceInDays(meetUpDate: string) {
  const date1 = new Date(meetUpDate)
  const date2 = new Date()
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))
  return diffInDays
}
