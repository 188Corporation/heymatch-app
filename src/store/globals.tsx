import React, { createContext } from 'react'
import { AlertStore } from 'store/alert'
import { AuthStore } from 'store/auth'
import { ChatStore } from 'store/chat'
import { GroupCreateStore } from 'store/group-create'
import { IndivisualProfileStore } from 'store/indivisual-profile'
import { KeyboardStore } from 'store/keyboard'
import { LocationStore } from 'store/location'
import { MapStore } from 'store/map'
import { PermissionStore } from 'store/permission'

// STEP1: 전역 인스턴스 생성
const stores = {
  keyboardStore: new KeyboardStore(),
  permissionStore: new PermissionStore(),
  locationStore: new LocationStore(),
  mapStore: new MapStore(),
  alertStore: new AlertStore(),
  authStore: new AuthStore(),
  groupCreateStore: new GroupCreateStore(),
  chatStore: new ChatStore(),
  indivisualProfileStore: new IndivisualProfileStore(),
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
