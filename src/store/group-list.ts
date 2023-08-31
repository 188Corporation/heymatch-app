import { makeAutoObservable } from 'mobx'

type OrderFilterType = 'created_at' | 'meetup_date'

export class GroupListStore {
  searchPlaceKeyword: string = ''
  dateFilter: { startDate?: string; endDate?: string } | null = null
  membersFilter: number | null = null
  distanceFilter: number | null = null
  orderFilter: OrderFilterType = 'created_at'
  filterParams: string = ''

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

  setOrderFilter(v: OrderFilterType) {
    this.orderFilter = v
  }

  setFilterParams(v: string) {
    this.filterParams = v
  }
}
