import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { CenterInLeftOver } from 'ui/common/center-in-left-over'
import { Image } from 'ui/common/image'
import { Column } from 'ui/common/layout'
import { NavigationHeader } from 'ui/common/navigation-header'
import { H2 } from 'ui/common/text'
import {
  PHOTO_SCREEN_HEIGHT,
  PHOTO_SCREEN_WIDTH,
} from 'ui/group-create/group-create-photo-common'

export const GroupCreatePhotoCheckScreen = () => {
  const {
    groupCreateStoreRegacy: { photo },
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
