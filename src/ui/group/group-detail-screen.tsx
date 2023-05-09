import { ApiError } from 'api/error'
import { useMy } from 'api/reads'
import { reportAbuse, sendMatchRequest } from 'api/writes'
import { SendSvg } from 'image'
import { Colors } from 'infra/colors'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import { geoinfoToGpsLocation } from 'infra/util'
import { navigation } from 'navigation/global'
import { GroupDetailScreenProps, MatchRequestTarget } from 'navigation/types'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { accept, reject } from 'store/common-actions'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { Button } from 'ui/common/button'
import { CurrentCandy } from 'ui/common/current-candy'
import { GroupDesc } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, H1, H3 } from 'ui/common/text'

const CARD_BORDER_RADIUS = 32
const BUTTON_ICON_STYLE = { left: -10, marginLeft: -4 }

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { data, matchRequest, hideButton } = props.route.params
  const { locationStore, alertStore } = useStores()
  const [loading, setLoading] = useState(false)
  if (!data) return null
  const width = WINDOW_DIMENSIONS.width
  const height = (width / 3) * 4
  return (
    <Container>
      <View style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
        <NavigationHeader
          rightChildren={
            <TouchableOpacity
              style={{ marginRight: 24 }}
              onPress={() => {
                alertStore.open({
                  title: '정말 이 사용자를 신고 및 차단할까요?',
                  body: '부적절한 컨텐츠(음란성, 폭력성 등)의\n경우 적극 신고해주세요! 해당 사용자는\n자동으로 차단되고 지도, 매칭, 채팅\n화면에서 사라져요. 관리자가 24시간 이내\n확인 후 컨텐츠 삭제 및 사용자 영구 제재\n조치를 취해요. 건전하고 안전한 그룹 매칭\n문화를 선도하기 위해 헤이매치가 노력할게요!',
                  mainButton: '신고 및 차단할래요!',
                  subButton: '다음에',
                  onMainPress: () => {
                    reportAbuse(data.id)
                      .then(() =>
                        Promise.all([
                          mutate('/groups/'),
                          mutate('/match-requests/'),
                          mutate('/chats/'),
                        ]),
                      )
                      .then(() => {
                        navigation.setRootWithStack('MainTabs', 'GroupScreen')
                        alertStore.open({
                          title: '신고를 완료했어요',
                          body: '신고해주셔서 감사해요.\n관리자가 최대한 빨리 조치를 취할게요!',
                        })
                      })
                      .catch((e) => alertStore.errorUnexpected(e))
                  },
                })
              }}
            >
              <Body style={{ color: Colors.white }}>신고 및 차단하기</Body>
            </TouchableOpacity>
          }
        />
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
        if (data.id === myData?.joined_groups?.id) {
          alertStore.open({
            title: '내 그룹과는 매칭할 수 없어요',
            body: '[핫플 탭] 에서 관심 가는 그룹을 찾아보세요 :)',
          })
          return
        }
        alertStore.open({
          title: '캔디 1개를 사용해서 매칭할까요?',
          body: '상대 그룹이 매칭을 수락하면 채팅을 할 수 있어요 :)',
          mainButton: '캔디 1개 사용하기',
          subButton: '다음에 매칭하기',
          onMainPress: async () => {
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
                    title: '이미 매칭한 그룹이에요!',
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
              <TouchableOpacity
                onPress={() => navigation.navigate('PurchaseScreen')}
              >
                <CurrentCandy />
              </TouchableOpacity>
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
