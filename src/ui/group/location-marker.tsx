import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { Marker } from 'react-native-nmap'
import { LocationMarkerPng } from 'image'

export const LocationMarker = observer(() => {
  const { locationStore } = useStores()
  const loc = locationStore._location
  if (!loc) return null
  return (
    <Marker
      coordinate={{ latitude: loc.lat, longitude: loc.lng }}
      image={LocationMarkerPng}
      width={32}
      height={32}
    />
  )
})
