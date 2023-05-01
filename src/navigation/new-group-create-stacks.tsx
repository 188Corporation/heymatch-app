import { createStackNavigator } from '@react-navigation/stack'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import React from 'react'
import { GroupCreateNameScreen } from 'ui/group-create/group-create-name-screen'

const Stack = createStackNavigator()

export const NewGroupCreateStacks = () => {
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      <Stack.Screen
        name='GroupCreateNameScreen'
        component={GroupCreateNameScreen}
      />
    </Stack.Navigator>
  )
}
