import { tokenManager } from 'api/fetcher'
import { emitter, EventType } from 'infra/events'
import { storage } from 'infra/storage'
import { User } from 'infra/types'
import { makeAutoObservable } from 'mobx'
import OneSignal from 'react-native-onesignal'
import { decode } from 'react-native-pure-jwt'

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
    storage.getItem<string>(TOKEN_KEY).then(async (token) => {
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
    storage.getItem<boolean>(AGREEMENT_KEY).then((isChecked) => {
      this.setIsAgreementChecked(isChecked === true)
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
    storage.setItem(TOKEN_KEY, token)
    tokenManager.setToken(token)
    this.isLoggedIn = true
  }

  logout() {
    storage.removeItem(TOKEN_KEY)
    storage.removeItem(AGREEMENT_KEY)
    tokenManager.setToken('')
    this.isLoggedIn = false
    this.isAgreementChecked = false
    OneSignal.removeExternalUserId()
    OneSignal.logoutSMSNumber()
  }

  checkAgreement() {
    storage.setItem(AGREEMENT_KEY, true)
    this.isAgreementChecked = true
  }
}
