import { Coord } from 'react-native-nmap'
import { ColorValue } from 'react-native'

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
  birthdate: string
  gender: number
  height_cm: number
  workplace: string
  school: string
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
  onPress?: () => void
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

export type MatchRequestStatus =
  | 'WAITING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELED'

export interface MatchRequest {
  id: number
  status: MatchRequestStatus
  created_at: string
  sender_group: number | GroupDetail
  receiver_group: number | GroupDetail
}
