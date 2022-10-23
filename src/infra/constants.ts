import { Dimensions, Platform } from 'react-native'
import { GpsLocation } from 'infra/types'

export const IS_DEV = __DEV__
export const SERVER_BASE_URL = !IS_DEV
  ? 'https://dev.hey-match.com/api'
  : 'https://dev.hey-match.com/api'
export enum OS {
  ANDROID = 'android',
  IOS = 'ios',
}
export const CURRENT_OS: OS = Platform.OS as OS
export const WINDOW_DIMENSIONS = Dimensions.get('window')
export const KOREA_CENTER = {
  latitude: 36.4,
  longitude: 127.8,
  zoom: 5.5,
  tilt: 0,
  bearing: 0,
}
export const DEFAULT_ZOOM = {
  latitudeDelta: 0.0037,
  longitudeDelta: 0.0019,
}

// 압구정 핫플 내 위치
export const LOCATION_FOR_TEST: GpsLocation = {
  lat: 37.5262894,
  lng: 127.0395281,
}
