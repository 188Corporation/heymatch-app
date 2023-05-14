import { editUserInfo, getCodeByEmail } from 'api/writes'
import { Colors } from 'infra/colors'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { Input } from 'ui/common/input'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { DescBody2, H1 } from 'ui/common/text'

export const EmailInputScreen = observer(() => {
  const { userProfileStore, alertStore } = useStores()
  const emailInputRef = useRef<TextInput | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <KeyboardAvoidingView>
      <NavigationHeader backButtonStyle='black' title='' />
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <Container>
            <View style={{ marginBottom: 60 }}>
              {userProfileStore.jobTitle === 'employee' && (
                <H1 style={{ marginBottom: 12 }}>회사를 인증해주세요</H1>
              )}
              {userProfileStore.jobTitle === 'college_student' && (
                <H1 style={{ marginBottom: 12 }}>학교를 인증해주세요</H1>
              )}
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
              value={userProfileStore.email ?? ''}
              onValueChange={(v) => {
                userProfileStore.setEmail(v)
              }}
              letterCase='lower'
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
            onSubPress: async () => {
              setLoading(true)
              try {
                await editUserInfo(
                  userProfileStore.gender!,
                  userProfileStore.birthdate!,
                  userProfileStore.photos.mainPhoto,
                  userProfileStore.photos.sub1Photo,
                  userProfileStore.photos.sub2Photo,
                  userProfileStore.height,
                  userProfileStore.maleBodyForm,
                  userProfileStore.femaleBodyForm,
                  userProfileStore.jobTitle,
                )
                await mutate('/users/my/')

                // TODO: profile-photo-examination 혹은 메인화면
                navigation.navigate('ProfilePhotoVerificationScreen', {
                  stage: 'AFTER',
                })
              } catch (e) {
                alertStore.error(e, '프로필 사진 등록에 실패했어요!')
              } finally {
                setLoading(false)
              }
            },
          })
        }}
      />
      <BottomButton
        text='다음으로'
        disabled={!userProfileStore.email}
        onPress={async () => {
          setLoading(true)
          try {
            await getCodeByEmail(
              userProfileStore.email!,
              userProfileStore.jobTitle === 'employee' ? 'company' : 'school',
            ).then((res) => {
              userProfileStore.setVerifiedOrganizationNames(res.names)
            })
            await mutate('/auth/email/get-code/')

            if (userProfileStore.verifiedOrganizationNames?.length === 1) {
              navigation.navigate('EmailVerificationCodeInputScreen')
            } else {
              navigation.navigate('SelectSubsidiaryScreen')
            }
          } catch (e) {
            alertStore.error(e, '이메일을 다시 확인해주세요!')
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
  padding: 12px 28px 0px 28px;
`
