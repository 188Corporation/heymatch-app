import React from 'react'
import { NavigationHeader } from 'ui/common/navigation-header'
import { GroupCreateIntroSvg } from 'image'
import { BlueContainer } from 'ui/group-create/blue-container'
import { navigation } from 'navigation/global'
import { BottomButton } from 'ui/common/bottom-button'
import { GroupCreateH1 } from 'ui/group-create/group-create-h1'
import { CenterInLeftOver } from 'ui/common/center-in-left-over'

export const GroupCreateIntroScreen = () => {
  return (
    <>
      <BlueContainer>
        <NavigationHeader />
        <GroupCreateH1>{'내 그룹 만들기를\n시작해볼까요?'}</GroupCreateH1>
        <CenterInLeftOver>
          <GroupCreateIntroSvg />
        </CenterInLeftOver>
      </BlueContainer>
      <BottomButton
        inverted
        text='시작할게요!'
        onPress={() => navigation.navigate('GroupCreatePhotoGuideScreen')}
      />
    </>
  )
}
