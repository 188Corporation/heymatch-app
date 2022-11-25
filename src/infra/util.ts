import { GpsLocation, Group } from 'infra/types'
import { Coord } from 'react-native-nmap'
import { useSafeAreaInsets as _useSafeAreaInsets } from 'react-native-safe-area-context'

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
  return { ...insets, bottom: insets.bottom - 12 }
}
