import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'
import { BirthdayScreen } from 'ui/auth/birthday-screen'
import { BodyInfoScreen } from 'ui/auth/body-info-screen'
import { ConfirmCompanyScreen } from 'ui/auth/confirm-company-screen'
import { EmailInputScreen } from 'ui/auth/email-input-screen'
import { EmailVerificationCodeInputScreen } from 'ui/auth/email-verification-code-input'
import { JobInfoScreen } from 'ui/auth/job-info-screen'
import { SelectSubsidiaryScreen } from 'ui/auth/select-subsidiary-screen'
import { COMMON_STACK_SCREEN_OPTIONS } from './common'

const Stack = createStackNavigator()

export const EditPersonalInfoStacks = () => {
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      <Stack.Screen name='BirthdayScreen' component={BirthdayScreen} />
      <Stack.Screen name='BodyInfoScreen' component={BodyInfoScreen} />
      <Stack.Screen name='JobInfoScreen' component={JobInfoScreen} />
      <Stack.Screen name='EmailInputScreen' component={EmailInputScreen} />
      <Stack.Screen
        name='SelectSubsidiaryScreen'
        component={SelectSubsidiaryScreen}
      />
      <Stack.Screen
        name='EmailVerificationCodeInputScreen'
        component={EmailVerificationCodeInputScreen}
      />
      <Stack.Screen
        name='ConfirmCompanyScreen'
        component={ConfirmCompanyScreen}
      />
    </Stack.Navigator>
  )
}
