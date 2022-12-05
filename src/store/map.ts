import { makeAutoObservable } from 'mobx'
import { createRef, RefObject } from 'react'
import NaverMapView from 'react-native-nmap'
import {
  GpsBounds,
  GpsLocation,
  Group,
  LocationTrackingMode,
  NaverMapCamera,
  LatLngDelta,
} from 'infra/types'
import { DEFAULT_ZOOM } from 'infra/constants'
import { geoinfoToNmapCoord } from 'infra/util'

export class MapStore {
  mapRef: RefObject<NaverMapView> = createRef()
  camera: NaverMapCamera | null = null
  selectedGroup: Group | null = null
  isReady: boolean = false

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

  focusLocation(location: GpsLocation, zoom: LatLngDelta = DEFAULT_ZOOM) {
    this.mapRef.current?.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      ...zoom,
    })
  }

  setLocationTrackingMode(mode: LocationTrackingMode) {
    this.mapRef.current?.setLocationTrackingMode(mode)
  }

  setCamera(c: NaverMapCamera) {
    this.camera = c
  }

  setIsReady(v: boolean) {
    this.isReady = v
  }

  selectGroup(g: Group) {
    this.selectedGroup = g
    const { latitude, longitude } = geoinfoToNmapCoord(g.gps_geoinfo)
    this.mapRef.current?.animateToCoordinate({
      latitude,
      longitude,
    })
  }

  clearSelectedGroup() {
    this.selectedGroup = null
  }

  onNonMarkerTouch() {
    this.clearSelectedGroup()
  }
}
