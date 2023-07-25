import { Gender, JobTitle } from 'infra/types'
import { makeAutoObservable } from 'mobx'

export class UserProfileStore {
  username: string = ''
  gender: Gender | null = null
  birthdate: string | null = null
  photos: { mainPhoto: string; sub1Photo: string; sub2Photo: string } = {
    mainPhoto: '',
    sub1Photo: '',
    sub2Photo: '',
  }
  jobTitle: JobTitle | null = null
  email: string | null = null
  verifiedOrganizationNames: string[] | null = null
  emailVerificationCode: string = ''
  blockMySchoolOrCompanyUsers: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get getPhotos() {
    return this.photos
  }

  setUsername(v: string) {
    this.username = v
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

  setJobTitle(jobTitle: JobTitle) {
    this.jobTitle = jobTitle
  }

  setEmail(email: string) {
    this.email = email
  }

  setVerifiedOrganizationNames(names: string[]) {
    this.verifiedOrganizationNames = names
  }

  setEmailVerificationCode(code: string) {
    this.emailVerificationCode = code
  }

  setBlockMySchoolOrCompanyUsers(v: boolean) {
    this.blockMySchoolOrCompanyUsers = v
  }
}
