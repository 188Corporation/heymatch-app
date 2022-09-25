import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'
import NaverMapView from 'react-native-nmap'
import {
  GpsBounds,
  GpsLocation,
  LocationTrackingMode,
  NaverMapCamera,
} from 'infra/types'
import { DEFAULT_ZOOM } from 'infra/constants'

export class MapStore {
  mapRef: RefObject<NaverMapView> = createRef()
  camera: NaverMapCamera | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get rangeBounds(): GpsBounds | null {
    const c = this.camera
    if (!c) return null
    return {
      maxLat: c.bound.north,
      minLat: c.bound.south,
      maxLng: c.bound.east,
      minLng: c.bound.west,
    }
  }

  get mapCenter() {
    const c = this.camera
    if (!c) return null
    const { latitude, longitude, zoom } = c
    return {
      latitude,
      longitude,
      zoom,
      tilt: 0,
      bearing: 0,
    }
  }

  focusLocation(location: GpsLocation) {
    this.mapRef.current?.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      ...DEFAULT_ZOOM,
    })
  }

  setLocationTrackingMode(mode: LocationTrackingMode) {
    this.mapRef.current?.setLocationTrackingMode(mode)
  }

  setCamera(c: NaverMapCamera) {
    this.camera = c
  }
}
