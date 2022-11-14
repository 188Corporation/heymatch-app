import React from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { Body } from 'ui/common/text'
import {
  CandyIconPng,
  MyCandyGradientSvg as _MyCandyGradientSvg,
  RightArrowSvg,
} from 'image'
import { Colors } from 'infra/colors'
import { Image } from 'ui/common/image'

export const MyScreen = () => {
  return (
    <ScrollView>
      <GroupSection />
      <CandySection>
        <MyCandyGradientSvg />
        <Body style={{ color: Colors.white }}>내 캔디</Body>
        <Body style={{ color: Colors.white }}>0</Body>
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
      <Menu>
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
      <Menu>
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

const GroupSection = styled(Row)`
  height: 200px;
  background-color: greenyellow;
`

const CandySection = styled(Row)`
  border-radius: 16px;
  margin: 28px 20px 8px 20px;
  padding: 20px 24px;
  justify-content: space-between;
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
}> = ({ children }) => {
  return (
    <MenuLayout>
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
