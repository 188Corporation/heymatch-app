import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, TextInput, View } from 'react-native'
import styled from 'styled-components'
import { DescBody2, H1 } from 'ui/common/text'
import { Input } from 'ui/common/input'
import { useStores } from 'store/globals'
import { authorize, getCodeByPhone } from 'api/writes'
import { FullWidthButton } from 'ui/common/button'
import { Column } from 'ui/common/layout'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { useIntervalEffect } from '@react-hookz/web'

export const AuthScreen = () => {
  const { authStore, alertStore } = useStores()
  const phoneInputRef = useRef<TextInput | null>(null)
  const [isPhoneFocused, setIsPhoneFocused] = useState(false)
  const codeInputRef = useRef<TextInput | null>(null)
  const [isCodeFocused, setIsCodeFocused] = useState(false)
  useEffect(() => {
    setTimeout(() => phoneInputRef.current?.focus())
  }, [])
  const [phone, setPhone] = useState('')
  const [sessionToken, setSessionToken] = useState('')
  const [code, setCode] = useState('')
  const [phoneError, setPhoneError] = useState<string>()
  const [codeError, setCodeError] = useState<string>()
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [codeSendAbleInSec, setCodeSendAbleInSec] = useState(30)
  const [codeSendAble, setCodeSendAble] = useState(true)
  useIntervalEffect(
    () => {
      const inSec = codeSendAbleInSec - 1
      if (inSec === 0) {
        setCodeSendAble(true)
        // if not send-able, wait 30 seconds
        setCodeSendAbleInSec(30)
      } else {
        setCodeSendAbleInSec(inSec)
      }
    },
    !codeSendAble ? 1000 : undefined,
  )
  const sendCode = (v: string) => {
    // be optimistic :D
    setPhoneError(undefined)
    setShowCodeInput(true)
    codeInputRef.current?.focus()
    // request api
    setCodeSendAble(false)
    getCodeByPhone(v)
      .then((_sessionToken) => {
        setSessionToken(_sessionToken)
      })
      .catch((e: Error) => {
        setPhoneError(e.message)
        phoneInputRef.current?.focus()
      })
  }
  return (
    <>
      <KeyboardAvoidingView>
        <SafeAreaView style={{ flex: 1 }}>
          <Container>
            {!showCodeInput ? (
              <TextArea>
                <H1>반가워요 :)</H1>
                <H1 style={{ marginBottom: 12 }}>
                  휴대폰 번호를 입력해주세요!
                </H1>
                <DescBody2>
                  등록된 회원인지 확인하고 가입을 진행할게요 :)
                </DescBody2>
              </TextArea>
            ) : (
              <TextArea>
                <H1 style={{ marginBottom: 12 }}>인증번호를 입력해주세요!</H1>
                <DescBody2>
                  {!codeSendAble
                    ? `인증번호는 ${codeSendAbleInSec}초 후에 다시 보낼 수 있어요.`
                    : ' '}
                </DescBody2>
              </TextArea>
            )}
            <View style={{ display: showCodeInput ? 'flex' : 'none' }}>
              <Input
                inputRef={codeInputRef}
                label='인증번호'
                placeholder='인증번호 6자리 입력'
                keyboardType='number-pad'
                autoComplete='sms-otp'
                textContentType='oneTimeCode'
                maxLength={6}
                value={code}
                onValueChange={(v) => {
                  setCode(v)
                  if (v.length === 6) {
                    authorize(phone, v, sessionToken)
                      .then((res) => {
                        setCodeError(undefined)
                        if (res.schedule_delete_canceled) {
                          alertStore.open({
                            title: '계정이 복구되었어요!',
                            body: '7일 안에 재로그인해 탈퇴가 취소되고 계정 정보가 복구되었어요. 다시 오신 걸 환영해요 🤗',
                          })
                        }
                        authStore.login(res.access_token, res.user)
                      })
                      .catch((e: Error) => {
                        setCodeError(e.message)
                        codeInputRef.current?.focus()
                      })
                  }
                }}
                errorMessage={codeError}
                setIsFocused={setIsCodeFocused}
              />
              <View style={{ height: 16 }} />
            </View>
            <Input
              inputRef={phoneInputRef}
              label='휴대폰 번호'
              placeholder='- 없이 숫자만 입력해주세요'
              keyboardType='phone-pad'
              autoComplete='tel-device'
              textContentType='telephoneNumber'
              value={phone}
              onValueChange={(_v) => {
                const v = _v.replace(/\D+/g, '').trim().substring(0, 11)
                setPhone(v)
                if (!showCodeInput && v.length === 11) sendCode(v)
              }}
              errorMessage={phoneError}
              setIsFocused={setIsPhoneFocused}
            />
          </Container>
        </SafeAreaView>
      </KeyboardAvoidingView>
      {showCodeInput && (
        <>
          {isPhoneFocused && (
            <AlignEndColumn>
              <FullWidthButton
                text='인증번호 요청'
                onPress={() => sendCode(phone)}
                disabled={!codeSendAble || phone.length !== 11}
              />
            </AlignEndColumn>
          )}
          {isCodeFocused && codeSendAble && phone.length === 11 && (
            <AlignEndColumn>
              <FullWidthButton text='재발송' onPress={() => sendCode(phone)} />
            </AlignEndColumn>
          )}
        </>
      )}
    </>
  )
}

const Container = styled(View)`
  padding: 72px 20px 0 20px;
`

const TextArea = styled(View)`
  padding: 0 8px;
  margin-bottom: 40px;
`

const AlignEndColumn = styled(Column)`
  position: absolute;
  width: 100%;
  bottom: 0;
`
