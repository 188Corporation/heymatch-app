import { Dimensions, Platform } from 'react-native'

export const IS_DEV = __DEV__
export const SERVER_BASE_URL = !IS_DEV
  ? 'http://3.35.49.61:8000/api'
  : 'http://3.35.49.61:8000/api'
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
