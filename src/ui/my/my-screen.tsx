import React from 'react'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Body, Caption, H2, H3 } from 'ui/common/text'
import {
  CandyIconPng,
  GroupAddSvg,
  GroupEditSvg,
  MyCandyGradientSvg as _MyCandyGradientSvg,
  RightArrowSvg,
} from 'image'
import { Colors } from 'infra/colors'
import { Image } from 'ui/common/image'
import { useMy } from 'api/reads'
import { Avatar, AvatarRing } from 'ui/common/avatar'
import { GroupDesc } from 'ui/common/group-desc'
import { navigation } from 'navigation/global'
import { useStores } from 'store/globals'

export const MyScreen = () => {
  const { data } = useMy()
  const { alertStore, authStore } = useStores()
  return (
    <ScrollView>
      <GroupSection>
        {data?.joined_group ? (
          <>
            <Row style={{ marginBottom: 16 }}>
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={() => navigation.navigate('GroupCreateStack')}
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
        <MyCandyGradientSvg />
        <Body style={{ color: Colors.white }}>내 캔디</Body>
        <H3 style={{ color: Colors.white }}>
          {data?.user?.point_balance || 0}
        </H3>
      </CandySection>
      <Menu>
        <Row style={{ paddingVertical: 16 }}>
          <Image
            source={CandyIconPng}
            style={{ width: 24, height: 24, marginRight: 12 }}
          />
          <Body>캔디 구매 내역</Body>
        </Row>
      </Menu>
      <View style={{ backgroundColor: Colors.gray.v100, height: 1 }} />
      <VerticalSpace />
      <VerticalSpace />
      <Menu>
        <Body>앱 문의 ∙ 건의</Body>
      </Menu>
      <VerticalSpace />
      <Menu
        onPress={() =>
          alertStore.open({
            title: '로그아웃할까요?',
            buttonText: '로그아웃하기',
            cancelText: '다음에',
            onPress: () => authStore.logout(),
          })
        }
      >
        <Body>로그아웃</Body>
      </Menu>
      <VerticalSpace />
      <VerticalSpace />
      <EmptySpace />
      <VerticalSpace />
      <VerticalSpace />
      <Menu>
        <Body>이용약관</Body>
      </Menu>
      <VerticalSpace />
      <Menu
        onPress={() =>
          navigation.navigate('WebViewScreen', {
            title: '개인정보처리방침',
            uri: 'https://google.com',
          })
        }
      >
        <Body>개인정보처리방침</Body>
      </Menu>
      <VerticalSpace />
      <Menu>
        <Body>위치기반서비스 이용약관</Body>
      </Menu>
      <VerticalSpace />
      <Menu>
        <Body>사업자 정보</Body>
      </Menu>
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
  width: 100%;
  height: 100%;
`

const Menu: React.FCC<{
  onPress?: () => void
}> = ({ children, onPress }) => {
  return (
    <MenuLayout onPress={onPress}>
      {children}
      <RightArrowSvg />
    </MenuLayout>
  )
}

const MenuLayout = styled(TouchableOpacity)`
  padding: 16px 28px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const EmptySpace = styled(View)`
  background-color: ${Colors.gray.v100};
  height: 12px;
`

const VerticalSpace = styled(View)`
  height: 4px;
`
