import { EmitterSubscription, Keyboard } from 'react-native'
import { makeAutoObservable, runInAction } from 'mobx'
import { CURRENT_OS, OS } from 'infra/constants'

export class KeyboardStore {
  isVisible = false
  _subs: EmitterSubscription[] = []
  height = 0

  constructor() {
    makeAutoObservable(this)
  }

  sub() {
    this._subs = [
      // https://reactnative.dev/docs/keyboard#addlistener
      Keyboard.addListener(
        CURRENT_OS === OS.ANDROID ? 'keyboardDidShow' : 'keyboardWillShow',
        (e) =>
          runInAction(() => {
            this.isVisible = true
            this.height = e.endCoordinates.height
          }),
      ),
      Keyboard.addListener(
        CURRENT_OS === OS.ANDROID ? 'keyboardDidHide' : 'keyboardWillHide',
        () =>
          runInAction(() => {
            this.isVisible = false
            this.height = 0
          }),
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
