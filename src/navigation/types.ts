import { StackScreenProps } from '@react-navigation/stack'
import {
  GroupDetail_regacy,
  JoinedGroups,
  MatchRequestStatus,
  MatchRequestType,
} from 'infra/types'

// https://reactnavigation.org/docs/typescript/#type-checking-screens
export type RootStackParamList = {
  LoadingScreen: {}
  AuthScreen: {}
  MainTabs: {}
  GroupCreateStack: {}
  NewGroupCreateStacks: {}
  GroupEditScreen: {}
  GroupDetailScreen: {
    data: GroupDetail_regacy
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
  UsernameScreen: {}
  GenderScreen: {}
  BirthdayScreen: {}
  ProfilePhotoRegisterScreen: {}
  ProfilePhotoVerificationScreen: { stage: 'BEFORE' | 'AFTER' }
  ProfilePhotoRejectedScreen: {}
  BodyInfoScreen: {}
  JobInfoScreen: {}
  EmailInputScreen: {}
  EmailVerificationCodeInputScreen: {}
  SelectSubsidiaryScreen: {}
  ConfirmCompanyScreen: {}
  PersonalProfileEditScreen: {}
  EditPersonalInfoStacks: {}
  NewGroupDetailScreen: Partial<JoinedGroups['group']> & {
    job: string
    isJobVerified: boolean
    profileImage: string
  }
  // TODO: 서버 작동하면 삭제하기
  GroupListScreen: {}
  SearchPlaceResultsScreen: {}
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

export type ProfilePhotoVerificationScreenProps = StackScreenProps<
  RootStackParamList,
  'ProfilePhotoVerificationScreen'
>

export type NewGroupDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'NewGroupDetailScreen'
>
