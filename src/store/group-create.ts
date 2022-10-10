import { makeAutoObservable } from 'mobx'

export class GroupCreateStore {
  photo: string | null = null
  maleCount: number = 0
  femaleCount: number = 0
  averageAge: number = 0
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
