import { GpsLocation } from 'infra/types'
import { Coord } from 'react-native-nmap'

export const toNmapCoord = ({ lat, lng }: GpsLocation): Coord => ({
  latitude: lat,
  longitude: lng,
})
