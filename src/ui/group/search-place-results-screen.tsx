import { useGeocoding, useSearchPlace } from 'api/reads'
import { CancelSvg, PinSvg, SearchSvg } from 'image'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body, DescBody2, H3 } from 'ui/common/text'

export const SearchPlaceResultsScreen = observer(() => {
  const { locationStore, groupListStore } = useStores()
  const { data: searchPlaceList, isLoading: isLoadingSearchPlaceList } =
    useSearchPlace(groupListStore.searchPlaceKeyword)
  const [address, setAddress] = useState('')
  const { data: geocoding, isLoading: isLoadingGeocoding } =
    useGeocoding(address)

  useEffect(() => {
    if (isLoadingGeocoding) return
    if (!geocoding || !groupListStore.searchPlaceKeyword || !address) return
    const { x: longitude, y: latitude } = geocoding.addresses[0]

    locationStore._onLocationChange({
      coords: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        accuracy: 100,
        altitude: null,
        heading: null,
        speed: null,
      },
      timestamp: new Date().getTime(),
    })
  }, [
    address,
    geocoding,
    groupListStore.searchPlaceKeyword,
    isLoadingGeocoding,
    locationStore,
  ])

  const renderSearchList = () => {
    if (isLoadingSearchPlaceList) {
      return (
        <>
          <Body>잠시만 기다려주세요</Body>
        </>
      )
    } else {
      if (groupListStore.searchPlaceKeyword === '') {
        return <HotPlaces />
      }

      if (
        !searchPlaceList ||
        !searchPlaceList.items ||
        searchPlaceList.items.length === 0
      ) {
        return (
          <>
            <Body>검색결과가 없습니다</Body>
          </>
        )
      }
      return (
        <>
          {searchPlaceList &&
            searchPlaceList.items.map((searchPlace) => {
              return (
                <TouchableOpacity
                  key={`${searchPlace.mapx}-${searchPlace.mapy}`}
                  style={{ width: '100%' }}
                  onPress={() => {
                    setAddress(searchPlace.address)
                    groupListStore.setSearchPlaceKeyword(
                      searchPlace.title.replace(/<[^>]*>/g, ''),
                    )
                    navigation.goBack()
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: 8,
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 2,
                      }}
                    >
                      <PinSvg fill={Colors.gray.v400} />
                    </View>
                    <View style={{ marginLeft: 4, width: '90%' }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Body>{searchPlace.title.replace(/<[^>]*>/g, '')}</Body>
                        <DescBody2 style={{ marginLeft: 'auto' }}>
                          {searchPlace.category.split('>')[0]}
                        </DescBody2>
                      </View>
                      <Body>{searchPlace.address}</Body>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
        </>
      )
    }
  }
  return (
    <Container>
      <TopInsetSpace />
      <SearchInput
        handleEndEditing={(v) => groupListStore.setSearchPlaceKeyword(v)}
        handleCancel={() => {
          navigation.goBack()
        }}
      />
      {renderSearchList()}
    </Container>
  )
})

const Container = styled(View)`
  padding: 33px 20px 0px 20px;
`

const SearchInput = observer(
  ({
    handleEndEditing,
    handleCancel,
  }: {
    handleEndEditing: (v: string) => void
    handleCancel: () => void
  }) => {
    const [text, setText] = useState('')

    return (
      <View>
        <View style={{ position: 'absolute', left: 0, top: 10 }}>
          <SearchSvg />
        </View>
        <TextInput
          autoFocus
          value={text}
          onChangeText={(v) => setText(v)}
          onEndEditing={() => {
            handleEndEditing(text)
          }}
          placeholder='장소를 검색해볼까요?'
          placeholderTextColor={Colors.gray.v300}
          style={{
            width: '100%',
            height: 48,
            fontSize: 20,
            fontWeight: '700',
            paddingLeft: 32,
          }}
        />
        <TouchableOpacity
          onPress={handleCancel}
          style={{ position: 'absolute', right: 0, top: 10 }}
        >
          <CancelSvg />
        </TouchableOpacity>
      </View>
    )
  },
)

export const HotPlaces = () => {
  return (
    <SearchPlacesContainer>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <PinSvg fill={Colors.primary.red} />
        <H3 style={{ color: Colors.primary.red }}>지금 뜨는 핫플</H3>
      </View>
      <View style={{ marginLeft: 4 }}>
        <View
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 30 }}>
            <Body style={{ color: Colors.gray.v300 }}>1</Body>
          </View>
          <Body>압구정 로데오</Body>
        </View>
        <View
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 30 }}>
            <Body style={{ color: Colors.gray.v300 }}>2</Body>
          </View>
          <Body>홍대 입구</Body>
        </View>
        <View
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 30 }}>
            <Body style={{ color: Colors.gray.v300 }}>3</Body>
          </View>
          <Body>대구 반월당로</Body>
        </View>
        <View
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 30 }}>
            <Body style={{ color: Colors.gray.v300 }}>4</Body>
          </View>
          <Body>합정</Body>
        </View>
        <View
          style={{
            marginBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 30 }}>
            <Body style={{ color: Colors.gray.v300 }}>5</Body>
          </View>
          <Body>문래동</Body>
        </View>
      </View>
    </SearchPlacesContainer>
  )
}

const SearchPlacesContainer = styled(View)`
  margin-top: 20px;
`
