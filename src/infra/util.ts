import { GpsLocation } from 'infra/types'
import { Coord } from 'react-native-nmap'
import { AlertStore } from 'store/alert'

export const toNmapCoord = ({ lat, lng }: GpsLocation): Coord => ({
  latitude: lat,
  longitude: lng,
})

export const alertError = (e: Error, store: AlertStore) => {
  store.open({
    title: '예상치 못한 에러가 발생했어요!',
    body: `이용에 불편을 드려 죄송해요 😢 문제가 계속되면 고객센터로 연락해주세요.\n\n${e.name}: ${e.message}`,
    buttonText: '확인',
    onPress: () => store.close(),
  })
}
