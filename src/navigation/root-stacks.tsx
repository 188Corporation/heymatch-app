import { createStackNavigator } from '@react-navigation/stack'
import { oneSignal } from 'infra/one-signal'
import { paymentManager } from 'infra/payments'
import { observer } from 'mobx-react'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import { GroupCreateStacks } from 'navigation/group-create-stacks'
import { MainTabs } from 'navigation/main-tabs'
import { RootStackParamList } from 'navigation/types'
import React, { useEffect } from 'react'
import { useStores } from 'store/globals'
import { AgreementScreen } from 'ui/auth/agreement-screen'
import { AuthScreen } from 'ui/auth/auth-screen'
import { BirthdayScreen } from 'ui/auth/birthday-screen'
import { BodyInfoScreen } from 'ui/auth/body-info-screen'
import { EmailInputScreen } from 'ui/auth/email-input-screen'
import { EmailVerificationCodeInputScreen } from 'ui/auth/email-verification-code-input'
import { GenderScreen } from 'ui/auth/gender-screen'
import { JobInfoScreen } from 'ui/auth/job-info-screen'
import { ProfilePhotoExaminationAfterScreen } from 'ui/auth/profile-photo-examination-after-screen'
import { ProfilePhotoExaminationScreen } from 'ui/auth/profile-photo-examination-screen'
import { ProfilePhotoRegisterScreen } from 'ui/auth/profile-photo-register-screen'
import { ChatDetailScreen } from 'ui/chat/chat-detail-screen'
import { GroupEditScreen } from 'ui/group-create/group-edit-screen'
import { GroupDetailScreen } from 'ui/group/group-detail-screen'
import { LoadingScreen } from 'ui/loading/loading-screen'
import { PurchaseHistoryScreen } from 'ui/my/purchase-history-screen'
import { UserManagementScreen } from 'ui/my/user-management-screen'
import { UserWithdrawalScreen } from 'ui/my/user-withdrawal-screen'
import { PurchaseScreen } from 'ui/purchase/purchase-screen'
import { WebViewScreen } from 'ui/web-view/web-view-screen'

const Stack = createStackNavigator<RootStackParamList>()

export const RootStacks = observer(() => {
  const { keyboardStore, permissionStore, authStore } = useStores()
  useEffect(() => {
    keyboardStore.sub()
    permissionStore.checkAll()
    paymentManager.initialize()
    oneSignal.init()
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
      ) : !authStore.isAgreementChecked ? (
        <>
          <Stack.Screen name='AgreementScreen' component={AgreementScreen} />
          <Stack.Screen name='GenderScreen' component={GenderScreen} />
          <Stack.Screen name='BirthdayScreen' component={BirthdayScreen} />
          <Stack.Screen
            name='ProfilePhotoRegisterScreen'
            component={ProfilePhotoRegisterScreen}
          />
          <Stack.Screen
            name='ProfilePhotoExaminationScreen'
            component={ProfilePhotoExaminationScreen}
          />
          <Stack.Screen name='BodyInfoScreen' component={BodyInfoScreen} />
          <Stack.Screen name='JobInfoScreen' component={JobInfoScreen} />
          <Stack.Screen name='EmailInputScreen' component={EmailInputScreen} />
          <Stack.Screen
            name='EmailVerificationCodeInputScreen'
            component={EmailVerificationCodeInputScreen}
          />
          <Stack.Screen
            name='ProfilePhotoExaminationAfterScreen'
            component={ProfilePhotoExaminationAfterScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name='MainTabs' component={MainTabs} />
          <Stack.Screen name='GroupCreateStack' component={GroupCreateStacks} />
          <Stack.Screen name='GroupEditScreen' component={GroupEditScreen} />
          <Stack.Screen
            name='GroupDetailScreen'
            component={GroupDetailScreen}
          />
          <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
          <Stack.Screen name='ChatDetailScreen' component={ChatDetailScreen} />
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
        </>
      )}
      <Stack.Screen name='WebViewScreen' component={WebViewScreen} />
    </Stack.Navigator>
  )
})
