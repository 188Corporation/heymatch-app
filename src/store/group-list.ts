import { makeAutoObservable } from 'mobx'

export class GroupListStore {
  searchPlaceKeyword: string = ''
  dateFilter: { startDate?: string; endDate?: string } | null = null
  membersFilter: number | null = null
  distanceFilter: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setSearchPlaceKeyword(v: string) {
    this.searchPlaceKeyword = v
  }

  setDateFilter(v: { startDate?: string; endDate?: string } | null) {
    this.dateFilter = v
  }

  setMembersFilter(v: number | null) {
    this.membersFilter = v
  }

  setDistanceFilter(v: number | null) {
    this.distanceFilter = v
  }
}
