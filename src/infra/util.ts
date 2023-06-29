import {
  FemaleBodyForm,
  Gender,
  GpsLocation,
  Group_regacy,
  JobTitle,
  LatLngDelta,
  MaleBodyForm,
} from 'infra/types'
import { Platform } from 'react-native'
import CodePush from 'react-native-code-push'
import { Coord } from 'react-native-nmap'
import { useSafeAreaInsets as _useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { femaleBodyForm, maleBodyForm } from './constants'

export const gpsLocationToNmapCoord = ({ lat, lng }: GpsLocation): Coord => ({
  latitude: lat,
  longitude: lng,
})

export const geoinfoToNmapCoord = (geoinfo: string): Coord => {
  const [latitude, longitude] = geoinfo.split(',').map(Number)
  return { latitude, longitude }
}

export const geoinfoToGpsLocation = (geoinfo: string): GpsLocation => {
  const [lat, lng] = geoinfo.split(',').map(Number)
  return { lat, lng }
}

export const gpsLocationToGeoinfo = ({ lat, lng }: GpsLocation): string => {
  return `${lat},${lng}`
}

export const formatMaleFemaleInfo = (data: Group_regacy) => {
  const final = []
  if (data.male_member_number > 0) {
    final.push(`남 ${data.male_member_number}명`)
  }
  if (data.female_member_number > 0) {
    final.push(`여 ${data.female_member_number}명`)
  }
  return final.join('/')
}

export const formatPrice = (price: number) => {
  return `${price.toLocaleString('ko-KR')}원`
}

// @ts-ignore
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const useSafeAreaInsets = () => {
  const insets = _useSafeAreaInsets()
  // bottom inset is too much
  return { ...insets, bottom: insets.bottom - (Platform.OS === 'ios' ? 12 : 0) }
}

export const syncCodePush = () => {
  CodePush.sync({
    installMode: CodePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  })
    .then((status) => {
      Toast.show({
        type: 'success',
        text1: [
          'UP_TO_DATE',
          'UPDATE_INSTALLED',
          'UPDATE_IGNORED',
          'UNKNOWN_ERROR',
          'SYNC_IN_PROGRESS',
          'CHECKING_FOR_UPDATE',
          'AWAITING_USER_ACTION',
          'DOWNLOADING_PACKAGE',
          'INSTALLING_UPDATE',
        ][status],
      })
    })
    .catch((e) => {
      Toast.show({ type: 'error', text1: String(e) })
    })
}

export const getLatLngDeltaFromBounds = (
  bounds: GpsLocation[],
): LatLngDelta => {
  const lats = bounds.map((bound) => bound.lat)
  const lngs = bounds.map((bound) => bound.lng)
  const latitudeDelta = Math.max(...lats) - Math.min(...lats)
  const longitudeDelta = Math.max(...lngs) - Math.min(...lngs)
  return { latitudeDelta, longitudeDelta }
}

export function getAge(birthDateString: string) {
  const birthDate = new Date(birthDateString)
  const now = new Date()
  const diffInMilliseconds = now.getTime() - birthDate.getTime()
  // 365.25: 윤년 고려
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  const age = Math.floor(diffInYears)
  return age
}

export const convertJobtitle = (jobTitle: JobTitle) => {
  switch (jobTitle) {
    case 'employee':
      return '직장인'
    case 'college_student':
      return '대학(원)생'
    case 'practitioner':
      return '특수직/전문직'
    case 'businessman':
      return '사업가'
    case 'part_time':
      return '아르바이트'
    case 'self_employed':
      return '자영업'
    case 'etc':
      return '기타'
  }
}

export const getOrganization = (
  verifiedCompanyName: string | null,
  verifiedSchoolName: string | null,
  jobTitle: JobTitle | null,
) => {
  if (!verifiedSchoolName && !verifiedCompanyName) {
    return jobTitle ? convertJobtitle(jobTitle) : '기타'
  }
  if (verifiedCompanyName) {
    return verifiedCompanyName
  }
  if (verifiedSchoolName) {
    return verifiedSchoolName
  }
}

export const convertBodyform = (
  gender: Gender,
  bodyform: MaleBodyForm | FemaleBodyForm,
) => {
  if (gender === 'm') {
    return maleBodyForm.find((x) => x.value === bodyform)?.label
  } else {
    return femaleBodyForm.find((x) => x.value === bodyform)?.label
  }
}
