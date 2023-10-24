import Clipboard from '@react-native-clipboard/clipboard'
import { ApiError } from 'api/error'
import {
  useChats,
  useGroup,
  useGroupList,
  useMatchRequestWithGroup,
  useMy,
} from 'api/reads'
import {
  deleteGroup,
  purchaseProfilePhotos,
  purchaseProfilePhotosByAds,
  reportAbuse,
  sendMatchRequest,
} from 'api/writes'
import { ClipboardSvg, LockedSvg, SendSvg, VerifiedSvg } from 'image'
import { Colors } from 'infra/colors'
import {
  BOTTOM_BUTTON_HEIGTH,
  CURRENT_OS,
  NAVIGATION_HEADER_HEIGHT,
  OS,
  POINT_NEEDED_FOR_MATCH,
  POINT_NEEDED_FOR_PHOTO,
} from 'infra/constants'
import {
  GroupDetail,
  MatchRequestStatus,
  MatchRequestTarget,
  MatchRequestType,
  UserProfileImages,
} from 'infra/types'
import { convertJobtitle, useSafeAreaInsets } from 'infra/util'
import { navigation } from 'navigation/global'
import { GroupDetailScreenProps } from 'navigation/types'
import React, { ReactNode, useEffect, useState } from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { TestIds, useInterstitialAd } from 'react-native-google-mobile-ads'
import Modal from 'react-native-modal'
import Carousel from 'react-native-reanimated-carousel'
import Toast from 'react-native-toast-message'
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
import { Column, Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Tag } from 'ui/common/Tag'
import { Body, Caption, CaptionS, H1, H2, H3 } from 'ui/common/text'

const BUTTON_ICON_STYLE = { left: -10, marginLeft: -4 }
const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-1734601135342923/8042492266'

const MAX_ADS_COUNT = 3

