import { makeAutoObservable } from 'mobx'

export class GroupListStore {
  searchPlaceKeyword = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSearchPlaceKeyword(v: string) {
    this.searchPlaceKeyword = v
  }
}
