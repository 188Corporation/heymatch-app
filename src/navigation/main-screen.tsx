import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GroupScreen } from 'ui/group/group-screen'
import { ChatScreen } from 'ui/chat/chat-screen'
import { MyScreen } from 'ui/my/my-screen'
import { TabBar } from 'navigation/tab-bar'
import { MatchScreen } from 'ui/match/match-screen'

const Tab = createBottomTabNavigator()

export const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name='GroupScreen' component={GroupScreen} />
      <Tab.Screen name='MatchScreen' component={MatchScreen} />
      <Tab.Screen name='ChatScreen' component={ChatScreen} />
      <Tab.Screen name='MyScreen' component={MyScreen} />
    </Tab.Navigator>
  )
}
