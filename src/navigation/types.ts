import { StackScreenProps } from '@react-navigation/stack'
import { MatchRequestStatus, MatchRequestType, MyInfo } from 'infra/types'
// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  AuthScreen: {}
  MainTabs: {}
  GroupCreateStacks: {}
  GroupEditScreen: {}
  PurchaseScreen: {}
  ChatDetailScreen: {}
  WebViewScreen: { title: string; uri: string }
  PurchaseHistoryScreen: {}
  UserManagementScreen: {}
  UserWithdrawalScreen: {}
  AgreementScreen: {}
  UsernameScreen: {}
  GenderScreen: {}
  BirthdayScreen: {}
  ProfilePhotoRegisterScreen: {}
  ProfilePhotoVerificationScreen: {}
  ProfilePhotoRejectedScreen: {}
  BodyInfoScreen: {}
  JobInfoScreen: {}
  EmailInputScreen: {}
  EmailVerificationCodeInputScreen: {}
  SelectSubsidiaryScreen: {}
  ConfirmCompanyScreen: {}
  EditUserProfileScreen: { data: MyInfo }
  EditUserInfoStacks: {}
  GroupDetailScreen: {
    id: number
    matchRequest?: MatchRequestTarget
    hideButton?: boolean
  }
  UserProfileScreen: { groupId: number }
  SearchPlaceResultsScreen: {}
  StacksAfterLogin: {}
  RecommandationCodeScreen: {}
  UnregisteredDomainScreen: {}
}

export interface MatchRequestTarget {
  id: number
  status: MatchRequestStatus
  type: MatchRequestType
}

export type WebViewScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>

export type UserProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'UserProfileScreen'
>

export type EditUserProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'EditUserProfileScreen'
>
