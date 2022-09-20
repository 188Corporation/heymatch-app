import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthScreen } from 'ui/auth/auth-screen'
import { useStores } from 'store/globals'

const Stack = createStackNavigator()

export const RootStack = () => {
  const { keyboardStore } = useStores()
  useEffect(() => {
    keyboardStore.sub()
    return () => {
      keyboardStore.unsub()
    }
  }, [keyboardStore])
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
    </Stack.Navigator>
  )
}
