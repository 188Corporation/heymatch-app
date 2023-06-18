import Clipboard from '@react-native-clipboard/clipboard'
import { ClipboardSvg } from 'image'
import { Colors } from 'infra/colors'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { Input } from 'ui/common/input'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, DescBody2, H1, H3 } from 'ui/common/text'

export const RecommandationCodeScreen = () => {
  const [code, setCode] = useState('')

  const copyToClipboard = () => {
    Clipboard.setString(code)
    Toast.show({
      type: 'success',
      text1: '클립보드에 복사했어요!',
    })
  }

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>추천인 코드 입력하기</H1>
            <DescBody2>
              추천인과 코드를 입력한 분 모두에게 캔디 20개를 드려요!
            </DescBody2>
          </View>
          <Input
            label='추천인코드'
            placeholder='추천인 코드'
            value={code}
            onValueChange={setCode}
          />
          <H3 style={{ marginTop: 56, marginBottom: 16 }}>내 코드 복사하기</H3>
          <ProfileInfoContainer>
            <Body>SSDDAA</Body>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={{ marginLeft: 'auto' }}
            >
              <ClipboardSvg />
            </TouchableOpacity>
          </ProfileInfoContainer>
        </Container>
      </View>
      <BottomButton
        text={'입력하기'}
        disabled={Boolean(!code)}
        onPress={() => {}}
      />
    </>
  )
}
const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
const ProfileInfoContainer = styled(TouchableOpacity)`
  border-radius: 12px;
  background-color: ${Colors.gray.v100};
  padding: 20px;
  display: flex;
  flex-direction: row
  align-items: center;
`
