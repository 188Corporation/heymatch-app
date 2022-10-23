import { GpsLocation, Group } from 'infra/types'
import { Coord } from 'react-native-nmap'
import { AlertStore } from 'store/alert'

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

export const alertError = (e: Error, store: AlertStore) => {
  store.open({
    title: '예상치 못한 에러가 발생했어요!',
    body: `이용에 불편을 드려 죄송해요 😢 문제가 계속되면 고객센터로 연락해주세요.\n\n${e.name}: ${e.message}`,
    buttonText: '확인',
    onPress: () => store.close(),
  })
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
