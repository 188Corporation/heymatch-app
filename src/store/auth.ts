import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode } from 'react-native-pure-jwt'
import { tokenManager } from 'api/fetcher'
import { emitter, EventType } from 'infra/events'
import OneSignal from 'react-native-onesignal'
import { User } from 'infra/types'

const TOKEN_KEY = 'auth:access-token'
const AGREEMENT_KEY = 'auth:agreement'

export class AuthStore {
  isInitializing: boolean = true
  isLoggedIn: boolean = false
  isAgreementChecked: boolean = false

  constructor() {
    makeAutoObservable(this)
    // logout when token invalidated
    emitter.addListener(EventType.TOKEN_INVALIDATED, () => this.logout())
    // read token from storage
    AsyncStorage.getItem(TOKEN_KEY).then(async (token) => {
      try {
        if (!token) return
        // give random secret, otherwise android native module throws error
        const { payload } = await decode(token, 'x', { skipValidation: true })
        // check if the token is valid for next 24 hours
        if (
          Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 <
          // @ts-ignore
          payload.exp
        ) {
          this._login(token)
        } else {
          // expired, need refresh
          this.logout()
        }
      } finally {
        this.setIsInitializing(false)
      }
    })
    // read agreement from storage
    AsyncStorage.getItem(AGREEMENT_KEY).then((isChecked) => {
      this.setIsAgreementChecked(isChecked === String(true))
    })
  }

  setIsInitializing(v: boolean) {
    this.isInitializing = v
  }

  setIsAgreementChecked(v: boolean) {
    this.isAgreementChecked = v
  }

  login(token: string, user: User) {
    this._login(token)
    OneSignal.setExternalUserId(user.id)
    OneSignal.setSMSNumber(user.phone_number)
  }

  _login(token: string) {
    AsyncStorage.setItem(TOKEN_KEY, token)
    tokenManager.setToken(token)
    this.isLoggedIn = true
  }

  logout() {
    AsyncStorage.removeItem(TOKEN_KEY)
    AsyncStorage.removeItem(AGREEMENT_KEY)
    tokenManager.setToken('')
    this.isLoggedIn = false
    this.isAgreementChecked = false
    OneSignal.removeExternalUserId()
    OneSignal.logoutSMSNumber()
  }

  checkAgreement() {
    AsyncStorage.setItem(AGREEMENT_KEY, String(true))
    this.isAgreementChecked = true
  }
}
