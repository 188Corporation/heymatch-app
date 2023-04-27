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

export const ProfilePhotoRejectedScreen = () => {
  const { userProfileStore } = useStores()
  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image
              source={{ uri: userProfileStore.photos.mainPhoto }}
              style={{
                width: 128,
                height: 128,
                borderRadius: 20,
                marginBottom: 60,
                opacity: 0.5,
              }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
              <H2 style={{ marginBottom: 8, color: Colors.gray.v500 }}>
                프로필 승인이 반려되었어요
              </H2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                얼굴 인식이 어려운 경우 프로필 승인이 반려돼요
              </Body2>
              <Body2 style={{ color: Colors.gray.v400 }}>
                사진을 수정하고 다시 시도해주세요 😀
              </Body2>
            </View>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='프로필 사진 수정하기'
        // 서버로부터 심사 불통과에 대한 event emitter를 받게 된다면
        // ProfilePhotoRegisterScreen에서 사진을 등록한 뒤 바로 ProfilePhotoVerificationScreen AFTER로 이동
        onPress={() => navigation.navigate('ProfilePhotoRegisterScreen')}
      />
    </>
  )
}
const Container = styled(View)`
  padding: 0px 59px;
`
