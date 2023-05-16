import React, { createContext } from 'react'
import { AlertStore } from 'store/alert'
import { AuthStore } from 'store/auth'
import { ChatStore } from 'store/chat'
import { GroupCreateStoreRegacy } from 'store/group-create-regacy'
import { GroupListStore } from 'store/group-list'
import { KeyboardStore } from 'store/keyboard'
import { LocationStore } from 'store/location'
import { MapStore } from 'store/map'
import { PermissionStore } from 'store/permission'
import { UserProfileStore } from 'store/user-profile'
import { GroupCreateStore } from './group-create'

// STEP1: 전역 인스턴스 생성
const stores = {
  keyboardStore: new KeyboardStore(),
  permissionStore: new PermissionStore(),
  locationStore: new LocationStore(),
  mapStore: new MapStore(),
  alertStore: new AlertStore(),
  authStore: new AuthStore(),
  groupCreateStoreRegacy: new GroupCreateStoreRegacy(),
  groupCreateStore: new GroupCreateStore(),
  chatStore: new ChatStore(),
  userProfileStore: new UserProfileStore(),
  groupListStore: new GroupListStore(),
}

export const StoresContext = createContext<typeof stores>(stores)

export const StoresProvider: React.FCC = (props) => {
  return (
    <StoresContext.Provider value={stores}>
      {props.children}
    </StoresContext.Provider>
  )
}

// STEP2: import 해서 사용
// [예시] const { userStore } = useStores()
// store 사용할 컴포넌트를 observer 로 감싸는 것 잊지 말기!
export const useStores = () => {
  return React.useContext(StoresContext)
}
