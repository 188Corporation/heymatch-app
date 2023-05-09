import { ReactNode } from 'react'
import { ColorValue } from 'react-native'
import { Coord } from 'react-native-nmap'

export interface ResponseEnvelope<T = unknown> {
  status: 'success' | 'error'
  code: number
  data?: T
  message?: string
}

export type Gender = 'm' | 'f'
export type MaleBodyForm =
  | 'thin'
  | 'slender'
  | 'normal'
  | 'chubby'
  | 'muscular'
  | 'bulky'
export type FemaleBodyForm =
  | 'thin'
  | 'slender'
  | 'normal'
  | 'chubby'
  | 'glamourous'
  | 'bulky'
export type JobTitle =
  | 'college_student'
  | 'employee'
  | 'self_employed'
  | 'part_time'
  | 'businessman'
  | 'etc'

export type OrganizationType = 'school' | 'company'
// n: not verified | u: under verification | a: accepted | r: rejected
type UserProfileImageStatus = 'n' | 'u' | 'a' | 'r'
type UserProfileImages = {
  is_main: boolean
  status: UserProfileImageStatus
  image: string
  image_blurred: string
  thumbnail: string
  thumbnail_blurred: string
  order: number
  is_active: boolean
}
export interface User {
  id: string
  stream_token: string
  is_first_signup: boolean
  username: string
  phone_number: string
  gender: Gender | null
  birthdate: string | null
  height_cm: number | null
  male_body_form?: MaleBodyForm
  female_body_form?: FemaleBodyForm
  job_title?: JobTitle
  verified_school_name?: string
  verified_company_name?: string
  point_balance: number
  free_pass: boolean
  free_pass_active_until: string | null
  user_profile_images: UserProfileImages[]
  // TODO: remove
  schedule_delete_canceled: boolean
  agreed_to_terms: boolean
}

export interface MyInfo {
  user: User
  joined_groups: GroupDetail[] | null
  user_purchases: UserPurchase[]
  app_info: AppInfo
}

export interface GpsLocation {
  lat: number
  lng: number
}

export interface GpsBounds {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export interface NaverMapCamera {
  latitude: number
  longitude: number
  zoom: number
  contentsRegion: [Coord, Coord, Coord, Coord, Coord]
  coveringRegion: [Coord, Coord, Coord, Coord, Coord]
  bound: {
    north: number
    east: number
    west: number
    south: number
  }
}

// https://navermaps.github.io/ios-map-sdk/reference/Enums/NMFMyPositionMode.html
export enum LocationTrackingMode {
  NONE = 0,
  NO_FOLLOW = 1,
  FOLLOW = 2,
  FACE = 3,
}

export interface LatLngDelta {
  // max lat - min lat
  latitudeDelta: number
  // max lng - min lng
  longitudeDelta: number
}

export interface AlertContent {
  title: string
  body?: string
  bodyChildren?: () => ReactNode
  mainButton?: string
  subButton?: string
  onMainPress?: () => void
  onSubPress?: () => void
  onClose?: () => void
  preventBackdropClose?: boolean
  children?: () => ReactNode
}

export interface HotPlace {
  id: number
  name: string
  zone_color: ColorValue
  zone_center_geoinfo: string
  zone_boundary_geoinfos: string[]
}

export interface Group {
  id: number
  hotplace: number
  title: string
  gps_geoinfo: string
  group_profile_images: { image: string; thumbnail: string }[]
  male_member_number: number
  female_member_number: number
  member_average_age: number
  is_active: boolean
  active_until: string
}

export interface GroupDetail extends Group {
  introduction: string
}

export interface GroupDetail_v2 {
  id: number
  mode: string
  title: string
  introduction: string
  meetup_date: string
  meetup_address: string
  member_number: number
  member_avg_age: number
  created_at: string
}

export interface HotPlaceWithGroups {
  id: number
  name: string
  groups: Group[]
}

export interface GroupMember {
  is_user_leader: boolean
  user: User
}

export interface Group_v2 {
  title: string
  meetup_date: string
  group_members: GroupMember[]
  member_number: number
  member_avg_age: number
  created_at: Date
}

// TODO: HotPlaceWithGroups 대체 타입. 이름 바꿔야함
export interface Groups_v2 {
  status: string
  code: number
  data: {
    count: number
    next: string
    previous: string
    results: Group_v2[]
  }
  message: string | null
}

export interface PurchaseItem {
  id: number
  name: string
  price_in_krw: number
  best_deal_check: false
  product_id: string // for store purchase
}

export enum MatchRequestStatus {
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED', // 얘는 안 내려줌
}

export enum MatchRequestType {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
}

export interface MatchRequest {
  id: number
  status: MatchRequestStatus
  created_at: string
  sender_group: number | GroupDetail
  receiver_group: number | GroupDetail
}

// https://getstream.io/chat/docs/javascript/query_channels/?language=javascript#query-parameters
export interface Channel {
  cid: string
  last_message?: {
    content: string
    sent_at: string
    is_read: boolean
  }
}

export interface Chat {
  channel: Channel
  group: GroupDetail
}

export interface TabBarLabel {
  text: string
  number: number
}

export interface AppInfo {
  faq_url: string
  terms_of_service_url: string
  privacy_policy_url: string
  terms_of_location_service_url: string
  business_registration_url: string
}

export interface UserPurchase {
  id: string
  platform: string
  point_item: {
    id: number
    name: string
    product_id: string
    price_in_krw: number
    default_point: number
    bonus_point: number
    best_deal_check: boolean
  }
  free_pass_item: null
  purchase_processed: boolean
  purchased_at: string
}

export interface SearchPlaceList {
  lastBuildDate: string
  total: number
  start: number
  display: number
  items: {
    title: string
    link: string
    category: string
    description: string
    telephone: string
    address: string
    roadAddress: string
    mapx: string
    mapy: string
  }[]
}

export interface Geocoding {
  addresses: {
    addressElements: {
      roadAddress: string
      jibunAddress: string
      englishAddress: string
      x: string
      y: string
      distance: number
      addressElements: {
        types: string[]
        longName: string
        shortName: string
        code: string
      }[]
    }[]
    distance: number
    englishAddress: string
    jibunAddress: string
    roadAddress: string
    x: string
    y: string
  }[]
  errorMessage: string
  meta: { count: number; page: number; totalCount: number }
  status: string
}
