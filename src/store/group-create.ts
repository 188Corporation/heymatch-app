import { makeAutoObservable } from 'mobx'

export class GroupCreateStore {
  maleCount: number = 0
  femaleCount: number = 0
  averageAge: number = 0
  title: string = ''
  intro: string = ''

  constructor() {
    makeAutoObservable(this)
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
