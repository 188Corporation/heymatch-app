import { CURRENT_OS, OS } from 'infra/constants'
import { makeAutoObservable, runInAction } from 'mobx'
import {
  checkMultiple,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  Rationale,
  request,
} from 'react-native-permissions'

export enum PermissionType {
  location = 'location',
  camera = 'camera',
  gallery = 'gallery',
}
const permissionTypes: PermissionType[] = Object.values(PermissionType)

const LibPermissions: {
  [permissionType in PermissionType]: { [os in OS]: Permission }
} = {
  location: {
    [OS.ANDROID]: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    [OS.IOS]: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  camera: {
    [OS.ANDROID]: PERMISSIONS.ANDROID.CAMERA,
    [OS.IOS]: PERMISSIONS.IOS.CAMERA,
  },
  gallery: {
    [OS.ANDROID]: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    [OS.IOS]: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
}

const getLibPermission = (p: PermissionType) => LibPermissions[p][CURRENT_OS]

export class PermissionStore {
  location: PermissionStatus | null = null
  camera: PermissionStatus | null = null
  gallery: PermissionStatus | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async checkAll() {
    const statuses = await checkMultiple(
      permissionTypes.map((p) => getLibPermission(p)),
    )
    runInAction(() => {
      permissionTypes.forEach((p) => {
        this[p] = statuses[getLibPermission(p)]
      })
    })
  }

  async request(p: PermissionType, rationale?: Rationale) {
    const status = await request(getLibPermission(p), rationale)
    runInAction(() => {
      this[p] = status
    })
  }
}
