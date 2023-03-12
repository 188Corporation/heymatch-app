import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Image } from 'ui/common/image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, H2 } from 'ui/common/text'

export const ProfilePhotoExaminationScreen = () => {
  const { indivisualProfileStore } = useStores()
  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image
              source={{ uri: indivisualProfileStore.photos.mainPhoto }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 20,
                marginBottom: 60,
              }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
              <H2 style={{ marginBottom: 8, color: Colors.gray.v500 }}>
                프로필을 확인하고 있어요
              </H2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                빠르게 확인하고 알려드릴게요 😀
              </Body2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                기다리는 동안 회원님에 대해 조금 더 알려줄래요?
              </Body2>
            </View>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='+ 추가 정보 등록하기'
        onPress={() => navigation.navigate('BodyInfoScreen')}
      />
    </>
  )
}
const Container = styled(View)`
  padding: 0px 59px;
`
