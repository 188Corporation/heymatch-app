import { useMy } from 'api/reads'
import { authorizeEmail, editUserInfo, getCodeByEmail } from 'api/writes'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { Caption, DescBody2, H1 } from 'ui/common/text'

const VALID_TIME = 180
const CAN_RESEND_TIME = 120

export const EmailVerificationCodeInputScreen = observer(() => {
  const { data } = useMy()
  const { alertStore, userProfileStore } = useStores()

  const emailVerificationCodeInputRef = useRef<TextInput | null>(null)
  const [loading, setLoading] = useState(false)
  const [alreadySend, setAlreadySend] = useState(true)
  const [timer, setTimer] = useState(VALID_TIME)

  const handleClickResendCode = async () => {
    if (alreadySend) return
    try {
      setLoading(true)
      await getCodeByEmail(
        userProfileStore.email!,
        userProfileStore.jobTitle === 'employee' ? 'company' : 'school',
      ).then((res) => {
        userProfileStore.setVerifiedOrganizationNames(res.names)
      })
      await mutate('/auth/email/get-code/')
    } catch (e) {
      alertStore.error(e, '코드 발송에 실패했어요!')
    } finally {
      setLoading(false)
      setAlreadySend(true)
      setTimer(VALID_TIME)
    }
  }

  useEffect(() => {
    if (timer < CAN_RESEND_TIME) {
      setAlreadySend(false)
    }
  }, [timer])

  return (
    <KeyboardAvoidingView>
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <TopInsetSpace />
          <Container>
            <View style={{ marginBottom: 40 }}>
              <H1 style={{ marginBottom: 12 }}>인증 코드를 입력해주세요</H1>
              <DescBody2>메일로 전송된 코드를 입력해주세요 :)</DescBody2>
            </View>
            <Input
              inputRef={emailVerificationCodeInputRef}
              label='인증 코드'
              placeholder='인증 코드를 입력해주세요'
              keyboardType='default'
              textContentType='oneTimeCode'
              value={userProfileStore.emailVerificationCode}
              onValueChange={(v) => {
                if (v.length === 6) {
                  return
                }
                userProfileStore.setEmailVerificationCode(v)
              }}
              letterCase='upper'
              suffix={timer > 0 && <Timer timer={timer} setTimer={setTimer} />}
              // errorMessage={'인증코드를 다시 확인해주세요!'}
            />
            <SendButton onPress={handleClickResendCode}>
              <Caption>{alreadySend ? '보냈어요!' : '다시 보내기'}</Caption>
            </SendButton>
          </Container>
        </FlexScrollView>
      </View>
      {!data?.user.has_account && (
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
              onSubPress: async () => {
                setLoading(true)
                try {
                  await editUserInfo({
                    username: userProfileStore.username,
                    gender: userProfileStore.gender!,
                    birthdate: userProfileStore.birthdate!,
                    mainProfileImage: userProfileStore.photos.mainPhoto,
                    otherProfileImage1: userProfileStore.photos.sub1Photo,
                    otherProfileImage2: userProfileStore.photos.sub2Photo,
                    heightCm: userProfileStore.height,
                    maleBodyForm: userProfileStore.maleBodyForm,
                    femaleBodyForm: userProfileStore.femaleBodyForm,
                    jobTitle: userProfileStore.jobTitle,
                  })
                  await mutate('/users/my/')

                  navigation.navigate('ProfilePhotoVerificationScreen', {
                    stage: 'AFTER',
                  })
                } catch (e) {
                  alertStore.error(e, '회원정보 등록에 실패했어요!')
                } finally {
                  setLoading(false)
                }
              },
            })
          }}
        />
      )}
      <BottomButton
        text='인증하기'
        disabled={!userProfileStore.emailVerificationCode}
        onPress={async () => {
          setLoading(true)
          try {
            await authorizeEmail(
              userProfileStore.email!,
              userProfileStore.emailVerificationCode,
              userProfileStore.jobTitle === 'employee' ? 'company' : 'school',
              userProfileStore.verifiedOrganizationNames![0],
            )
            await mutate('/auth/phone/authorize/')
            navigation.navigate('ConfirmCompanyScreen')
          } catch (e) {
            alertStore.error(e, '코드가 유효하지 않아요!')
          } finally {
            setLoading(false)
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </KeyboardAvoidingView>
  )
})
const Container = styled(View)`
  padding: 72px 28px 0px 28px;
`
const SendButton = styled(TouchableOpacity)`
  margin-top: 12px;
  width: 108px;
  height: 38px;
  border-radius: 10px;
  padding: 10px 24px 10px 24px;
  background-color: #f4f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Timer = ({
  timer,
  setTimer,
}: {
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [setTimer])

  const convertTime = () => {
    const minute = Math.floor(timer / 60)
    const second = timer % 60
    return `${minute}:${!second || second < 10 ? '0' : ''}${second}`
  }

  return (
    <>
      <Caption>{convertTime()}</Caption>
    </>
  )
}
