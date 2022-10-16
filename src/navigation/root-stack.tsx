import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useStores } from 'store/globals'
// import * as amplitude from '@amplitude/analytics-react-native'
import { observer } from 'mobx-react'
import { LoadingScreen } from 'ui/loading/loading-screen'
import { MainScreen } from 'navigation/main-screen'
import { AuthScreen } from 'ui/auth/auth-screen'
import { GroupCreateStack } from 'navigation/group-create-stack'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import { GroupDetailScreen } from 'ui/group/group-detail-screen'
import { RootStackParamList } from 'navigation/types'

const Stack = createStackNavigator<RootStackParamList>()

export const RootStack = observer(() => {
  const { keyboardStore, permissionStore, authStore } = useStores()
  useEffect(() => {
    keyboardStore.sub()
    permissionStore.checkAll()
    // amplitude.init()
    return () => {
      keyboardStore.unsub()
    }
  }, [keyboardStore, permissionStore])
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      {authStore.isInitializing ? (
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      ) : authStore.isLoggedIn ? (
        <Stack.Screen name='MainScreen' component={MainScreen} />
      ) : (
        <Stack.Screen name='AuthScreen' component={AuthScreen} />
      )}
      <Stack.Screen name='GroupCreateStack' component={GroupCreateStack} />
      <Stack.Screen name='GroupDetailScreen' component={GroupDetailScreen} />
    </Stack.Navigator>
  )
})
