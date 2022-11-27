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
import { GroupDetailScreenProps, MatchRequestTarget } from 'navigation/types'
import { navigation } from 'navigation/global'
import { GroupDesc } from 'ui/common/group-desc'
import { SendSvg } from 'image'
import { CurrentCandy } from 'ui/common/current-candy'
import { useMy } from 'api/reads'
import { sendMatchRequest } from 'api/writes'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { ApiError } from 'api/error'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { accept, reject } from 'store/common-actions'

const CARD_BORDER_RADIUS = 32
const BUTTON_ICON_STYLE = { left: -10, marginLeft: -4 }

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { data, matchRequest, hideButton } = props.route.params
  const { locationStore } = useStores()
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
        contentContainerStyle={{ paddingTop: height - CARD_BORDER_RADIUS }}
        showsVerticalScrollIndicator={false}
        bounces={false}
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
      {!hideButton && (
        <ButtonContainer>
          <ButtonContent
            data={data}
            matchRequest={matchRequest}
            setLoading={setLoading}
          />
        </ButtonContainer>
      )}
      <BottomInsetSpace />
      {loading && <LoadingOverlay />}
    </Container>
  )
}

const ButtonContent: React.FC<{
  data: GroupDetail
  setLoading: (v: boolean) => void
  matchRequest?: MatchRequestTarget
}> = ({ data, setLoading, matchRequest }) => {
  const { status, type } = matchRequest || {}
  const { alertStore, chatStore } = useStores()
  const { data: myData } = useMy()
  // render based on conditions
  if (status === MatchRequestStatus.REJECTED) {
    return <Button text='거절된 매칭이에요' disabled />
  }
  if (status === MatchRequestStatus.ACCEPTED) {
    return (
      <Button
        text='채팅하기'
        onPress={() => navigation.navigate('ChatScreen')}
        leftChildren={
          <Icon
            name='question-answer'
            color={Colors.white}
            size={20}
            style={BUTTON_ICON_STYLE}
          />
        }
      />
    )
  }
  if (status === MatchRequestStatus.WAITING && type === MatchRequestType.SENT) {
    return <Button text='수락 대기중' disabled />
  }
  if (
    status === MatchRequestStatus.WAITING &&
    type === MatchRequestType.RECEIVED
  ) {
    return (
      <Row>
        <Column style={{ flex: 2, marginRight: 8 }}>
          <Button
            text='수락하기'
            onPress={() => {
              if (!matchRequest) return
              accept(matchRequest.id, alertStore, chatStore)
            }}
          />
        </Column>
        <Column style={{ flex: 1 }}>
          <Button
            text='거절하기'
            onPress={() => {
              if (!matchRequest) return
              reject(matchRequest.id, alertStore)
            }}
            color={Colors.white}
            textColor={Colors.gray.v400}
          />
        </Column>
      </Row>
    )
  }

  return (
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
          style={BUTTON_ICON_STYLE}
        />
      }
    />
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
