import { SearchSvg } from 'image'
import { Colors } from 'infra/colors'
import { Group_v2 } from 'infra/types'
import React, { ReactNode, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import styled from 'styled-components'
import { Button } from 'ui/common/button'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body, Body2, Caption, H2, H3 } from 'ui/common/text'

export const GroupList = () => {
  const [searchPlace, setSearchPlace] = useState<string>('')
  const [dateFilter, setDateFilter] = useState<{
    startDate: Date
    endDate: Date
  } | null>(null)
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

  return (
    <>
      <Container>
        <TopInsetSpace />
        <SearchInput
          value={searchPlace}
          onValueChange={(v: string) => setSearchPlace(v)}
        />
        <FilterButtonContainer>
          <FilterTouchable selected={!!dateFilter}>
            <Body2>날짜</Body2>
          </FilterTouchable>
          <FilterTouchable
            selected={!!membersFilter}
            onPress={() => setIsVisibleMembersFilterModal(true)}
          >
            <Body2
              style={{
                color: membersFilter ? Colors.primary.blueD1 : Colors.black,
                fontWeight: membersFilter ? '600' : '400',
              }}
            >
              {getDisplayedMembersFilter()}
            </Body2>
          </FilterTouchable>
          <FilterTouchable
            selected={!!heightFilter}
            onPress={() => setIsVisibleHeightFilterModal(true)}
          >
            <Body2
              style={{
                color: heightFilter ? Colors.primary.blueD1 : Colors.black,
                fontWeight: heightFilter ? '600' : '400',
              }}
            >
              {getDisplayedHeightFilter()}
            </Body2>
          </FilterTouchable>
          <FilterTouchable
            selected={!!distanceFilter}
            onPress={() => setIsVisibleDistanceFilterModal(true)}
          >
            <Body2
              style={{
                color: distanceFilter ? Colors.primary.blueD1 : Colors.black,
                fontWeight: distanceFilter ? '600' : '400',
              }}
            >
              {getDisplayedDistanceFilter()}
            </Body2>
          </FilterTouchable>
        </FilterButtonContainer>
        <GroupItem />
        <GroupItem />
        <GroupItem />
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
              { label: '150cm 이하', value: { minHeight: 0, maxHeight: 150 } },
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
      </Container>
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

const GroupItem = ({ group }: { group?: Group_v2 }) => {
  return (
    <GroupItemContainer>
      <Caption style={{ color: Colors.primary.red, marginBottom: 2 }}>
        만남 날짜 D-2
      </Caption>
      <H3 style={{ marginBottom: 16 }}>안녕하세요</H3>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ProfilePhoto style={{ marginRight: 6 }} />
        <ProfilePhoto style={{ marginRight: 20 }} />
        <View
          style={{
            height: '100%',
            width: 127,
            paddingVertical: 7,
          }}
        >
          <Caption
            style={{ color: Colors.gray.v400, marginBottom: 8 }}
            numberOfLines={1}
          >
            삼성전자/SK그룹/카카오
          </Caption>
          <Caption style={{ color: Colors.gray.v400 }}>3명·평균 28세</Caption>
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

const ProfilePhoto = styled(View)`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  background-color: ${Colors.gray.v200};
`

const CalenderModal = () => {}

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
