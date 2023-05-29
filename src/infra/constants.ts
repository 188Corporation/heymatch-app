import { GpsLocation } from 'infra/types'
import { Dimensions, Platform } from 'react-native'

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
export const PUSH_PROVIDER = 'firebase'
export const PUSH_PROVIDER_NAME = !IS_DEV
  ? 'heymatch-firebase-prod'
  : 'heymatch-firebase-dev'
export const ONESIGNAL_APP_ID = '0361ed79-72c2-439e-9ed6-d38d7af5d587'
// https://developers.naver.com/docs/serviceapi/search/local/local.md#%EC%A7%80%EC%97%AD
export const NAVER_OPEN_API_CLIENT_ID = 'yTGgiqz_swvAiOWZN74G'
export const NAVER_OPEN_API_CLIENT_SECRET = 'eldIpeJeBI'
// https://www.ncloud.com/product/applicationService/maps
export const GEOCODING_CLIENT_ID = 'i49dk0ywd7'
export const GEOCODING_CLIENT_SECRET =
  '2UOPsjVL7TtVpNYyQrmKCfI6NJwRIrRjEE0Jssr7'

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

export const maleBodyForm = [
  {
    label: '마른',
    value: 'thin',
  },
  {
    label: '날씬한',
    value: 'slender',
  },
  {
    label: '보통',
    value: 'normal',
  },
  {
    label: '통통한',
    value: 'chubby',
  },
  {
    label: '탄탄한',
    value: 'muscular',
  },
  {
    label: '근육질',
    value: 'bulky',
  },
]

export const femaleBodyForm = [
  {
    label: '마른',
    value: 'thin',
  },
  {
    label: '날씬한',
    value: 'slender',
  },
  {
    label: '보통',
    value: 'normal',
  },
  {
    label: '통통한',
    value: 'chubby',
  },
  {
    label: '글래머러스한',
    value: 'glamourous',
  },
  {
    label: '근육질',
    value: 'bulky',
  },
]
