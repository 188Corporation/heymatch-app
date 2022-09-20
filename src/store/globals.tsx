import React, { createContext } from 'react'
import { KeyboardStore } from 'store/keyboard'

// STEP1: 전역 인스턴스 생성
const stores = {
  keyboardStore: new KeyboardStore(),
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
