import { useMy } from 'api/reads'
import { CandyIconPng, MyCandyGradientSvg as _MyCandyGradientSvg } from 'image'
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
import { Body, Caption, H3 } from 'ui/common/text'
import { Menu, WebViewMenu } from 'ui/my/menu'

export const MyScreen = () => {
  const { data } = useMy()
  const { alertStore } = useStores()

  return (
    <ScrollView>
      <TopInsetSpace />
      <GroupSection>
        <Row style={{ marginBottom: 16 }}>
          <TouchableOpacity
            style={{ position: 'relative' }}
            onPress={() => navigation.navigate('GroupEditScreen')}
          >
            <AvatarRing>
              <Avatar
                side={60}
                source={{
                  uri: data?.user.user_profile_images[0].image,
                }}
              />
            </AvatarRing>
          </TouchableOpacity>
        </Row>
        <Row>
          <MyButton
            onPress={() => {
              if (!data?.joined_groups) {
                alertStore.open({
                  title: '아직 속한 그룹이 없어요!',
                  body: '먼저 그룹을 생성해주세요!',
                  mainButton: '그룹 생성하기',
                  subButton: '나중에 하기',
                  onMainPress: () => {
                    navigation.navigate('NewGroupCreateStacks')
                  },
                })
                return
              }
              navigation.navigate('NewGroupDetailScreen')
            }}
            style={{ marginRight: 12 }}
          >
            <Caption>내 그룹</Caption>
          </MyButton>
          <MyButton
            onPress={() => navigation.navigate('PersonalProfileEditScreen')}
          >
            <Caption>프로필 편집</Caption>
          </MyButton>
        </Row>
      </GroupSection>
      <CandySection>
        <MyCandyGradientSvg preserveAspectRatio='none' width='120%' />
        <Body style={{ color: Colors.white }}>내 캔디</Body>
        <H3 style={{ color: Colors.white }}>
          {data?.user?.point_balance || 0}
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
      <Menu onPress={() => navigation.navigate('PurchaseHistoryScreen')}>
        <Body>결제내역</Body>
      </Menu>
      <VerticalSpace />
      <VerticalSpace />
      <View style={{ backgroundColor: Colors.gray.v100, height: 1 }} />
      <VerticalSpace />
      <VerticalSpace />
      <WebViewMenu title='고객문의 ∙ 건의사항' uri={data?.app_info?.faq_url!} />
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
        uri={data?.app_info?.terms_of_service_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='개인정보처리방침'
        uri={data?.app_info?.privacy_policy_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='위치기반서비스 이용약관'
        uri={data?.app_info?.terms_of_location_service_url!}
      />
      <VerticalSpace />
      <WebViewMenu
        title='사업자 정보'
        uri={data?.app_info?.business_registration_url!}
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
