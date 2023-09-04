import { createStackNavigator } from '@react-navigation/stack'
import { useOnboardingStatus } from 'api/reads'
import { oneSignal } from 'infra/one-signal'
import { paymentManager } from 'infra/payments'
import { observer } from 'mobx-react'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import { MainTabs } from 'navigation/main-tabs'
import { RootStackParamList } from 'navigation/types'
import React, { useEffect } from 'react'
import { useStores } from 'store/globals'
import { AgreementScreen } from 'ui/auth/agreement-screen'
import { AuthPractitionerScreen } from 'ui/auth/auth-practitioner-screen'
import { AuthScreen } from 'ui/auth/auth-screen'
import { BirthdayScreen } from 'ui/auth/birthday-screen'
import { ConfirmCompanyScreen } from 'ui/auth/confirm-company-screen'
import { EmailInputScreen } from 'ui/auth/email-input-screen'
import { EmailVerificationCodeInputScreen } from 'ui/auth/email-verification-code-input'
import { GenderScreen } from 'ui/auth/gender-screen'
import { JobInfoScreen } from 'ui/auth/job-info-screen'
import { ProfilePhotoRegisterGuideScreen } from 'ui/auth/profile-photo-register-guide-screen'
import { ProfilePhotoRegisterScreen } from 'ui/auth/profile-photo-register-screen'
import { ProfilePhotoRejectedScreen } from 'ui/auth/profile-photo-rejected-screen'
import { ProfilePhotoVerificationScreen } from 'ui/auth/profile-photo-verification-screen'
import { SelectSubsidiaryScreen } from 'ui/auth/select-subsidiary-screen'
import { UnregisteredDomainScreen } from 'ui/auth/unregistered-domain-screen'
import { UsernameScreen } from 'ui/auth/username-screen'
import { ChatDetailScreen } from 'ui/chat/chat-detail-screen'
import { ChatReadyDetailScreen } from 'ui/chat/chat-ready-detail-screen'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { GroupDetailScreen } from 'ui/group/group-detail-screen'
import { SearchPlaceResultsScreen } from 'ui/group/search-place-results-screen'
import { LoadingScreen } from 'ui/loading/loading-screen'
import { EditUserProfileScreen } from 'ui/my/edit-user-profile-screen'
import { PurchaseHistoryScreen } from 'ui/my/purchase-history-screen'
import { RecommandationCodeScreen } from 'ui/my/recommandation-code-screen'
import { UserManagementScreen } from 'ui/my/user-management-screen'
import { UserWithdrawalScreen } from 'ui/my/user-withdrawal-screen'
import { PurchaseScreen } from 'ui/purchase/purchase-screen'
import { WebViewScreen } from 'ui/web-view/web-view-screen'
import { EditUserInfoStacks } from './edit-user-info-stacks'
import { GroupCreateStacks } from './group-create-stacks'

const Stack = createStackNavigator<RootStackParamList>()

export const RootStacks = observer(() => {
  const { keyboardStore, permissionStore, authStore } = useStores()
  useEffect(() => {
    keyboardStore.sub()
    permissionStore.checkAll()
    paymentManager.initialize()
    return () => {
      paymentManager.terminate()
      keyboardStore.unsub()
    }
  }, [keyboardStore, permissionStore])
  // authStore.logout()

  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      {authStore.isInitializing ? (
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      ) : !authStore.isLoggedIn ? (
        <Stack.Screen name='AuthScreen' component={AuthScreen} />
      ) : (
        <Stack.Screen name='StacksAfterLogin' component={StacksAfterLogin} />
      )}
      <Stack.Screen name='WebViewScreen' component={WebViewScreen} />
    </Stack.Navigator>
  )
})

const StacksAfterLogin = () => {
  const { data } = useOnboardingStatus()
  useEffect(() => {
    oneSignal.init()
  }, [])

  if (!data) {
    return <LoadingOverlay />
  }
  const renderStack = () => {
    switch (data.status) {
      case 'onboarding_incomplete':
        return (
          <>
            <Stack.Screen name='AgreementScreen' component={AgreementScreen} />
            <Stack.Screen name='UsernameScreen' component={UsernameScreen} />
            <Stack.Screen name='GenderScreen' component={GenderScreen} />
            <Stack.Screen name='BirthdayScreen' component={BirthdayScreen} />
            <Stack.Screen name='JobInfoScreen' component={JobInfoScreen} />
            <Stack.Screen
              name='EmailInputScreen'
              component={EmailInputScreen}
            />
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
            <Stack.Screen
              name='UnregisteredDomainScreen'
              component={UnregisteredDomainScreen}
            />
            <Stack.Screen
              name='AuthPractitionerScreen'
              component={AuthPractitionerScreen}
            />
            <Stack.Screen
              name='ProfilePhotoRegisterScreen'
              component={ProfilePhotoRegisterScreen}
            />
            <Stack.Screen
              name='ProfilePhotoRegisterGuideScreen'
              component={ProfilePhotoRegisterGuideScreen}
            />
          </>
        )
      case 'onboarding_profile_under_verification':
        return (
          <Stack.Screen
            name='ProfilePhotoVerificationScreen'
            component={ProfilePhotoVerificationScreen}
          />
        )
      case 'onboarding_profile_rejected':
        return (
          <>
            <Stack.Screen
              name='ProfilePhotoRejectedScreen'
              component={ProfilePhotoRejectedScreen}
            />
            <Stack.Screen
              name='ProfilePhotoRegisterScreen'
              component={ProfilePhotoRegisterScreen}
            />
            <Stack.Screen
              name='ProfilePhotoRegisterGuideScreen'
              component={ProfilePhotoRegisterGuideScreen}
            />
          </>
        )
      case 'onboarding_completed':
        return (
          <>
            <Stack.Screen name='MainTabs' component={MainTabs} />
            <Stack.Screen
              name='GroupCreateStacks'
              component={GroupCreateStacks}
            />
            <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
            <Stack.Screen
              name='ChatDetailScreen'
              component={ChatDetailScreen}
            />
            <Stack.Screen
              name='ChatReadyDetailScreen'
              component={ChatReadyDetailScreen}
            />
            <Stack.Screen
              name='PurchaseHistoryScreen'
              component={PurchaseHistoryScreen}
            />
            <Stack.Screen
              name='UserManagementScreen'
              component={UserManagementScreen}
            />
            <Stack.Screen
              name='UserWithdrawalScreen'
              component={UserWithdrawalScreen}
            />
            <Stack.Screen
              name='SearchPlaceResultsScreen'
              component={SearchPlaceResultsScreen}
            />
            <Stack.Screen
              name='EditUserProfileScreen'
              component={EditUserProfileScreen}
            />
            <Stack.Screen
              name='EditUserInfoStacks'
              component={EditUserInfoStacks}
            />
            <Stack.Screen
              name='GroupDetailScreen'
              component={GroupDetailScreen}
            />
            <Stack.Screen
              name='RecommandationCodeScreen'
              component={RecommandationCodeScreen}
            />
            <Stack.Screen
              name='UnregisteredDomainScreen'
              component={UnregisteredDomainScreen}
            />
            <Stack.Screen
              name='AuthPractitionerScreen'
              component={AuthPractitionerScreen}
            />
          </>
        )
      default:
        throw new Error('Invalid onboarding status')
    }
  }
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      {renderStack()}
    </Stack.Navigator>
  )
}
