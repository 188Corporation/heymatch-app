import React from 'react'
import { Colors } from 'infra/colors'
import { NavigationHeader } from 'ui/common/navigation-header'
import { H1 } from 'ui/common/text'
import { GroupCreateIntroSvg } from 'image'
import { BottomButton } from 'ui/group-create/bottom-button'
import { BlueContainer } from 'ui/group-create/blue-container'
import { navigation } from 'navigation/global'

export const GroupCreateIntroScreen = () => {
  return (
    <BlueContainer>
      <NavigationHeader />
      <H1
        style={{ textAlign: 'center', color: Colors.white, marginVertical: 56 }}
      >
        {'내 그룹 만들기를\n시작해볼까요?'}
      </H1>
      <GroupCreateIntroSvg />
      <BottomButton
        text='시작할게요!'
        onPress={() => navigation.navigate('GroupCreatePhotoGuideScreen')}
      />
    </BlueContainer>
  )
}