export const GroupDetailScreen: React.FC<GroupDetailScreenProps> = (props) => {
  const { id, hideButton } = props.route.params
  const { data: group } = useGroup(id)
  const { data: myData } = useMy()
  const { data: matchRequest } = useMatchRequestWithGroup(id)
  const { alertStore, groupListStore } = useStores()
  const [loading, setLoading] = useState(false)
  const [isCarouselModalVisible, setIsCarouselModalVisible] = useState(false)
  const [isUserReportModalVisible, setIsUserReportModalVisible] =
    useState(false)
  const insets = useSafeAreaInsets()
  const { mutate: refetchGroupList } = useGroupList(groupListStore.filterParams)

  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  })

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!group) return
    if (!isClosed) return
    ;(async () => {
      await purchaseProfilePhotosByAds(id)
      await mutate(`/groups/${group.id}/`)
      await refetchGroupList()
    })()
    alertStore.close()
  }, [alertStore, group, id, isClosed, refetchGroupList])

  const openAd = () => {
    if (isLoaded) {
      show()
    } else {
      alertStore.close()
      Toast.show({
        type: 'info',
        text1: '광고를 준비중이에요. 다시 시도해주세요!',
      })
    }
  }

  if (!group || !myData) return <LoadingOverlay />
  const leader = group.group_members.find((_) => _.is_user_leader)!

  const hasOwnGroup =
    myData.joined_groups &&
    myData.joined_groups[0] &&
    myData.joined_groups[0].group

  const isEditing = hasOwnGroup && id === myData.joined_groups?.[0].group.id

  const copyToClipboard = () => {
    Clipboard.setString(
      `${group.meetup_place_address} ${group.meetup_place_title}`,
    )
    Toast.show({
      type: 'success',
      text1: '클립보드에 복사했어요!',
    })
  }

  const handlePressProfilePhoto = () => {
    if (!group?.profile_photo_purchased) {
      alertStore.open({
        title: `캔디 ${POINT_NEEDED_FOR_PHOTO}개를 사용해서 사진을 볼까요?`,
        mainButton: `캔디 ${POINT_NEEDED_FOR_PHOTO}개 사용하기`,
        subButton: '다음에 사용하기',
        onMainPress: async () => {
          try {
            await purchaseProfilePhotos(group.id)
            await mutate(`/groups/${group.id}/`)
            await refetchGroupList()
          } catch (e) {
            navigation.navigate('PurchaseScreen')
          }
        },
        bodyChildren: () => (
          <View style={{ marginBottom: -16 }}>
            <Button
              onPress={() => {
                openAd()
              }}
              color={Colors.gray.v400}
              text={`광고 시청하고 사진 보기 (${
                MAX_ADS_COUNT - myData.user.num_of_available_ads
              }/${MAX_ADS_COUNT})`}
              disabled={myData.user.num_of_available_ads === 0}
            />
          </View>
        ),
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
      setIsCarouselModalVisible(true)
    }
  }

  const getSortedProfilePhotos = (): UserProfileImages[] => {
    let images: UserProfileImages[] = []
    const subPhotos = leader.user.user_profile_images
      .filter((_) => !_.is_main)
      .sort((a, b) => {
        if (a.order < b.order) {
          return 1
        } else {
          return -1
        }
      })

    images.push(leader.user.user_profile_images.find((_) => _.is_main)!)
    if (subPhotos[0]) images.push(subPhotos[0])
    if (subPhotos[1]) images.push(subPhotos[1])

    return images
  }

  return (
    <>
      <NavigationHeader
        backButtonStyle='black'
        rightChildren={
          isEditing ? (
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
          ) : (
            <TouchableOpacity
              style={{ marginRight: 24 }}
              onPress={() => {
                setIsUserReportModalVisible(true)
              }}
            >
              <Body style={{ color: Colors.gray.v400 }}>그룹 신고</Body>
            </TouchableOpacity>
          )
        }
      />
      <Container
        style={{
          height:
            Dimensions.get('window').height -
            (BOTTOM_BUTTON_HEIGTH + NAVIGATION_HEADER_HEIGHT + insets.top),
        }}
      >
        <View style={{ paddingHorizontal: 28 }}>
          <H1 style={{ marginBottom: 24 }} numberOfLines={1}>
            {group?.title}
          </H1>
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
                    uri: getSortedProfilePhotos()[0].image,
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
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop: 40,
            flexGrow: 1,
            backgroundColor: '#F6F7FF',
            paddingHorizontal: 28,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            height: '100%',
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <H3 style={{ marginBottom: 8 }}>만나는 날짜</H3>
            <Body style={{ color: Colors.gray.v500 }}>
              {formatDate(group.meetup_date)}
            </Body>
          </View>
          <View style={{ marginBottom: 20 }}>
            <H3 style={{ marginBottom: 8 }}>장소</H3>
            <TouchableOpacity onPress={copyToClipboard}>
              <Body style={{ color: Colors.gray.v500 }}>
                {group.meetup_place_address} {group.meetup_place_title}
                <ClipboardSvg />
              </Body>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <H3 style={{ marginBottom: 8 }}>우리는 이런 그룹이에요</H3>
            <WrapBox>
              {group.about_our_group_tags.map((tag) => {
                return (
                  <Tag key={tag.value} color={tag.color} label={tag.label} />
                )
              })}
            </WrapBox>
          </View>
          <View style={{ marginBottom: 20 }}>
            <H3 style={{ marginBottom: 8 }}>이런 미팅을 원해요</H3>
            <WrapBox>
              {group.meeting_we_want_tags.map((tag) => {
                return (
                  <Tag key={tag.value} color={tag.color} label={tag.label} />
                )
              })}
            </WrapBox>
          </View>
          <View style={{ marginBottom: 40 }}>
            <H3 style={{ marginBottom: 8 }}>소개</H3>
            <ScrollView>
              <Body style={{ color: Colors.gray.v500 }}>
                {group.introduction}
              </Body>
            </ScrollView>
          </View>
        </View>
      </Container>
      {!hideButton && (
        <>
          {!isEditing ? (
            <ButtonContent
              data={group}
              setLoading={setLoading}
              matchRequest={matchRequest}
              hasOwnGroup={!!hasOwnGroup}
            />
          ) : (
            <BottomButton
              text='수정하기'
              onPress={() => {
                navigation.navigate('GroupCreateStacks')
              }}
            />
          )}
        </>
      )}
      <CarouselModal
        isVisible={isCarouselModalVisible}
        onClose={() => setIsCarouselModalVisible(false)}
      >
        {CURRENT_OS === OS.IOS ? (
          <IosProfileImagesCarousel images={getSortedProfilePhotos()} />
        ) : (
          <AndroidProfileImagesCarousel images={getSortedProfilePhotos()} />
        )}
      </CarouselModal>
      {loading && <LoadingOverlay />}
      <UserReportModal
        isVisible={isUserReportModalVisible}
        onClose={() => {
          setIsUserReportModalVisible(false)
        }}
      >
        <UserReportModalContent
          groupId={group.id}
          onClose={() => {
            setIsUserReportModalVisible(false)
          }}
        />
      </UserReportModal>
    </>
  )
}

const Container = styled(ScrollView)`
  padding: 12px 0px 0px 0px;
`

const ReportItem = styled(TouchableOpacity)`
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`

function formatDate(_date: string) {
  const date = new Date(_date)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
}

const ButtonContent: React.FC<{
  data: GroupDetail
  setLoading: (v: boolean) => void
  matchRequest?: MatchRequestTarget
  hasOwnGroup: boolean
}> = ({ data, setLoading, matchRequest, hasOwnGroup }) => {
  const { status, type } = matchRequest || {}
  const { alertStore, chatStore } = useStores()
  const { data: myData } = useMy()
  const { data: chatData } = useChats()

  // render based on conditions
  if (status === MatchRequestStatus.REJECTED) {
    return <BottomButton text='거절된 매칭이에요' disabled />
  }
  if (status === MatchRequestStatus.ACCEPTED) {
    return (
      <BottomButton
        text='채팅하기'
        onPress={() => {
          const chat = chatData?.find((_) => _.group.id === data.id)
          if (!chat) {
            navigation.navigate('ChatScreen')
            return
          }
          chatStore.setChat(chat)
          navigation.navigate('ChatDetailScreen')
        }}
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
    return <BottomButton text='수락 대기중' disabled />
  }
  if (
    status === MatchRequestStatus.WAITING &&
    type === MatchRequestType.RECEIVED
  ) {
    return (
      <Row>
        <Column style={{ flex: 1 }}>
          <BottomButton
            text='수락하기'
            onPress={() => {
              if (!matchRequest) return
              accept(matchRequest.id, alertStore, chatStore)
              navigation.navigate('ChatScreen')
            }}
          />
        </Column>
        <Column style={{ flex: 1 }}>
          <BottomButton
            text='거절하기'
            onPress={() => {
              if (!matchRequest) return
              reject(matchRequest.id, alertStore)
              navigation.navigate('GroupList')
            }}
            inverted
          />
        </Column>
      </Row>
    )
  }

  return (
    <BottomButton
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
          title: `캔디 ${POINT_NEEDED_FOR_MATCH}개를 사용해서 매칭할까요?`,
          body: '상대 그룹이 매칭을 수락하면 채팅을 할 수 있어요. 매칭 시 사진의 블러는 자동으로 풀려요 :)',
          mainButton: `캔디 ${POINT_NEEDED_FOR_MATCH}개 사용하기`,
          subButton: '다음에 매칭하기',
          onMainPress: async () => {
            if (!myData) return
            if (myData.user.point_balance >= POINT_NEEDED_FOR_MATCH) {
              setLoading(true)
              try {
                await sendMatchRequest(
                  myData.joined_groups![0].group.id,
                  data.id,
                )
                await mutate(`/groups/${data.id}/`)

                alertStore.open({
                  title: `${data.title} 그룹과 매칭했어요!`,
                  body: '[매칭 탭 > 보낸 매칭] 에서\n매칭 상태를 확인할 수 있어요 :)',
                })
                await mutate(`/groups/${data.id}/match-request/`)
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

const CarouselModal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      {isVisible && <>{children}</>}
    </Modal>
  )
}

const AndroidProfileImagesCarousel = gestureHandlerRootHOC(
  ({ images }: { images: UserProfileImages[] }) => {
    return (
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Carousel
          data={images.map((image) => image.image)}
          loop={false}
          width={240}
          height={240}
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => {
            return (
              <>
                {index === 0 && (
                  <Chip>
                    <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
                  </Chip>
                )}
                <Image
                  style={{ width: 240, height: 240, borderRadius: 20 }}
                  source={{
                    uri: images[index].image,
                  }}
                />
              </>
            )
          }}
        />
      </Row>
    )
  },
)

const IosProfileImagesCarousel = ({
  images,
}: {
  images: UserProfileImages[]
}) => {
  return (
    <Row
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Carousel
        data={images.map((image) => image.image)}
        loop={false}
        width={240}
        height={240}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        scrollAnimationDuration={1000}
        renderItem={({ index }) => {
          return (
            <>
              {index === 0 && (
                <Chip>
                  <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
                </Chip>
              )}
              <Image
                style={{ width: 240, height: 240, borderRadius: 20 }}
                source={{
                  uri: images[index].image,
                }}
              />
            </>
          )
        }}
      />
    </Row>
  )
}

const UserReportModal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      {isVisible && <>{children}</>}
    </Modal>
  )
}

type ReportReason = '사진도용' | '불건전프로필' | '비매너채팅' | '개인연락처'

const UserReportModalContent = ({
  groupId,
  onClose,
}: {
  groupId: number
  onClose: () => void
}) => {
  const [reportReason, setReportReason] = useState<ReportReason | null>(null)
  return (
    <UserReportContainer>
      <H2 style={{ marginBottom: 16 }}>그룹을 신고할까요?</H2>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: Colors.gray.v100,
          width: '100%',
          marginBottom: 16,
        }}
      >
        <ReportItem
          onPress={() => {
            setReportReason('사진도용')
          }}
        >
          <Body
            style={{
              color:
                reportReason === '사진도용' ? Colors.primary.red : undefined,
            }}
          >
            다른 사람의 사진을 도용
          </Body>
        </ReportItem>
        <ReportItem
          onPress={() => {
            setReportReason('불건전프로필')
          }}
        >
          <Body
            style={{
              color:
                reportReason === '불건전프로필'
                  ? Colors.primary.red
                  : undefined,
            }}
          >
            불건전한 프로필 내용
          </Body>
        </ReportItem>
        <ReportItem
          onPress={() => {
            setReportReason('비매너채팅')
          }}
        >
          <Body
            style={{
              color:
                reportReason === '비매너채팅' ? Colors.primary.red : undefined,
            }}
          >
            매너 없는 채팅
          </Body>
        </ReportItem>
        <ReportItem
          onPress={() => {
            setReportReason('개인연락처')
          }}
        >
          <Body
            style={{
              color:
                reportReason === '개인연락처' ? Colors.primary.red : undefined,
            }}
          >
            프로필에 개인 연락처를 기입
          </Body>
        </ReportItem>
      </View>
      <Button
        text={'신고하기'}
        onPress={async () => {
          if (!reportReason) return
          await reportAbuse(groupId, reportReason)
          onClose()
          Toast.show({
            type: 'success',
            text1: '신고가 접수되었어요',
            text2: '접수된 사항은 검토 후 반영될 예정입니다 :)',
          })
        }}
        textColor={Colors.white}
        disabled={!reportReason}
      />
      <Row style={{ marginTop: 8 }}>
        <Button
          text={'취소하기'}
          onPress={() => {
            onClose()
          }}
          color={Colors.white}
          textColor={Colors.gray.v400}
        />
      </Row>
    </UserReportContainer>
  )
}

const Chip = styled(View)`
  width: 33px;
  height: 23px;
  border-radius: 8px;
  background-color: ${Colors.primary.blue};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  left: 26px;
  z-index: 100;
`
const CandyContainer = styled(Row)`
  position: absolute;
  right: 12px;
  top: -48px;
  background-color: ${Colors.white};
  padding: 8px 16px;
  border-radius: 16px;
`

const UserReportContainer = styled(Column)`
  background-color: ${Colors.white};
  border-radius: 24px;
  padding: 28px 16px 16px 16px;
  align-items: center;
  position: relative;
`

const WrapBox = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
