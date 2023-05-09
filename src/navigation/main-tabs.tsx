import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useMy } from 'api/reads'
import { MainBottomTabBar } from 'navigation/main-bottom-tab-bar'
import React from 'react'
import { useStores } from 'store/globals'
import { ChatScreen } from 'ui/chat/chat-screen'
import { GroupListScreen } from 'ui/group/group-list-screen'
import { NewGroupDetailScreen } from 'ui/group/new-group-detail-screen'
import { MyScreen } from 'ui/my/my-screen'
import { navigation } from './global'

const Tab = createBottomTabNavigator()

export const MainTabs = () => {
  const { alertStore } = useStores()
  const { data } = useMy()

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MainBottomTabBar {...props} />}
    >
      <Tab.Screen name='GroupList' component={GroupListScreen} />
      <Tab.Screen
        name='NewGroupDetailScreen'
        component={NewGroupDetailScreen}
        listeners={{
          tabPress: (e) => {
            if (data?.joined_groups) return
            e.preventDefault()
            alertStore.open({
              title: '아직 속한 그룹이 없어요!',
              body: '먼저 그룹을 생성해주세요!',
              mainButton: '그룹 생성하기',
              subButton: '나중에 하기',
              onMainPress: () => {
                navigation.navigate('NewGroupCreateStacks')
              },
            })
          },
        }}
      />
      <Tab.Screen name='ChatScreen' component={ChatScreen} />
      <Tab.Screen name='MyScreen' component={MyScreen} />
    </Tab.Navigator>
  )
}
