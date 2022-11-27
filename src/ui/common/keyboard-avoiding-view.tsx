import React from 'react'
import {
  KeyboardAvoidingView as _KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { CURRENT_OS, OS } from 'infra/constants'
import { useStores } from 'store/globals'
import { observer } from 'mobx-react'

export const KeyboardAvoidingView: React.FCC = observer(({ children }) => {
  const { keyboardStore } = useStores()
  return (
    <TouchableWithoutFeedback
      onPress={() => keyboardStore.hide()}
      // 정말 이상하게도 키보드가 보이지 않는 상태에서 이거 disabled 를 안 하면
      // input 외의 다른 영역에서 스크롤 터치가 안 먹는다... (iOS 에서 테스트)
      // 왜 되는진 모르겠지만 일단 해결...
      disabled={!keyboardStore.isVisible}
    >
      <_KeyboardAvoidingView
        behavior={CURRENT_OS === OS.IOS ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {children}
      </_KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
})
