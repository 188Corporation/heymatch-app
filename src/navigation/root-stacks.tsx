import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useStores } from 'store/globals'
// import * as amplitude from '@amplitude/analytics-react-native'
import { observer } from 'mobx-react'
import { LoadingScreen } from 'ui/loading/loading-screen'
import { MainTabs } from 'navigation/main-tabs'
import { AuthScreen } from 'ui/auth/auth-screen'
import { GroupCreateStacks } from 'navigation/group-create-stacks'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import { GroupDetailScreen } from 'ui/group/group-detail-screen'
import { RootStackParamList } from 'navigation/types'
import { PurchaseScreen } from 'ui/purchase/purchase-screen'
import { paymentManager } from 'infra/payments'
import { ChatDetailScreen } from 'ui/chat/chat-detail-screen'

const Stack = createStackNavigator<RootStackParamList>()

export const RootStacks = observer(() => {
  const { keyboardStore, permissionStore, authStore } = useStores()
  useEffect(() => {
    keyboardStore.sub()
    permissionStore.checkAll()
    paymentManager.initialize()
    // amplitude.init()
    return () => {
      paymentManager.terminate()
      keyboardStore.unsub()
    }
  }, [keyboardStore, permissionStore])
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      {authStore.isInitializing ? (
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      ) : !authStore.isLoggedIn ? (
        <Stack.Screen name='AuthScreen' component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name='MainTabs' component={MainTabs} />
          <Stack.Screen name='GroupCreateStack' component={GroupCreateStacks} />
          <Stack.Screen
            name='GroupDetailScreen'
            component={GroupDetailScreen}
          />
          <Stack.Screen name='PurchaseScreen' component={PurchaseScreen} />
          <Stack.Screen name='ChatDetailScreen' component={ChatDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})
