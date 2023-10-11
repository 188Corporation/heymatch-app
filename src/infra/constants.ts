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
export const ONESIGNAL_APP_ID = !IS_DEV
  ? '6f8492e5-e047-4a59-87a9-d91e1564487f'
  : '0361ed79-72c2-439e-9ed6-d38d7af5d587'
// https://developers.naver.com/docs/serviceapi/search/local/local.md#%EC%A7%80%EC%97%AD
export const NAVER_OPEN_API_CLIENT_ID = 'yTGgiqz_swvAiOWZN74G'
export const NAVER_OPEN_API_CLIENT_SECRET = 'eldIpeJeBI'
// https://www.ncloud.com/product/applicationService/maps
export const GEOCODING_CLIENT_ID = 'i49dk0ywd7'
export const GEOCODING_CLIENT_SECRET =
  '2UOPsjVL7TtVpNYyQrmKCfI6NJwRIrRjEE0Jssr7'

export const SENTRY_DSN_KEY =
  'https://1dd3bf717f76e0bf57e15add2f8cfb5e@o4506025155362816.ingest.sentry.io/4506025170370560'

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

export const jobTitleForm = [
  {
    id: 'college_student',
    label: '대학(원)생',
    value: 'college_student',
    verify: true,
  },
  {
    id: 'employee',
    label: '직장인',
    value: 'employee',
    verify: true,
  },
  {
    id: 'practitioner',
    label: '특수직/전문직',
    value: 'practitioner',
    verify: true,
  },
  {
    id: 'self_employed',
    label: '자영업',
    value: 'self_employed',
    verify: false,
  },
  {
    id: 'part_time',
    label: '아르바이트',
    value: 'part_time',
    verify: false,
  },
  {
    id: 'businessman',
    label: '사업가',
    value: 'businessman',
    verify: false,
  },
  {
    id: 'etc',
    label: '기타',
    value: 'etc',
    verify: false,
  },
]

export const BOTTOM_BUTTON_HEIGTH = 78
export const NAVIGATION_HEADER_HEIGHT = 60

export const POINT_NEEDED_FOR_PHOTO = 2
export const POINT_NEEDED_FOR_MATCH = 4
