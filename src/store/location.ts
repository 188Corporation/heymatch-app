import { getDistance } from 'geolib'
import { GpsLocation } from 'infra/types'
import { makeAutoObservable, runInAction } from 'mobx'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'

export class LocationStore {
  _location: GpsLocation | null = null
  _watchId: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  _onLocationChange(position: GeoPosition) {
    const { latitude, longitude } = position.coords
    runInAction(() => (this._location = { lat: latitude, lng: longitude }))
  }

  async getLocation(refresh: boolean): Promise<GpsLocation> {
    if (!refresh && this._location) return this._location
    const wasWatching = this._watchId !== null
    return new Promise((resolve, reject) => {
      // `getCurrentPosition` cannot be called while watching
      if (wasWatching) this.unwatchLocation()
      Geolocation.getCurrentPosition(
        (position) => {
          this._onLocationChange(position)
          resolve(this._location!)
          if (wasWatching) this.watchLocation()
        },
        (e) => {
          reject(e)
          if (wasWatching) this.watchLocation()
        },
        {
          // wait 10s max
          timeout: 10000,
          // no caching
          maximumAge: 0,
          // use 100m accuracy
          // https://github.com/Agontuk/react-native-geolocation-service/issues/197
          // https://github.com/Agontuk/react-native-geolocation-service/blob/master/docs/accuracy.md
          accuracy: {
            android: 'balanced',
            ios: 'hundredMeters',
          },
        },
      )
    })
  }

  watchLocation() {
    if (this._watchId !== null) {
      console.warn('[Location] Already watching!')
      return
    }
    // return immediately only at first call
    this._watchId = Geolocation.watchPosition(
      this._onLocationChange.bind(this),
      (e) => {
        console.error(`[Location] ${e}`)
      },
      { enableHighAccuracy: true },
    )
  }

  unwatchLocation() {
    if (this._watchId === null) return
    Geolocation.clearWatch(this._watchId)
    this._watchId = null
  }

  getDistance(loc: GpsLocation, accuracy?: number) {
    if (!this._location) return null
    const distance = getDistance(this._location, loc, accuracy || 10)
    return distance >= 1000
      ? `${Number(distance / 1000).toFixed(1)}km`
      : `${distance}m`
  }
}
