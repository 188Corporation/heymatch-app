import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthScreen } from 'ui/auth/auth-screen'
import { useStores } from 'store/globals'
// import * as amplitude from '@amplitude/analytics-react-native'
import { MainScreen } from 'navigation/main-screen'

const Stack = createStackNavigator()

export const RootStack = () => {
  const { keyboardStore, permissionStore } = useStores()
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
      <Stack.Screen name='MainScreen' component={MainScreen} />
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
    </Stack.Navigator>
  )
}
