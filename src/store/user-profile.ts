import { FemaleBodyForm, Gender, JobTitle, MaleBodyForm } from 'infra/types'
import { makeAutoObservable } from 'mobx'

export class UserProfileStore {
  gender: Gender | null = null
  birthdate: string | null = null
  photos: { mainPhoto: string; sub1Photo: string; sub2Photo: string } = {
    mainPhoto: '',
    sub1Photo: '',
    sub2Photo: '',
  }
  height: number | null = null
  maleBodyForm: MaleBodyForm | null = null
  femaleBodyForm: FemaleBodyForm | null = null
  jobTitle: JobTitle | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get getPhotos() {
    return this.photos
  }

  get getBodyForm() {
    if (this.gender === 'm') {
      return this.maleBodyForm
    } else if (this.gender === 'f') {
      return this.femaleBodyForm
    } else {
      return null
    }
  }

  setGender(gender: Gender) {
    this.gender = gender
  }

  setBirthdate(date: string) {
    this.birthdate = date
  }

  setPhotos(photo: string, photoType: 'main' | 'sub1' | 'sub2') {
    switch (photoType) {
      case 'main':
        this.photos.mainPhoto = photo
        break
      case 'sub1':
        this.photos.sub1Photo = photo
        break
      case 'sub2':
        this.photos.sub2Photo = photo
    }
  }

  setHeight(height: number) {
    this.height = height
  }

  setBodyForm(gender: Gender, bodyForm: MaleBodyForm | FemaleBodyForm) {
    if (gender === 'm') {
      this.maleBodyForm = bodyForm as MaleBodyForm
    } else {
      this.femaleBodyForm = bodyForm as FemaleBodyForm
    }
  }

  setJobTitle(jobTitle: JobTitle) {
    this.jobTitle = jobTitle
  }
}
