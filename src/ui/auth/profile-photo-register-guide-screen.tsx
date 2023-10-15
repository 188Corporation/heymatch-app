import {
  essentialPhoto1,
  essentialPhoto2,
  essentialPhoto3,
  optionalPhoto1,
  optionalPhoto2,
  optionalPhoto3,
  rejectablePhoto1,
  rejectablePhoto2,
  rejectablePhoto3,
} from 'image'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Image } from 'ui/common/image'
import { Row } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, CaptionS, H1, H2 } from 'ui/common/text'

export const ProfilePhotoRegisterGuideScreen = () => {
  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <Container>
        <View style={{ marginBottom: 24 }}>
          <H1>사진 등록 가이드</H1>
        </View>
        <GuideRow
          title={'필수 사진'}
          subText={'이목구비가 잘 보이도록 얼굴이 정면에서 나온 사진'}
          photo1={essentialPhoto1}
          photo2={essentialPhoto2}
          photo3={essentialPhoto3}
        />
        <GuideRow
          title={'선택 사진'}
          subText={'그 외에 자유롭게 나의 매력을 보여줄 수 있는 사진'}
          photo1={optionalPhoto1}
          photo2={optionalPhoto2}
          photo3={optionalPhoto3}
        />
        <GuideRow
          title={'승인이 거절될 수 있는 필수 사진'}
          photo1={rejectablePhoto1}
          photo2={rejectablePhoto2}
          photo3={rejectablePhoto3}
          photo1Text={'얼굴이 안 보이는 사진'}
          photo2Text={'단체 사진'}
          photo3Text={'사물 및 풍경'}
        />
      </Container>
    </>
  )
}

const GuideRow = ({
  title,
  subText,
  photo1,
  photo2,
  photo3,
  photo1Text,
  photo2Text,
  photo3Text,
}: {
  title: string
  subText?: string
  photo1: any
  photo2: any
  photo3: any
  photo1Text?: string
  photo2Text?: string
  photo3Text?: string
}) => {
  return (
    <>
      <H2 style={{ marginBottom: subText ? 8 : 16 }}>{title}</H2>
      {subText && <Body style={{ marginBottom: 24 }}>{subText}</Body>}
      <Row style={{ marginBottom: 30 }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <Avatar source={photo1} />
          {photo1Text && (
            <CaptionS style={{ marginTop: 20 }}>{photo1Text}</CaptionS>
          )}
        </View>
        <View
          style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}
        >
          <Avatar source={photo2} />
          {photo2Text && (
            <CaptionS style={{ marginTop: 20 }}>{photo2Text}</CaptionS>
          )}
        </View>
        <View
          style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}
        >
          <Avatar source={photo3} />
          {photo3Text && (
            <CaptionS style={{ marginTop: 20 }}>{photo3Text}</CaptionS>
          )}
        </View>
      </Row>
    </>
  )
}
const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
const Avatar = styled(Image)`
  border-radius: 30px
  width: 86px
  height: 86px
`
