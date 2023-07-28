import { makeAutoObservable } from 'mobx'

type SortType = '생성순' | '가까운 날짜순'

export class GroupListStore {
  searchPlaceKeyword: string = ''
  dateFilter: { startDate?: string; endDate?: string } | null = null
  membersFilter: number | null = null
  distanceFilter: number | null = null
  sortFilter: SortType = '생성순'

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

  setSortFilter(v: SortType) {
    this.sortFilter = v
  }
}
