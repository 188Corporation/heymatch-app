import { GroupDetail } from 'infra/types'
import { StackScreenProps } from '@react-navigation/stack'

// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  MainScreen: {}
  AuthScreen: {}
  GroupCreateStack: {}
  GroupDetailScreen: { data: GroupDetail }
}

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>
