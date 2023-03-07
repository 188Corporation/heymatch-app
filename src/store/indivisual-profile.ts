import { Gender } from 'infra/types'
import { makeAutoObservable } from 'mobx'

export class IndivisualProfileStore {
  gender: Gender | null = null
  birthday: Date | null = null
  photos: { mainPhoto: string; sub1Photo: string; sub2Photo: string } = {
    mainPhoto: '',
    sub1Photo: '',
    sub2Photo: '',
  }

  mainPhoto: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get getPhotos() {
    return this.photos
  }

  setGender(gender: Gender) {
    this.gender = gender
  }

  setBirthday(date: Date) {
    this.birthday = date
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
}
