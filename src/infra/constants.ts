import { Dimensions } from 'react-native'

export const IS_DEV = __DEV__
export const SERVER_BASE_URL = !IS_DEV
  ? 'http://3.35.49.61:8000/api'
  : 'http://3.35.49.61:8000/api'
export const WINDOW_DIMENSIONS = Dimensions.get('window')
