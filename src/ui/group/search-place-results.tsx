import { useGeocoding, useSearchPlace } from 'api/reads'
import { PinSvg } from 'image'
import { Colors } from 'infra/colors'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { Body, DescBody2, H3 } from 'ui/common/text'

export const SearchPlaceResults = ({
  inputRef,
  searchPlaceKeyword,
  setSearchPlaceKeyword,
  setScreenState,
}: {
  inputRef: React.MutableRefObject<TextInput | null>
  searchPlaceKeyword: string
  setSearchPlaceKeyword: React.Dispatch<React.SetStateAction<string>>
  setScreenState: React.Dispatch<
    React.SetStateAction<'BEFORE_SEARCH' | 'AFTER_SEARCH'>
  >
}) => {
  const { locationStore } = useStores()
  const { data: searchPlaceList, isLoading: isLoadingSearchPlaceList } =
    useSearchPlace(searchPlaceKeyword)
  const [address, setAddress] = useState('')
  const { data: geocoding, isLoading: isLoadingGeocoding } =
    useGeocoding(address)

  useEffect(() => {
    if (isLoadingGeocoding) return
    if (!geocoding || !searchPlaceKeyword || !address) return
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
    setScreenState('AFTER_SEARCH')
  }, [
    address,
    geocoding,
    isLoadingGeocoding,
    locationStore,
    searchPlaceKeyword,
    setScreenState,
  ])

  if (isLoadingSearchPlaceList) {
    return (
      <>
        <Body>잠시만 기다려주세요</Body>
      </>
    )
  } else {
    if (searchPlaceKeyword === '') {
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
                key={`${searchPlace.address}-${searchPlace.telephone}-${searchPlace.mapx}-${searchPlace.mapy}`}
                style={{ width: '100%' }}
                onPress={() => {
                  if (!inputRef.current) return
                  setAddress(searchPlace.address)
                  setSearchPlaceKeyword(
                    searchPlace.title.replace(/<[^>]*>/g, ''),
                  )
                  inputRef.current?.blur()
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
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body style={{ color: Colors.gray.v300, marginRight: 23 }}>1</Body>
          <Body>압구정 로데오</Body>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body style={{ color: Colors.gray.v300, marginRight: 23 }}>2</Body>
          <Body>홍대 입구</Body>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body style={{ color: Colors.gray.v300, marginRight: 23 }}>3</Body>
          <Body>대구 반월당로</Body>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body style={{ color: Colors.gray.v300, marginRight: 23 }}>4</Body>
          <Body>합정</Body>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body style={{ color: Colors.gray.v300, marginRight: 23 }}>5</Body>
          <Body>문래동</Body>
        </View>
      </View>
    </SearchPlacesContainer>
  )
}

const SearchPlacesContainer = styled(View)`
  margin-top: 40px;
`
