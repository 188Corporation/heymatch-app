import { Colors } from 'infra/colors'
import { navigation } from 'navigation/global'
import React, { useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const EmailInputScreen = () => {
  const emailInputRef = useRef<TextInput | null>(null)
  const [email, setEmail] = useState('')

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <View style={{ marginBottom: 60 }}>
              <H1 style={{ marginBottom: 12 }}>회사를 인증해주세요</H1>
              <DescBody2>
                정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
              </DescBody2>
            </View>
            <Input
              inputRef={emailInputRef}
              label='이메일 주소'
              placeholder='이메일을 입력해주세요'
              keyboardType='email-address'
              autoComplete='email'
              textContentType='emailAddress'
              value={email}
              onValueChange={(v) => {
                setEmail(v)
              }}
              errorMessage={''}
            />
          </Container>
        </FlexScrollView>
      </View>
      <Button
        text='건너뛰기'
        color={Colors.white}
        textColor={Colors.gray.v400}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
      <BottomButton
        text='다음으로'
        disabled={!email}
        onPress={() => navigation.navigate('JobInfoScreen')}
      />
    </KeyboardAvoidingView>
  )
}
const Container = styled(View)`
  padding: 12px 20px 0 20px;
`
