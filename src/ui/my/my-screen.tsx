import { useMy, useOnboardingStatus } from 'api/reads'
import {
  CandyIconPng,
  MyCandyGradientSvg as _MyCandyGradientSvg,
  VerifiedSvg,
} from 'image'
import { Colors } from 'infra/colors'
import { syncCodePush } from 'infra/util'
import { CODEPUSH_VERSION } from 'infra/version'
import { navigation } from 'navigation/global'
import React from 'react'
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { Body, Caption, H2, H3 } from 'ui/common/text'
import { Menu, WebViewMenu } from 'ui/my/menu'

export const MyScreen = () => {
  const { data: myData } = useMy()
  const { data: onboardingData } = useOnboardingStatus()
  const { alertStore, userProfileStore, groupCreateStore } = useStores()

  if (!myData || !onboardingData) return <LoadingOverlay />

  const profileUnderVerification =
    Boolean(onboardingData.extra) &&
    onboardingData.extra === 'profile_under_verification' &&
    onboardingData.status === 'onboarding_completed'

  const getSortedProfilePhotos = () => {
    const subPhotos = myData.user_profile_images
      .filter((_) => !_.is_main)
      .sort((a, b) => {
        if (a.order > b.order) {
          return 1
        } else {
          return -1
        }
      })

    return {
      main: myData.user_profile_images.find((_) => _.is_main)!,
      sub1: subPhotos[0] ?? undefined,
      sub2: subPhotos[1] ?? undefined,
    }
  }

  const initializeUserProfileStore = () => {
    userProfileStore.setUsername(myData.user.username)
    userProfileStore.setBirthdate(myData.user.birthdate!)
    userProfileStore.setGender(myData.user.gender!)
    userProfileStore.setPhotos(getSortedProfilePhotos().main.image, 'main')
    if (getSortedProfilePhotos().sub1) {
      userProfileStore.setPhotos(getSortedProfilePhotos().sub1?.image, 'sub1')
    } else {
      userProfileStore.setPhotos('', 'sub1')
    }
    if (getSortedProfilePhotos().sub2) {
      userProfileStore.setPhotos(getSortedProfilePhotos().sub2?.image, 'sub2')
    } else {
      userProfileStore.setPhotos('', 'sub2')
    }
    if (myData.user.male_body_form) {
      userProfileStore.setBodyForm(
        myData.user.gender!,
        myData.user.male_body_form,
      )
    }
    if (myData.user.female_body_form) {
      userProfileStore.setBodyForm(
        myData.user.gender!,
        myData.user.female_body_form,
      )
    }
    if (myData.user.height_cm) {
      userProfileStore.setHeight(myData.user.height_cm)
    }
    if (myData.user.job_title) {
      userProfileStore.setJobTitle(myData.user.job_title)
    }
    if (myData.user.verified_company_name || myData.user.verified_school_name) {
      userProfileStore.setVerifiedOrganizationNames([
        myData.user.verified_company_name ??
          myData.user.verified_school_name ??
          '기타',
      ])
    }
  }

  return (
    <ScrollView>
      <TopInsetSpace />
      <GroupSection>
        <Row style={{ marginBottom: 8 }}>
          <TouchableOpacity style={{ position: 'relative' }} onPress={() => {}}>
            <AvatarRing>
              <Avatar
                side={60}
                source={{
                  uri: getSortedProfilePhotos().main.thumbnail,
                }}
              />
            </AvatarRing>
          </TouchableOpacity>
        </Row>
        <H2 style={{ marginBottom: 8 }}>{myData.user.username}</H2>
        <Row>
          <MyButton
            onPress={() => {
              if (!myData?.joined_groups?.[0]) {
                alertStore.open({
                  title: '아직 속한 그룹이 없어요!',
                  body: '먼저 그룹을 생성해주세요!',
                  mainButton: '그룹 생성하기',
                  subButton: '나중에 하기',
                  onMainPress: () => {
                    navigation.navigate('GroupCreateStacks')
                    groupCreateStore.initialize()
                  },
                })
                return
              }
              navigation.navigate('GroupDetailScreen', {
                id: myData.joined_groups[0].group.id,
              })
            }}
            style={{ marginRight: 12 }}
          >
            <Caption>내 그룹</Caption>
          </MyButton>
          <MyButton
            onPress={() => {
              initializeUserProfileStore()
              navigation.navigate('EditUserProfileScreen', { data: myData })
            }}
            disabled={profileUnderVerification}
          >
            <Caption>
              {profileUnderVerification ? '심사 중...' : '프로필 편집'}
            </Caption>
          </MyButton>
        </Row>
      </GroupSection>
      <CandySection>
        <MyCandyGradientSvg preserveAspectRatio='none' width='120%' />
        <Body style={{ color: Colors.white }}>내 캔디</Body>
        <H3 style={{ color: Colors.white }}>
          {myData?.user?.point_balance || 0}
        </H3>
      </CandySection>
      <VerticalSpace />
      <VerticalSpace />
      <Menu onPress={() => navigation.navigate('PurchaseScreen')}>
        <Row>
          <Image
            source={CandyIconPng}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <Body>캔디 구매하기</Body>
        </Row>
      </Menu>
      <VerticalSpace />
      <Menu onPress={() => navigation.navigate('RecommandationCodeScreen')}>
        <Body>추천인 코드 입력하기</Body>
      </Menu>
      <VerticalSpace />
      <Menu onPress={() => navigation.navigate('PurchaseHistoryScreen')}>
        <Body>결제내역</Body>
      </Menu>

      <VerticalSpace />
      <VerticalSpace />
      <View style={{ backgroundColor: Colors.gray.v100, height: 1 }} />
      <VerticalSpace />
      <Menu
        onPress={() => {
          initializeUserProfileStore()
          navigation.navigate('EditUserInfoStacks', {
            screen: 'JobInfoScreen',
          })
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <VerifiedSvg fill={Colors.primary.blue} />
          <Body style={{ marginLeft: 4 }}>회사/학교 인증하기</Body>
        </View>
      </Menu>
      <VerticalSpace />
      <WebViewMenu
        title='고객문의 ∙ 건의사항'
        uri={myData?.app_info?.faq_url!}
      />
      <VerticalSpace />
      <Menu onPress={() => navigation.navigate('UserManagementScreen')}>
        <Body>회원정보 관리</Body>
      </Menu>
      <VerticalSpace />
      <VerticalSpace />
      <TouchableWithoutFeedback onLongPress={() => syncCodePush()}>
        <EmptySpace />
      </TouchableWithoutFeedback>
      <VerticalSpace />
      <VerticalSpace />
      <WebViewMenu
        title='이용약관'
        uri={myData?.app_info?.terms_of_service_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='개인정보처리방침'
        uri={myData?.app_info?.privacy_policy_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='위치기반서비스 이용약관'
        uri={myData?.app_info?.terms_of_location_service_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='사업자 정보'
        uri={myData?.app_info?.business_registration_url!}
      />
      <VerticalSpace />
      <VerticalSpace />
      <TouchableWithoutFeedback
        onLongPress={() =>
          Toast.show({ type: 'info', text1: CODEPUSH_VERSION })
        }
      >
        <EmptySpace style={{ backgroundColor: Colors.white }} />
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const GroupSection = styled(Column)`
  margin: 48px 0 20px 0;
  align-items: center;
`

const CandySection = styled(Row)`
  border-radius: 16px;
  margin: 8px 20px;
  padding: 20px 24px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const MyCandyGradientSvg = styled(_MyCandyGradientSvg)`
  position: absolute;
`

const EmptySpace = styled(View)`
  background-color: ${Colors.gray.v100};
  height: 12px;
`

const VerticalSpace = styled(View)`
  height: 4px;
`
const MyButton = styled(TouchableOpacity)`
  width: 120px;
  height: 34px;
  background-color: ${Colors.gray.v100};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
`
