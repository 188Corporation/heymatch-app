import { createStackNavigator } from '@react-navigation/stack'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'
import React from 'react'
import { GroupCreateDoneScreen } from 'ui/group-create/group-create-done-screen'
import { GroupCreateInfoScreen } from 'ui/group-create/group-create-info-screen'
import { GroupCreateNameScreen } from 'ui/group-create/group-create-name-screen'

const Stack = createStackNavigator<GroupStackParamList>()

export const GroupCreateStacks = () => {
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      <Stack.Screen
        name='GroupCreateNameScreen'
        component={GroupCreateNameScreen}
      />
      <Stack.Screen
        name='GroupCreateInfoScreen'
        component={GroupCreateInfoScreen}
      />
      <Stack.Screen
        name='GroupCreateDoneScreen'
        component={GroupCreateDoneScreen}
      />
    </Stack.Navigator>
  )
}

export type GroupStackParamList = {
  GroupCreateNameScreen: {}
  GroupCreateInfoScreen: {}
  GroupCreateDoneScreen: {}
}
