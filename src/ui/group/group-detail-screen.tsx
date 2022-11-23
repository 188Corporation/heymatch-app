import React, { useState } from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { ScrollView, View } from 'react-native'
import { Image } from 'ui/common/image'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, H1, H3 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { geoinfoToGpsLocation } from 'infra/util'
import { useStores } from 'store/globals'
import { Button } from 'ui/common/button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GroupDetailScreenProps } from 'navigation/types'
import { navigation } from 'navigation/global'
import { GroupDesc } from 'ui/common/group-desc'
import { SendSvg } from 'image'
import { CurrentCandy } from 'ui/common/current-candy'
import { useMy } from 'api/reads'
import { sendMatchRequest } from 'api/writes'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { ApiError } from 'api/error'

const CARD_BORDER_RADIUS = 32

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { data } = props.route.params
  const { locationStore, alertStore } = useStores()
  const insets = useSafeAreaInsets()
  const { data: myData } = useMy()
  const [loading, setLoading] = useState(false)
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
            {locationStore.getDistance(geoinfoToGpsLocation(data.gps_geoinfo))}
          </Caption>
          <H1 style={{ marginBottom: 8 }}>{data.title}</H1>
          <GroupDesc
            data={data}
            size={24}
            fontSize={16}
            color={Colors.primary.blue}
          />
          <Row style={{ height: 28 }} />
          <H3 style={{ marginBottom: 8 }}>소개</H3>
          <Body style={{ color: Colors.gray.v400 }}>{data.introduction}</Body>
        </ContentCard>
      </ScrollView>
      <ButtonContainer style={{ marginBottom: insets.bottom }}>
        <Button
          text='매칭하기'
          onPress={() => {
            // check is my group
            if (data.id === myData?.joined_group?.id) {
              alertStore.open({
                title: '내 그룹과는 매칭할 수 없어요',
                body: '[핫플 탭] 에서 관심 가는 그룹을 찾아보세요 :)',
              })
              return
            }
            alertStore.open({
              title: '캔디 1개를 사용해서 매칭할까요?',
              body: '상대 그룹이 매칭을 수락하면 채팅을 할 수 있어요 :)',
              buttonText: '캔디 1개 사용하기',
              cancelText: '다음에 매칭하기',
              onPress: async () => {
                if (!myData) return
                if (myData.user.point_balance >= 1) {
                  setLoading(true)
                  try {
                    await sendMatchRequest(data.id)
                    alertStore.open({
                      title: `${data.title} 그룹과 매칭했어요!`,
                      body: '[매칭 탭 > 보낸 매칭] 에서\n매칭 상태를 확인할 수 있어요 :)',
                    })
                  } catch (e) {
                    if (e instanceof ApiError && e.res.code === 470) {
                      alertStore.open({
                        title: '이미 매칭을 보낸 그룹이에요!',
                        body: '[매칭 탭 > 보낸 매칭] 에서\n매칭 상태를 확인할 수 있어요 :)',
                      })
                    } else {
                      alertStore.error(e, '매칭에 실패했어요!')
                    }
                  } finally {
                    setLoading(false)
                  }
                } else {
                  navigation.navigate('PurchaseScreen')
                }
              },
              children: () => (
                <CandyContainer>
                  <CurrentCandy />
                </CandyContainer>
              ),
            })
          }}
          leftChildren={
            <SendSvg
              fill={Colors.white}
              width={20}
              height={20}
              style={{ left: -10, marginLeft: -4 }}
            />
          }
        />
      </ButtonContainer>
      {loading && <LoadingOverlay />}
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
  padding: 32px 28px 16px 28px;
`

const ButtonContainer = styled(Column)`
  padding: 8px 28px 16px 28px;
`

const CandyContainer = styled(Row)`
  position: absolute;
  right: 12px;
  top: -48px;
  background-color: ${Colors.white};
  padding: 8px 16px;
  border-radius: 16px;
`
