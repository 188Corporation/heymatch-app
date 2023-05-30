import { BackGroundPatternSvg, GroupCardsSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Column } from 'ui/common/layout'
import { H1 } from 'ui/common/text'
import { BlueContainer } from 'ui/group-create/blue-container'

export const GroupCreateDoneScreen = () => {
  return (
    <>
      <BlueContainer>
        <TopInsetSpace />
        <Column style={{ height: 60 }} />
        <GroupCreateH1 style={{ marginBottom: 60 }}>
          {'그룹을 완성했어요!\n바로 매칭할 그룹을 찾아보세요 👀'}
        </GroupCreateH1>
        <GroupCardsSvg />
        <View style={{ position: 'absolute', bottom: 0 }}>
          <BackGroundPatternSvg />
        </View>
      </BlueContainer>
      <BottomButton
        inverted
        text='가자가자!'
        onPress={() => navigation.setRootWithStack('MainTabs', 'GroupScreen')}
      />
    </>
  )
}

const GroupCreateH1 = styled(H1)`
  text-align: center;
  color: ${Colors.white};
  margin-top: 36px;
  margin-bottom: 16px;
`
