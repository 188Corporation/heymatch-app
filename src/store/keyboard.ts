import { EmitterSubscription, Keyboard } from 'react-native'
import { makeAutoObservable, runInAction } from 'mobx'

class KeyboardStore {
  isVisible = false
  _subs: EmitterSubscription[] = []

  constructor() {
    makeAutoObservable(this)
  }

  sub() {
    this._subs = [
      Keyboard.addListener('keyboardDidShow', () =>
        runInAction(() => (this.isVisible = true)),
      ),
      Keyboard.addListener('keyboardDidHide', () =>
        runInAction(() => (this.isVisible = false)),
      ),
    ]
  }

  unsub() {
    this._subs.forEach((sub) => sub.remove())
    this._subs = []
  }

  hide() {
    Keyboard.dismiss()
  }
}

export const keyboardStore = new KeyboardStore()
