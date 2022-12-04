import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { GroupCreateIntroScreen } from 'ui/group-create/group-create-intro-screen'
import { GroupCreatePhotoGuideScreen } from 'ui/group-create/group-create-photo-guide-screen'
import { GroupCreatePhotoScreen } from 'ui/group-create/group-create-photo-screen'
import { GroupCreatePhotoCheckScreen } from 'ui/group-create/group-create-photo-check-screen'
import { GroupCreateGenderAgeScreen } from 'ui/group-create/group-create-gender-age-screen'
import { GroupCreateTitleDescScreen } from 'ui/group-create/group-create-title-desc-screen'
import { GroupCreateDoneScreen } from 'ui/group-create/group-create-done-screen'
import { COMMON_STACK_SCREEN_OPTIONS } from 'navigation/common'

const Stack = createStackNavigator()

export const GroupCreateStacks = () => {
  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      <Stack.Screen
        name='GroupCreateIntroScreen'
        component={GroupCreateIntroScreen}
      />
      <Stack.Screen
        name='GroupCreatePhotoGuideScreen'
        component={GroupCreatePhotoGuideScreen}
      />
      <Stack.Screen
        name='GroupCreatePhotoScreen'
        component={GroupCreatePhotoScreen}
      />
      <Stack.Screen
        name='GroupCreatePhotoCheckScreen'
        component={GroupCreatePhotoCheckScreen}
      />
      <Stack.Screen
        name='GroupCreateGenderAgeScreen'
        component={GroupCreateGenderAgeScreen}
      />
      <Stack.Screen
        name='GroupCreateTitleDescScreen'
        component={GroupCreateTitleDescScreen}
      />
      <Stack.Screen
        name='GroupCreateDoneScreen'
        component={GroupCreateDoneScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}
