import { makeAutoObservable } from 'mobx'

export class GroupCreateStore {
  photo: string | null = null
  maleCount: number | null = null
  femaleCount: number | null = null
  averageAge: number | null = null
  title: string = ''
  intro: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setPhoto(v: string) {
    this.photo = v
  }

  clearPhoto() {
    this.photo = null
  }

  setMaleCount(v: number) {
    this.maleCount = v
  }

  setFemaleCount(v: number) {
    this.femaleCount = v
  }

  setAverageAge(v: number) {
    this.averageAge = v
  }

  setTitle(v: string) {
    this.title = v
  }

  setIntro(v: string) {
    this.intro = v
  }
}
