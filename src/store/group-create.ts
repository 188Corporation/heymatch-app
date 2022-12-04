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

  get trimmedTitle() {
    return this.title.trim()
  }

  get isTitleValid() {
    const title = this.trimmedTitle
    return title && title.length <= 15
  }

  get trimmedIntro() {
    return this.intro.trim()
  }

  get isIntroValid() {
    const intro = this.trimmedIntro
    return intro && intro.length >= 10 && intro.length <= 400
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

  clearGenderAge() {
    this.maleCount = null
    this.femaleCount = null
    this.averageAge = null
  }

  setTitle(v: string) {
    this.title = v
  }

  setIntro(v: string) {
    this.intro = v
  }
}
