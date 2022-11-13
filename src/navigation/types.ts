import { GroupDetail } from 'infra/types'
import { StackScreenProps } from '@react-navigation/stack'

// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  MainTabs: {}
  AuthScreen: {}
  GroupCreateStack: {}
  GroupDetailScreen: { data: GroupDetail }
  PurchaseScreen: {}
  ChatDetailScreen: {}
}

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>
