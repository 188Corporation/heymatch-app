import { SearchSvg } from 'image'
import { Colors } from 'infra/colors'
import { Group_v2 } from 'infra/types'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, Caption, H3 } from 'ui/common/text'

export const GroupList = () => {
  const [searchPlace, setSearchPlace] = useState<string>('')
  const [dateFilter, setDateFilter] = useState<{
    startDate: Date
    endDate: Date
  } | null>(null)
  const [membersFilter, setMembersFilter] = useState<number | null>(null)
  const [heightFilter, setHeightFilter] = useState<number | null>(null)
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null)

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
          <FilterTouchable selected={!!membersFilter}>
            <Body2>멤버수</Body2>
          </FilterTouchable>
          <FilterTouchable selected={!!heightFilter}>
            <Body2>키</Body2>
          </FilterTouchable>
          <FilterTouchable selected={!!distanceFilter}>
            <Body2>거리</Body2>
          </FilterTouchable>
        </FilterButtonContainer>
        <GroupItem />
        <GroupItem />
        <GroupItem />
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
