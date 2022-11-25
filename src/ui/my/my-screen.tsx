import React from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Body, Caption, H2, H3 } from 'ui/common/text'
import {
  CandyIconPng,
  GroupAddSvg,
  GroupEditSvg,
  MyCandyGradientSvg as _MyCandyGradientSvg,
} from 'image'
import { Colors } from 'infra/colors'
import { Image } from 'ui/common/image'
import { useMy } from 'api/reads'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { GroupDesc } from 'ui/common/group-desc'
import { navigation } from 'navigation/global'
import { Menu, WebViewMenu } from 'ui/my/menu'
import { TopInsetSpace } from 'ui/common/inset-space'
import { syncCodePush } from 'infra/util'

export const MyScreen = () => {
  const { data } = useMy()
  return (
    <ScrollView>
      <TopInsetSpace />
      <GroupSection>
        {data?.joined_group ? (
          <>
            <Row style={{ marginBottom: 16 }}>
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={() => navigation.navigate('GroupEditScreen')}
              >
                <AvatarRing>
                  <Avatar
                    side={60}
                    source={{
                      uri: data.joined_group.group_profile_images[0].thumbnail,
                    }}
                  />
                </AvatarRing>
                <GroupEditSvg
                  style={{ position: 'absolute', right: -8, bottom: -8 }}
                />
              </TouchableOpacity>
            </Row>
            <H2 numberOfLines={1} style={{ marginBottom: 4 }}>
              {data.joined_group.title}
            </H2>
            <GroupDesc data={data.joined_group} />
          </>
        ) : (
          <>
            <Row style={{ marginBottom: 16 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('GroupCreateStack')}
              >
                <AvatarRing>
                  <GroupAddSvg />
                </AvatarRing>
              </TouchableOpacity>
            </Row>
            <H2 style={{ marginBottom: 4 }}>내 그룹을 만들어볼까요?</H2>
            <Caption style={{ lineHeight: 16, color: Colors.gray.v400 }}>
              그룹을 만들어 다른 그룹과 매칭해보세요 :)
            </Caption>
          </>
        )}
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
      <WebViewMenu title='고객문의 ∙ 건의사항' uri={data?.app_info?.faq_url} />
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
        uri={data?.app_info?.terms_of_service_url}
      />
      <VerticalSpace />
      <WebViewMenu
        title='개인정보처리방침'
        uri={data?.app_info?.privacy_policy_url}
      />
      <VerticalSpace />
      <WebViewMenu
        title='위치기반서비스 이용약관'
        uri={data?.app_info?.terms_of_location_service_url}
      />
      <VerticalSpace />
      <WebViewMenu
        title='사업자 정보'
        uri={data?.app_info?.business_registration_url}
      />
      <VerticalSpace />
      <VerticalSpace />
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
