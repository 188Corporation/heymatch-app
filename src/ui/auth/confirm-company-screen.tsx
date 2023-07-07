import { useOnboardingStatus } from 'api/reads'
import { navigation } from 'navigation/global'
import React from 'react'
import { View } from 'react-native'
import { useStores } from 'store/globals'
import styled from 'styled-components'
import { BottomButton } from 'ui/common/bottom-button'
import { FlexScrollView } from 'ui/common/flex-scroll-view'
import { TopInsetSpace } from 'ui/common/inset-space'
import { Body, DescBody2, H1 } from 'ui/common/text'

export const ConfirmCompanyScreen = () => {
  const { data } = useOnboardingStatus()

  const { userProfileStore } = useStores()
  return (
    <>
      <View style={{ flexGrow: 1 }}>
        <FlexScrollView>
          <TopInsetSpace />
          <Container>
            <View style={{ marginBottom: 40 }}>
              {userProfileStore.jobTitle === 'employee' && (
                <H1 style={{ marginBottom: 12 }}>회사를 확인해주세요!</H1>
              )}
              {userProfileStore.jobTitle === 'college_student' && (
                <H1 style={{ marginBottom: 12 }}>학교를 확인해주세요!</H1>
              )}
              <DescBody2>
                아래 정보가 맞으면 다음 단계로 넘어가주세요 :)
              </DescBody2>
            </View>
            <Body>{userProfileStore.verifiedOrganizationNames![0]}</Body>
          </Container>
        </FlexScrollView>
      </View>
      <BottomButton
        text='다음으로'
        onPress={async () => {
          if (data?.status === 'onboarding_completed') {
            navigation.setRootWithStack('MainTabs', 'GroupScreen')
          } else {
            navigation.navigate('ProfilePhotoRegisterScreen')
          }
        }}
      />
    </>
  )
}

const Container = styled(View)`
  padding: 72px 28px 0px 28px;
`
