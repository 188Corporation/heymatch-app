import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, H1 } from 'ui/common/text'
import { Colors } from 'infra/colors'
import { GroupCreatePhotoGuideSvg } from 'image'
import { BottomButton } from 'ui/group-create/bottom-button'
import { BlueContainer } from 'ui/group-create/blue-container'
import { navigation } from 'navigation/global'

export const GroupCreatePhotoGuideScreen = () => {
  return (
    <BlueContainer>
      <NavigationHeader />
      <H1
        style={{
          textAlign: 'center',
          color: Colors.white,
          marginTop: 40,
          marginBottom: 16,
        }}
      >
        {'사진 촬영부터 시작~!'}
      </H1>
      <Body
        style={{ textAlign: 'center', color: Colors.white, marginBottom: 80 }}
      >
        {
          '사진은 그룹 프로필에 보여져요\n그룹 전체 인원이 잘 나오게 찍어주세요 :)'
        }
      </Body>
      <GroupCreatePhotoGuideSvg />
      <BottomButton
        text='사진 촬영하기'
        onPress={() => navigation.navigate('GroupCreatePhotoScreen')}
      />
    </BlueContainer>
  )
}
