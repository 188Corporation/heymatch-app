import { PlusSvg } from 'image'
import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body2, CaptionS, H1 } from 'ui/common/text'

export const ProfilePhotoScreen = () => {
  return (
    <>
      <FlexScrollView>
        <TopInsetSpace />
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>프로필 사진을 등록해주세요</H1>
            <Body2 style={{ color: Colors.gray.v400 }}>
              얼굴이 잘 보이는 사진으로 등록해주세요
            </Body2>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 218 }}>
            <MainTouchable>
              <Chip>
                <CaptionS style={{ color: '#FFFFFF' }}>대표</CaptionS>
              </Chip>
              <PlusSvg />
            </MainTouchable>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <SubTouchable>
                <PlusSvg />
              </SubTouchable>
              <SubTouchable style={{ marginTop: 14 }}>
                <PlusSvg />
              </SubTouchable>
            </View>
          </View>
        </Container>
      </FlexScrollView>
      <BottomButton
        text='다음으로'
        disabled={true}
        onPress={() => navigation.navigate('BirthdayScreen')}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0 28px;
`
const MainTouchable = styled(TouchableOpacity)`
  background-color: ${Colors.gray.v100};
  flex: 2;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`

const SubTouchable = styled(TouchableOpacity)`
  background-color: ${Colors.gray.v100};
  flex: 1;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`
const Chip = styled(View)`
  width: 33px;
  height: 23px;
  border-radius: 8px;
  background-color: ${Colors.primary.blue};
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  left: 26px;
`
