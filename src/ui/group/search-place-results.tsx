import { useSearchPlace } from 'api/reads'
import { Pin } from 'image'
import { Colors } from 'infra/colors'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Body, DescBody2, H3 } from 'ui/common/text'

export const SearchPlaceResults = ({
  searchPlaceKeyword,
  setScreenState,
}: {
  searchPlaceKeyword: string
  setScreenState: React.Dispatch<
    React.SetStateAction<'BEFORE_SEARCH' | 'SEARCHING' | 'AFTER_SEARCH'>
  >
}) => {
  const { data: searchPlaceList, isLoading } =
    useSearchPlace(searchPlaceKeyword)

  if (isLoading) {
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
        {/* 위치 선택 시 네이버 지도 api로 lat, lng를 반환받아 현재 위치로 적용 */}
        {/* 근데 검색했다 치면 검색 결과는 현재 위치로부터 반경 몇 km의 결과를 표시해야하지? */}
        {searchPlaceList &&
          searchPlaceList.items.map((searchPlace) => {
            return (
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
                  <Pin fill={Colors.gray.v400} />
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
        <Pin fill={Colors.primary.red} />
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
