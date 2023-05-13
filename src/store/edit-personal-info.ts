import { makeAutoObservable } from 'mobx'

export class EditPersonalInfo {
  isEditingNow: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsEditingNow(value: boolean) {
    this.isEditingNow = value
  }
}
