import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { JoinedGroups } from 'infra/types'
import { MainBottomTabBar } from 'navigation/main-bottom-tab-bar'
import React from 'react'
import { ChatScreen } from 'ui/chat/chat-screen'
import { GroupListScreen } from 'ui/group/group-list-screen'
import { MyScreen } from 'ui/my/my-screen'
import { MatchTabs } from './match-tabs'

type MainTabsParamList = {
  GroupList: {}
  NewGroupDetailScreen: Partial<JoinedGroups['group']> & {
    job: string
    isJobVerified: boolean
    profileImage: string
  }
  MatchTabs: {}
  ChatScreen: {}
  MyScreen: {}
}

export type NewGroupDetailScreenProps = StackScreenProps<
  MainTabsParamList,
  'NewGroupDetailScreen'
>

const Tab = createBottomTabNavigator<MainTabsParamList>()

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MainBottomTabBar {...props} />}
    >
      <Tab.Screen name='GroupList' component={GroupListScreen} />
      <Tab.Screen name='MatchTabs' component={MatchTabs} />
      <Tab.Screen name='ChatScreen' component={ChatScreen} />
      <Tab.Screen name='MyScreen' component={MyScreen} />
    </Tab.Navigator>
  )
}
