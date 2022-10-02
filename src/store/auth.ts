import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode } from 'react-native-pure-jwt'
import { tokenManager } from 'api/fetcher'

const TOKEN_KEY = 'auth:access-token'

export class AuthStore {
  isInitializing: boolean = true
  isLoggedIn: boolean = false
  userId: string | null = null

  constructor() {
    makeAutoObservable(this)
    // read token from storage
    AsyncStorage.getItem(TOKEN_KEY).then(async (token) => {
      try {
        if (!token) return
        const { payload } = await decode(token, '', { skipValidation: true })
        // check if the token is valid for next 24 hours
        if (
          Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 <
          // @ts-ignore
          payload.exp
        ) {
          this.login(token)
        } else {
          // expired, need refresh
          this.logout()
        }
      } finally {
        this.setIsInitializing(false)
      }
    })
  }

  setIsInitializing(v: boolean) {
    this.isInitializing = v
  }

  login(token: string) {
    AsyncStorage.setItem(TOKEN_KEY, token)
    tokenManager.setToken(token)
    this.isLoggedIn = true
  }

  logout() {
    AsyncStorage.removeItem(TOKEN_KEY)
    tokenManager.setToken('')
    this.isLoggedIn = false
  }
}
