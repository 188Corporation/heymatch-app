import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const EmailVerificationCodeInputScreen = observer(() => {
  const { alertStore } = useStores()

  const emailVerificationCodeInputRef = useRef<TextInput | null>(null)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <View style={{ marginBottom: 60 }}>
              <H1 style={{ marginBottom: 12 }}>인증 코드를 입력해주세요</H1>
              <DescBody2>메일로 전송된 코드를 입력해주세요 :)</DescBody2>
            </View>
            <Input
              inputRef={emailVerificationCodeInputRef}
              label='인증 코드'
              placeholder='인증 코드를 입력해주세요'
              keyboardType='number-pad'
              autoComplete='sms-otp'
              textContentType='oneTimeCode'
              value={emailVerificationCode}
              onValueChange={(v) => {
                if (v.length === 6) {
                  // TODO: authorize
                  return
                }
                setEmailVerificationCode(v)
              }}
              // TODO
              errorMessage={''}
            />
          </Container>
        </FlexScrollView>
      </View>
      <Button
        text='건너뛰기'
        color={Colors.white}
        textColor={Colors.gray.v400}
        onPress={() => {
          alertStore.open({
            title: '추가 정보 입력을 건너뛸까요?',
            body: '지금까지 작성해주신 정보만 저장돼요!',
            mainButton: '계속 이어서 할게요!',
            subButton: '네 건너뛸게요',
            onSubPress: () =>
              navigation.navigate('ProfilePhotoExaminationAfterScreen'),
          })
        }}
      />
      <BottomButton
        text='다음으로'
        disabled={!emailVerificationCode}
        onPress={() =>
          navigation.navigate('ProfilePhotoExaminationAfterScreen')
        }
      />
    </KeyboardAvoidingView>
  )
})
const Container = styled(View)`
  padding: 12px 20px 0 20px;
`
