import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { useMy } from 'api/reads'
import { JoinedGroups } from 'infra/types'
import { MainBottomTabBar } from 'navigation/main-bottom-tab-bar'
import React from 'react'
import { useStores } from 'store/globals'
import { ChatScreen } from 'ui/chat/chat-screen'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { GroupListScreen } from 'ui/group/group-list-screen'
import { NewGroupDetailScreen } from 'ui/group/new-group-detail-screen'
import { MyScreen } from 'ui/my/my-screen'
import { navigation } from './global'
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
  const { alertStore } = useStores()
  const { data } = useMy()

  if (!data) return <LoadingOverlay />

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MainBottomTabBar {...props} />}
    >
      <Tab.Screen name='GroupList' component={GroupListScreen} />
      <Tab.Screen
        name='NewGroupDetailScreen'
        component={NewGroupDetailScreen}
        initialParams={{
          title: data.joined_groups ? data.joined_groups[0].group.title : '-',
          meetup_date: data.joined_groups
            ? data.joined_groups[0].group.meetup_date
            : '-',
          member_avg_age: data.joined_groups
            ? data.joined_groups[0].group.member_avg_age
            : -1,
          member_number: data.joined_groups
            ? data.joined_groups[0].group.member_number
            : -1,

          meetup_address: data.joined_groups
            ? data.joined_groups[0].group.meetup_address
            : '-',
          introduction: data.joined_groups
            ? data.joined_groups[0].group.introduction
            : '-',
          job:
            data.user.verified_company_name ??
            data.user.verified_school_name ??
            data.user.job_title,
          isJobVerified:
            !!data.user.verified_company_name ||
            !!data.user.verified_school_name,
          profileImage: data.user.user_profile_images[0].image,
        }}
        listeners={{
          tabPress: (e) => {
            if (data.joined_groups && data.joined_groups.length > 0) return
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
      <Tab.Screen name='MatchTabs' component={MatchTabs} />
      <Tab.Screen name='ChatScreen' component={ChatScreen} />
      <Tab.Screen name='MyScreen' component={MyScreen} />
    </Tab.Navigator>
  )
}
