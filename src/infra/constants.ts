import { Dimensions, Platform } from 'react-native'
import { GpsLocation } from 'infra/types'

export const IS_DEV = __DEV__
export const SERVER_BASE_URL = !IS_DEV
  ? 'https://prod.hey-match.com/api'
  : 'https://dev.hey-match.com/api'
export enum OS {
  ANDROID = 'android',
  IOS = 'ios',
}
export const CURRENT_OS: OS = Platform.OS as OS
export const WINDOW_DIMENSIONS = Dimensions.get('window')

export const STREAM_CHAT_API_KEY = !IS_DEV ? 'tp849dtwfytw' : 'dg4mc768s4tj'
export const ONESIGNAL_APP_ID = '83e737f6-2a8d-46df-87f0-61175df1e6b8'

export const KOREA_CENTER = {
  latitude: 36.4,
  longitude: 127.8,
  zoom: 5.5,
  tilt: 0,
  bearing: 0,
}
export const DONGSEONGRO_CENTER = {
  latitude: 35.8699661,
  longitude: 128.5957445,
  zoom: 13,
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
