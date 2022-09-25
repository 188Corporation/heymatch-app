import { Coord } from 'react-native-nmap'

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

export interface JoinedGroup {
  id: number
  // "37.498166,127.036235"
  gps_geoinfo: string
  gps_checked: boolean
  gps_last_check_time: string
  title: string
  introduction: string
  is_active: true
  active_until: string
  hotplace: number
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
