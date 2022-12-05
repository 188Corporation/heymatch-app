import { GpsLocation, Group, LatLngDelta } from 'infra/types'
import { Coord } from 'react-native-nmap'
import { useSafeAreaInsets as _useSafeAreaInsets } from 'react-native-safe-area-context'
import CodePush from 'react-native-code-push'
import Toast from 'react-native-toast-message'

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

export const formatMaleFemaleInfo = (data: Group) => {
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
  return { ...insets, bottom: insets.bottom - 12 }
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
