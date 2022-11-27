import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, Caption } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { GroupCreatePhotoGuide } from 'image'
import { BlueContainer } from 'ui/group-create/blue-container'
import { navigation } from 'navigation/global'
import { BottomButton } from 'ui/common/bottom-button'
import { Image } from 'ui/common/image'
import { Row } from 'ui/common/layout'
import { GroupCreateH1 } from 'ui/group-create/group-create-h1'
import { CenterInLeftOver } from 'ui/common/center-in-left-over'

export const GroupCreatePhotoGuideScreen = () => {
  return (
    <>
      <BlueContainer>
        <NavigationHeader />
        <GroupCreateH1>{'사진 촬영부터 시작~!'}</GroupCreateH1>
        <Body style={{ textAlign: 'center', color: Colors.white }}>
          {
            '사진은 그룹 프로필에 보여져요\n그룹 전체 인원이 잘 나오게 찍어주세요 :)'
          }
        </Body>
        <CenterInLeftOver>
          <Row style={{ width: 264, paddingLeft: 8, marginBottom: 8 }}>
            <Caption style={{ color: Colors.white }}>예시</Caption>
          </Row>
          <Image
            source={GroupCreatePhotoGuide}
            style={{ width: 264, height: 264 }}
          />
        </CenterInLeftOver>
      </BlueContainer>
      <BottomButton
        inverted
        text='사진 촬영하기'
        onPress={() => navigation.navigate('GroupCreatePhotoScreen')}
      />
    </>
  )
}
