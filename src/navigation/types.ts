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
  WebViewScreen: { title: string; uri: string }
}

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>

export type WebViewScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>
