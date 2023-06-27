import Clipboard from '@react-native-clipboard/clipboard'
import { ApiError } from 'api/error'
import { useGroup, useMy } from 'api/reads'
import {
  deleteGroup,
  purchaseProfilePhotos,
  sendMatchRequest,
} from 'api/writes'
import { ClipboardSvg, LockedSvg, SendSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import { convertJobtitle } from 'infra/util'
import { navigation } from 'navigation/global'
import { GroupDetailScreenProps, MatchRequestTarget } from 'navigation/types'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { accept, reject } from 'store/common-actions'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { Button } from 'ui/common/button'
import { CurrentCandy } from 'ui/common/current-candy'
import { GroupDesc_v2 } from 'ui/common/group-desc'
import { Image } from 'ui/common/image'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption, CaptionS, H1, H3 } from 'ui/common/text'
import { CarouselModal, ProfileImagesCarousel } from 'ui/my/user-profile-screen'

const BUTTON_ICON_STYLE = { left: -10, marginLeft: -4 }

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { id, matchRequest, hideButton } = props.route.params
  const { data: group } = useGroup(id)
  const { data: myData } = useMy()
  const { alertStore } = useStores()
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (!group || !myData) return <LoadingOverlay />
  const leader = group.group_members[0]

  const hasOwnGroup =
    myData.joined_groups &&
    myData.joined_groups[0] &&
    myData.joined_groups[0].group

  const isEditing = hasOwnGroup && id === myData.joined_groups?.[0].group.id

  const copyToClipboard = () => {
    Clipboard.setString(group.meetup_place_title)
    Toast.show({
      type: 'success',
      text1: '클립보드에 복사했어요!',
    })
  }

  const handlePressProfilePhoto = () => {
    if (!group?.profile_photo_purchased) {
      alertStore.open({
        title: '캔디 1개를 사용해서 사진을 볼까요?',
        mainButton: '캔디 1개 사용하기',
        subButton: '다음에 사용하기',
        onMainPress: async () => {
          try {
            await purchaseProfilePhotos(group.id)
            await mutate(`/groups/${group.id}/`)
          } catch (e) {
            alertStore.error(e, '결제에 실패했어요!')
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
    } else {
      setIsModalVisible(true)
    }
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
                  body: '그룹을 삭제하면 지금까지 [받은 매칭], [보낸 요청]은 모두 사라져요. 하지만 채팅창은 그대로 남아 있으니 계속 매칭된 그룹과 채팅이 가능해요!',
                  mainButton: '네 삭제할게요!',
                  subButton: '다음에 하기',
                  onMainPress: async () => {
                    if (!group) return
                    setLoading(true)
                    try {
                      await deleteGroup(group.id)
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
          <H1 style={{ marginBottom: 24 }}>{group?.title}</H1>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 40,
            }}
          >
            <View>
              <TouchableOpacity onPress={handlePressProfilePhoto}>
                <Image
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    marginRight: 20,
                  }}
                  source={{
                    uri: leader.user.user_profile_images.find((_) => _.is_main)!
                      .thumbnail,
                  }}
                />
                {!group.profile_photo_purchased && !isEditing && (
                  <LockedSvg
                    style={{ position: 'absolute', right: 8, bottom: -8 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
              }}
            >
              {leader.user.job_title && (
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
                  <Caption
                    style={{ color: Colors.gray.v400 }}
                    numberOfLines={1}
                  >
                    {leader.user.verified_company_name ??
                      leader.user.verified_school_name ??
                      convertJobtitle(leader.user.job_title)}
                  </Caption>
                </View>
              )}
              <View
                style={{
                  marginBottom: 8,
                }}
              >
                <GroupDesc_v2
                  memberNumber={group.member_number}
                  memberAvgAge={group.member_avg_age}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserProfileScreen', {
                    groupId: group.id,
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
              {formatDate(group.meetup_date)}
            </Body>
          </View>
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>장소</H3>
            <TouchableOpacity onPress={copyToClipboard}>
              <Row>
                <Body style={{ color: Colors.gray.v500 }}>
                  {group.meetup_place_title}
                </Body>
                <ClipboardSvg />
              </Row>
            </TouchableOpacity>
          </View>
          <View style={{ height: 150, marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>소개</H3>
            <ScrollView>
              <Body style={{ color: Colors.gray.v500 }}>
                {group.introduction}
              </Body>
            </ScrollView>
          </View>
        </View>
        {!hideButton && (
          <>
            <ButtonContainer>
              {!isEditing ? (
                <ButtonContent
                  data={group}
                  setLoading={setLoading}
                  matchRequest={matchRequest}
                  hasOwnGroup={!!hasOwnGroup}
                />
              ) : (
                <Button
                  text='수정하기'
                  color={Colors.primary.blue}
                  onPress={() => {
                    navigation.navigate('GroupCreateStacks')
                  }}
                />
              )}
            </ButtonContainer>
            <BottomInsetSpace />
          </>
        )}
      </View>
      <CarouselModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <ProfileImagesCarousel images={leader.user.user_profile_images} />
      </CarouselModal>
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
  hasOwnGroup: boolean
}> = ({ data, setLoading, matchRequest, hasOwnGroup }) => {
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
        if (!hasOwnGroup) {
          alertStore.open({
            title: '아직 속한 그룹이 없어요!',
            body: '먼저 그룹을 생성해주세요!',
            mainButton: '그룹 생성하기',
            subButton: '나중에 하기',
            onMainPress: () => {
              navigation.navigate('GroupCreateStacks')
            },
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
                await sendMatchRequest(
                  myData.joined_groups![0].group.id,
                  data.id,
                )
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
