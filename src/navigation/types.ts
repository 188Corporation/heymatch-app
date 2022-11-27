import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'
import { StackScreenProps } from '@react-navigation/stack'

// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  AuthScreen: {}
  MainTabs: {}
  GroupCreateStack: {}
  GroupEditScreen: {}
  GroupDetailScreen: {
    data: GroupDetail
    matchRequest?: {
      id: number
      status: MatchRequestStatus
      type: MatchRequestType
    }
  }
  PurchaseScreen: {}
  ChatDetailScreen: {}
  WebViewScreen: { title: string; uri: string }
  PurchaseHistoryScreen: {}
  UserManagementScreen: {}
  UserWithdrawalScreen: {}
}

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>

export type WebViewScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>
