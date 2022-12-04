import React from 'react'
import styled from 'styled-components'
import { Column } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { NavigationHeader } from 'ui/common/navigation-header'
import { View } from 'react-native'
import { Image } from 'ui/common/image'
import { useStores } from 'store/globals'
import { H2 } from 'ui/common/text'
import { navigation } from 'navigation/global'
import { BottomButton } from 'ui/common/bottom-button'
import { CenterInLeftOver } from 'ui/common/center-in-left-over'
import {
  PHOTO_SCREEN_HEIGHT,
  PHOTO_SCREEN_WIDTH,
} from 'ui/group-create/group-create-photo-common'

export const GroupCreatePhotoCheckScreen = () => {
  const {
    groupCreateStore: { photo },
  } = useStores()
  if (!photo) {
    navigation.goBack()
    return null
  }
  return (
    <Container>
      <NavigationHeader />
      <View style={{ width: PHOTO_SCREEN_WIDTH, height: PHOTO_SCREEN_HEIGHT }}>
        <Image
          source={{ uri: photo }}
          style={{ width: PHOTO_SCREEN_WIDTH, height: PHOTO_SCREEN_HEIGHT }}
        />
      </View>
      <CenterInLeftOver>
        <H2 style={{ color: Colors.white }}>이 사진으로 등록할까요?</H2>
      </CenterInLeftOver>
      <BottomButton
        inverted
        text='프로필에 등록'
        onPress={() => navigation.navigate('GroupCreateGenderAgeScreen')}
      />
    </Container>
  )
}

const Container = styled(Column)`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
`
