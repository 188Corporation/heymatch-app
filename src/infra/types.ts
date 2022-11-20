import { Coord } from 'react-native-nmap'
import { ColorValue } from 'react-native'
import { ReactNode } from 'react'

export interface ResponseEnvelope<T = unknown> {
  status: 'success' | 'error'
  code: number
  data?: T
  message?: string
}

export interface User {
  id: string
  username: string
  phone_number: string
  age: number | null
  birthdate: string | null
  gender: number | null
  height_cm: number | null
  workplace: string | null
  school: string | null
  point_balance: number
  free_pass: boolean
  free_pass_active_until: string | null
  stream_token: string
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

export interface AlertContent {
  title?: string
  body?: string
  buttonText?: string
  cancelText?: string
  onPress?: () => void
  onPressCancel?: () => void
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

export interface HotPlaceWithGroups {
  id: number
  name: string
  groups: Group[]
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
