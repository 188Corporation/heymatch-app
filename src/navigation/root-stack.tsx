import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthScreen } from 'ui/auth/auth-screen'

const Stack = createStackNavigator()

export const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AuthScreen' component={AuthScreen} />
    </Stack.Navigator>
  )
}
