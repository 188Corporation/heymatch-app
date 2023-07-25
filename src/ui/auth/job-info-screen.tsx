import { useOnboardingStatus } from 'api/reads'
import { editUserInfo } from 'api/writes'
import { Colors } from 'infra/colors'
import { jobTitleForm } from 'infra/constants'
import { JobTitle } from 'infra/types'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { NavigationHeader } from 'ui/common/navigation-header'
import { RadioButton } from 'ui/common/RadioButton'
import { Body, DescBody2, H1 } from 'ui/common/text'

export const JobInfoScreen = observer(() => {
  const { userProfileStore } = useStores()
  const { data } = useOnboardingStatus()
  const isEditing = data?.status === 'onboarding_completed'

  const handleOnPress = (v: string) => {
    userProfileStore.setJobTitle(v as JobTitle)
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
          {jobTitleForm.map((x) => {
            return (
              <View
                key={x.value}
                style={{
                  marginBottom: 15,
                  flexDirection: 'row',
                }}
              >
                <RadioButton
                  obj={x}
                  isSelected={userProfileStore.jobTitle === x.value}
                  onPress={handleOnPress}
                />
                {x.verify && (
                  <Body style={{ color: Colors.primary.blueD1 }}>
                    {' '}
                    (인증 가능)
                  </Body>
                )}
              </View>
            )
          })}
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
