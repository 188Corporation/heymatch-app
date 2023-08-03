import { StackScreenProps } from '@react-navigation/stack'
import { MyInfo } from 'infra/types'
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
    hideButton?: boolean
  }
  SearchPlaceResultsScreen: {}
  StacksAfterLogin: {}
  RecommandationCodeScreen: {}
  UnregisteredDomainScreen: {}
  AuthPractitionerScreen: {}
  ChatReadyDetailScreen: {
    cid?: string
  }
}

export type WebViewScreenProps = StackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>

export type ChatReadyDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'ChatReadyDetailScreen'
>

export type GroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetailScreen'
>

export type EditUserProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'EditUserProfileScreen'
>
