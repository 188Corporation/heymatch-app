import React from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { ScrollView, View } from 'react-native'
import { Image } from 'ui/common/image'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, H1, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { formatMaleFemaleInfo, geoinfoToGpsLocation } from 'infra/util'
import { UsersFillSvg } from 'image'
import { useStores } from 'store/globals'
import { Button } from 'ui/common/button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GroupDetailScreenProps } from 'navigation/types'
import { navigation } from 'navigation/global'

const CARD_BORDER_RADIUS = 32

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { data } = props.route.params
  const { locationStore } = useStores()
  const insets = useSafeAreaInsets()
  if (!data) return null
  const width = WINDOW_DIMENSIONS.width
  const height = (width / 3) * 4
  return (
    <Container>
      <View style={{ position: 'absolute', zIndex: 1 }}>
        <NavigationHeader />
      </View>
      <PhotoContainer
        style={{ width, height }}
        source={{ uri: data.group_profile_images[0].image }}
      />
      <ScrollView
        // 관성 스크롤 때문에 더 내려가는 경우 생기는 빈 공간을 방지하기 위해 조금 더 올려주기
        contentContainerStyle={{ paddingTop: height - CARD_BORDER_RADIUS - 8 }}
        showsVerticalScrollIndicator={false}
      >
        <ContentCard>
          <Caption style={{ color: Colors.gray.v400 }}>
            {locationStore.getDistance(
              geoinfoToGpsLocation(data.gps_geoinfo),
              10,
            )}
            m
          </Caption>
          <H1 style={{ marginBottom: 2 }}>{data.title}</H1>
          <Row style={{ marginBottom: 40 }}>
            <UsersFillSvg
              style={{ marginRight: 4 }}
              fill={Colors.primary.blue}
              width={24}
              height={24}
            />
            <Body style={{ color: Colors.primary.blue, lineHeight: 24 }}>
              {formatMaleFemaleInfo(data)}·평균 {data.member_average_age}세
            </Body>
          </Row>
          <H3 style={{ marginBottom: 8 }}>소개</H3>
          <Body style={{ color: Colors.gray.v400 }}>{data.introduction}</Body>
        </ContentCard>
      </ScrollView>
      <ButtonContainer style={{ marginBottom: insets.bottom }}>
        <Button
          text='채팅하기'
          onPress={() => navigation.navigate('PurchaseScreen')}
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled(Column)`
  flex: 1;
`

const PhotoContainer = styled(Image)`
  position: absolute;
`

const ContentCard = styled(Column)`
  background-color: white;
  border-top-left-radius: ${CARD_BORDER_RADIUS}px;
  border-top-right-radius: ${CARD_BORDER_RADIUS}px;
  padding: 32px 28px;
`

const ButtonContainer = styled(Column)`
  padding: 8px 28px 16px 28px;
`
