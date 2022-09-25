import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { Marker } from 'react-native-nmap'
import { LocationMarkerPng } from 'image'
import { toNmapCoord } from 'infra/util'

export const LocationMarker = observer(() => {
  const { locationStore } = useStores()
  const loc = locationStore._location
  if (!loc) return null
  return (
    <Marker
      coordinate={toNmapCoord(loc)}
      image={LocationMarkerPng}
      width={32}
      height={32}
    />
  )
})
