import { makeAutoObservable } from 'mobx'

export class GroupCreateStore {
  id: string = ''
  title: string = ''
  meetupDate: string | null = null
  address: { title: string; address: string } = {
    title: '',
    address: '',
  }
  gpsPoint: string = ''
  introduce: string = ''
  memberNumber: string = ''
  memberAverageAge: string = ''
  aboutOurGroupTags: string[] = []
  meetingWeWantTags: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setId(v: string) {
    this.id = v
  }

  setTitle(v: string) {
    this.title = v
  }

  setMeetupDate(v: string) {
    this.meetupDate = v
  }

  setAddress(v: { title: string; address: string }) {
    this.address = v
  }

  setGpsPoint(v: string) {
    this.gpsPoint = v
  }

  setIntroduce(v: string) {
    this.introduce = v
  }

  setMemberNumber(v: string) {
    this.memberNumber = v
  }

  setMemberAverageAge(v: string) {
    this.memberAverageAge = v
  }

  updateAboutOurGroupTags(v: string) {
    if (this.aboutOurGroupTags.some((tag) => tag === v)) {
      this.aboutOurGroupTags = this.aboutOurGroupTags.filter((tag) => tag !== v)
    } else {
      if (this.aboutOurGroupTags.length === 5) return
      this.aboutOurGroupTags = [...this.aboutOurGroupTags, v]
    }
  }

  updateMeetingWeWantTags(v: string) {
    if (this.meetingWeWantTags.some((tag) => tag === v)) {
      this.meetingWeWantTags = this.meetingWeWantTags.filter((tag) => tag !== v)
    } else {
      if (this.meetingWeWantTags.length === 5) return
      this.meetingWeWantTags = [...this.meetingWeWantTags, v]
    }
  }

  initialize() {
    this.id = ''
    this.title = ''
    this.meetupDate = null
    this.address = {
      title: '',
      address: '',
    }
    this.gpsPoint = ''
    this.introduce = ''
    this.memberNumber = ''
    this.memberAverageAge = ''
    this.aboutOurGroupTags = []
    this.meetingWeWantTags = []
  }
}
