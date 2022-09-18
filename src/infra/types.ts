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
