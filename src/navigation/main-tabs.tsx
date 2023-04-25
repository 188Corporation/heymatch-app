import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainBottomTabBar } from 'navigation/main-bottom-tab-bar'
import { MatchTabs } from 'navigation/match-tabs'
import React from 'react'
import { ChatScreen } from 'ui/chat/chat-screen'
import { GroupListScreen } from 'ui/group/group-list-screen'
import { MyScreen } from 'ui/my/my-screen'

const Tab = createBottomTabNavigator()

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MainBottomTabBar {...props} />}
    >
      <Tab.Screen name='GroupList' component={GroupListScreen} />
      {/* <Tab.Screen name='GroupScreen' component={GroupScreen} /> */}
      <Tab.Screen name='MatchTabs' component={MatchTabs} />
      <Tab.Screen name='ChatScreen' component={ChatScreen} />
      <Tab.Screen name='MyScreen' component={MyScreen} />
    </Tab.Navigator>
  )
}
