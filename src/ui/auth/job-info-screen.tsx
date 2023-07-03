import { useOnboardingStatus } from 'api/reads'
import { completeInputExtraInfo, editUserInfo } from 'api/writes'
import { Colors } from 'infra/colors'
import { jobTitleForm } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React, { useState } from 'react'
import { View } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { mutate } from 'swr'
import { BottomButton } from 'ui/common/bottom-button'
import { Button } from 'ui/common/button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, DescBody2, H1 } from 'ui/common/text'

export const JobInfoScreen = observer(() => {
  const { data } = useOnboardingStatus()
  const { userProfileStore, alertStore } = useStores()
  const [loading, setLoading] = useState(false)

  const handleOnPress = (v: any) => {
    userProfileStore.setJobTitle(v)
  }

  return (
    <>
      <NavigationHeader backButtonStyle='black' title='' />
      <FlexScrollView>
        <Container>
          <View style={{ marginBottom: 60 }}>
            <H1 style={{ marginBottom: 12 }}>직업을 선택해주세요</H1>
            <DescBody2>
              정보를 더 알려주시면 빠른 매칭에 도움이 돼요 :)
            </DescBody2>
          </View>
          <RadioForm>
            {jobTitleForm.map((x, idx) => {
              return (
                <View
                  key={x.value}
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <RadioButton key={x.value}>
                    <RadioButtonInput
                      obj={x}
                      index={idx}
                      isSelected={userProfileStore.jobTitle === x.value}
                      onPress={handleOnPress}
                      buttonOuterSize={24}
                      buttonSize={12}
                      buttonInnerColor={Colors.white}
                      buttonOuterColor={
                        userProfileStore.jobTitle === x.value
                          ? Colors.primary.blue
                          : Colors.gray.v200
                      }
                      buttonStyle={{
                        backgroundColor:
                          userProfileStore.jobTitle === x.value
                            ? Colors.primary.blue
                            : Colors.gray.v200,
                      }}
                    />
                    <RadioButtonLabel
                      obj={x}
                      index={idx}
                      labelHorizontal={true}
                      onPress={handleOnPress}
                      labelStyle={{ fontSize: 16 }}
                    />
                    {x.verify && (
                      <Body style={{ color: Colors.primary.blueD1 }}>
                        {' '}
                        (인증 가능)
                      </Body>
                    )}
                  </RadioButton>
                </View>
              )
            })}
          </RadioForm>
        </Container>
      </FlexScrollView>
      {data?.status !== 'onboarding_completed' && (
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
                userProfileStore.setJobTitle('etc')
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
                  await completeInputExtraInfo()
                  await mutate('/users/my/onboarding/')
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
        text='다음으로'
        disabled={!userProfileStore.jobTitle}
        onPress={async () => {
          if (
            userProfileStore.jobTitle === 'college_student' ||
            userProfileStore.jobTitle === 'employee'
          ) {
            navigation.navigate('EmailInputScreen')
          } else if (userProfileStore.jobTitle === 'practitioner') {
            navigation.navigate('AuthPractitionerScreen')
          } else {
            setLoading(true)
            try {
              await editUserInfo({
                jobTitle: userProfileStore.jobTitle,
              })
              await mutate('/users/my/')
              if (data?.status === 'onboarding_completed') {
                navigation.goBack()
              } else {
                await completeInputExtraInfo()
                await mutate('/users/my/onboarding/')
              }
            } catch (e) {
              alertStore.error(e, '회원정보 등록에 실패했어요!')
            } finally {
              setLoading(false)
            }
          }
        }}
      />
      {loading && <LoadingOverlay />}
    </>
  )
})

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
