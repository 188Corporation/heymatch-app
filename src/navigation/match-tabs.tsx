import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ReceivedMatchScreen } from 'ui/match/received-match-screen'
import { SentMatchesScreen } from 'ui/match/sent-match-screen'
import { Colors } from 'infra/colors'
import { MatchTopTabBar } from 'navigation/match-top-tab-bar'
import { TabBarLabel } from 'infra/types'
import { useMatchRequests } from 'api/reads'

const Tab = createMaterialTopTabNavigator()

export const MatchTabs = () => {
  const { data } = useMatchRequests()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.gray.v600,
        tabBarStyle: { backgroundColor: Colors.white },
      }}
      tabBar={(props) => <MatchTopTabBar {...props} />}
    >
      <Tab.Screen
        name='ReceivedMatchScreen'
        component={ReceivedMatchScreen}
        options={{
          tabBarLabel: JSON.stringify({
            text: '받은 매칭',
            number: data?.received?.length || 0,
          } as TabBarLabel),
        }}
      />
      <Tab.Screen
        name='SentMatchesScreen'
        component={SentMatchesScreen}
        options={{
          tabBarLabel: JSON.stringify({
            text: '보낸 매칭',
            number: data?.sent?.length || 0,
          } as TabBarLabel),
        }}
      />
    </Tab.Navigator>
  )
}
