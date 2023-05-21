import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { useMy } from 'api/reads'
import { JoinedGroups } from 'infra/types'
import React from 'react'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { NewGroupDetailScreen } from 'ui/group/new-group-detail-screen'
import { COMMON_STACK_SCREEN_OPTIONS } from './common'

type GroupDetailStacksParamList = {
  NewGroupDetailScreen: Partial<JoinedGroups['group']> & {
    job: string
    isJobVerified: boolean
    profileImage: string
  }
}

export type NewGroupDetailScreenProps = StackScreenProps<
  GroupDetailStacksParamList,
  'NewGroupDetailScreen'
>

const Stack = createStackNavigator<GroupDetailStacksParamList>()

export const GroupDetailStacks = () => {
  const { data } = useMy()

  if (!data) return <LoadingOverlay />

  return (
    <Stack.Navigator screenOptions={COMMON_STACK_SCREEN_OPTIONS}>
      <Stack.Screen
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
          profileImage: data.user_profile_images[0].image,
        }}
      />
    </Stack.Navigator>
  )
}
