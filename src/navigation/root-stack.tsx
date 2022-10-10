import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useStores } from 'store/globals'
// import * as amplitude from '@amplitude/analytics-react-native'
import { observer } from 'mobx-react'
import { LoadingScreen } from 'ui/loading/loading-screen'
import { MainScreen } from 'navigation/main-screen'
import { AuthScreen } from 'ui/auth/auth-screen'
import { GroupCreateStack } from 'navigation/group-create-stack'

const Stack = createStackNavigator()

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authStore.isInitializing ? (
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
      ) : authStore.isLoggedIn ? (
        <Stack.Screen name='GroupCreateStack' component={GroupCreateStack} />
      ) : (
        <Stack.Screen name='AuthScreen' component={AuthScreen} />
      )}
      <Stack.Screen name='MainScreen' component={MainScreen} />
    </Stack.Navigator>
  )
})
