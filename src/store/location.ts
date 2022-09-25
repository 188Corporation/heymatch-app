import { makeAutoObservable, runInAction } from 'mobx'
import Geolocation, { GeoPosition } from 'react-native-geolocation-service'
import { GpsLocation } from 'infra/types'
import { getDistance } from 'geolib'

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
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
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

  getDistance(loc: GpsLocation) {
    if (!this._location) return null
    return getDistance(this._location, loc)
  }
}
