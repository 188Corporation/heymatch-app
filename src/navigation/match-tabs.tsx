import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ReceivedMatchScreen } from 'ui/match/received-match-screen'
import { SentMatchesScreen } from 'ui/match/sent-match-screen'
import { Colors } from 'infra/colors'

const Tab = createMaterialTopTabNavigator()

export const MatchTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.gray.v600,
        tabBarStyle: { backgroundColor: Colors.white },
      }}
    >
      <Tab.Screen
        name='ReceivedMatchScreen'
        component={ReceivedMatchScreen}
        options={{ tabBarLabel: '받은 매칭' }}
      />
      <Tab.Screen
        name='SentMatchesScreen'
        component={SentMatchesScreen}
        options={{ tabBarLabel: '보낸 매칭' }}
      />
    </Tab.Navigator>
  )
}
