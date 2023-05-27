import Clipboard from '@react-native-clipboard/clipboard'
import { ApiError } from 'api/error'
import { useGroup, useMy } from 'api/reads'
import { deleteGroup, sendMatchRequest } from 'api/writes'
import { ClipboardSvg, SendSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import { convertJobtitle } from 'infra/util'
import { navigation } from 'navigation/global'
import { MatchRequestTarget, NewGroupDetailScreenProps } from 'navigation/types'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { accept, reject } from 'store/common-actions'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { CurrentCandy } from 'ui/common/current-candy'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, CaptionS, H1, H3 } from 'ui/common/text'

const BUTTON_ICON_STYLE = { left: -10, marginLeft: -4 }

export const NewGroupDetailScreen: React.FC<NewGroupDetailScreenProps> = (
  props,
) => {
  const { id, matchRequest } = props.route.params
  const { data: groupData } = useGroup(id)
  const { data: myData } = useMy()
  const { alertStore } = useStores()
  const [loading, setLoading] = useState(false)

  if (!groupData || !myData) return <LoadingOverlay />
  const leader = groupData.group_members[0]

  const isEditing = id === myData.joined_groups?.[0].group.id

  const copyToClipboard = () => {
    Clipboard.setString(groupData.meetup_place_title)
  }

  return (
    <>
      <NavigationHeader
        backButtonStyle='black'
        rightChildren={
          isEditing && (
            <TouchableOpacity
              style={{ marginRight: 24 }}
              onPress={() => {
                alertStore.open({
                  title: '그룹을 삭제할까요?',
                  body: '그룹을 삭제하면 다시 복구가 어려워요!',
                  mainButton: '네 삭제할게요!',
                  subButton: '다음에 하기',
                  onMainPress: async () => {
                    setLoading(true)
                    if (!groupData) return
                    setLoading(true)
                    try {
                      await deleteGroup(groupData.id)
                      await mutate('/users/my/')
                      navigation.goBack()
                    } catch (e) {
                      alertStore.error(e, '그룹 삭제에 실패했어요!')
                    } finally {
                      setLoading(false)
                    }
                  },
                })
              }}
            >
              <Body style={{ color: Colors.gray.v400 }}>그룹 삭제</Body>
            </TouchableOpacity>
          )
        }
      />
      <View style={{ flexGrow: 1 }}>
        <Container>
          <H1 style={{ marginBottom: 24 }}>{groupData?.title}</H1>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 40,
            }}
          >
            <Image
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                marginRight: 20,
              }}
              source={{
                uri: leader.user.user_profile_images[0].image,
              }}
            />
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <VerifiedSvg
                  style={{ marginRight: 4 }}
                  fill={
                    leader.user.verified_company_name ||
                    leader.user.verified_school_name
                      ? Colors.primary.blue
                      : Colors.gray.v400
                  }
                />
                <Caption style={{ color: Colors.gray.v400 }} numberOfLines={1}>
                  {leader.user.verified_company_name ??
                    leader.user.verified_school_name ??
                    convertJobtitle(leader.user.job_title)}
                </Caption>
              </View>
              <View
                style={{
                  marginBottom: 8,
                }}
              >
                <GroupDesc_v2
                  memberNumber={groupData.member_number}
                  memberAvgAge={groupData.member_avg_age}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserProfileScreen', {
                    user: leader.user,
                  })
                }}
              >
                <CaptionS
                  style={{ fontWeight: '600', color: Colors.primary.blue }}
                >
                  방장 프로필 보기 &gt;
                </CaptionS>
              </TouchableOpacity>
            </View>
          </View>
        </Container>

        <View
          style={{
            paddingTop: 40,
            flexGrow: 1,
            backgroundColor: '#F6F7FF',
            paddingHorizontal: 28,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>만나는 날짜</H3>
            <Body style={{ color: Colors.gray.v500 }}>
              {formatDate(groupData.meetup_date)}
            </Body>
          </View>
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>장소</H3>
            <Row>
              <Body style={{ color: Colors.gray.v500 }}>
                {groupData.meetup_place_title}
              </Body>
              <TouchableOpacity onPress={copyToClipboard}>
                <ClipboardSvg />
              </TouchableOpacity>
            </Row>
          </View>
          <View style={{ height: 150, marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>소개</H3>
            <ScrollView>
              <Body style={{ color: Colors.gray.v500 }}>
                {groupData.introduction}
              </Body>
            </ScrollView>
          </View>
        </View>
        {!isEditing && (
          <>
            <ButtonContainer>
              <ButtonContent
                data={groupData}
                setLoading={setLoading}
                matchRequest={matchRequest}
              />
            </ButtonContainer>
            <BottomInsetSpace />
          </>
        )}
      </View>
      {isEditing && (
        <BottomButton
          text={isEditing ? '수정하기' : '매칭하기'}
          onPress={() => {
            navigation.navigate('NewGroupCreateStacks')
          }}
        />
      )}
      {loading && <LoadingOverlay />}
    </>
  )
}

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`

function formatDate(_date: string) {
  const date = new Date(_date)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
}

const ButtonContainer = styled(Column)`
  padding: 8px 28px 16px 28px;
`

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
      //TODO: 내 그룹이 없다면 alert
      text='매칭하기'
      onPress={() => {
        // check is my group
        if (data.id === myData?.joined_groups?.[0].group.id) {
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

const CandyContainer = styled(Row)`
  position: absolute;
  right: 12px;
  top: -48px;
  background-color: ${Colors.white};
  padding: 8px 16px;
  border-radius: 16px;
`
