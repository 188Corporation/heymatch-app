import { useOnboardingStatus } from 'api/reads'
import { editUserInfo } from 'api/writes'
import { Colors } from 'infra/colors'
import { jobTitleForm } from 'infra/constants'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { Body, DescBody2, H1 } from 'ui/common/text'

export const JobInfoScreen = observer(() => {
  const { userProfileStore } = useStores()
  const { data } = useOnboardingStatus()
  const isEditing = data?.status === 'onboarding_completed'

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
            if (isEditing) {
              await editUserInfo({ jobTitle: userProfileStore.jobTitle })
              navigation.setRootWithStack('MainTabs', 'GroupScreen')
            } else {
              navigation.navigate('ProfilePhotoRegisterScreen')
            }
          }
        }}
      />
    </>
  )
})

const Container = styled(View)`
  padding: 12px 28px 0px 28px;
`
