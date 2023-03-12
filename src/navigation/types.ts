import { StackScreenProps } from '@react-navigation/stack'
import { GroupDetail, MatchRequestStatus, MatchRequestType } from 'infra/types'

// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  AuthScreen: {}
  MainTabs: {}
  GroupCreateStack: {}
  GroupEditScreen: {}
  GroupDetailScreen: {
    data: GroupDetail
    matchRequest?: MatchRequestTarget
    hideButton?: boolean
  }
  PurchaseScreen: {}
  ChatDetailScreen: {}
  WebViewScreen: { title: string; uri: string }
  PurchaseHistoryScreen: {}
  UserManagementScreen: {}
  UserWithdrawalScreen: {}
  AgreementScreen: {}
  GenderScreen: {}
  BirthdayScreen: {}
  ProfilePhotoRegisterScreen: {}
  ProfilePhotoExaminationScreen: {}
  BodyInfoScreen: {}
  JobInfoScreen: {}
  EmailInputScreen: {}
  EmailVerificationCodeInputScreen: {}
}

export interface MatchRequestTarget {
  id: number
  status: MatchRequestStatus
  type: MatchRequestType
}

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>

export type WebViewScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>
