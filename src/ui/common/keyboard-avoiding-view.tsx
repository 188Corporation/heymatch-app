import React from 'react'
import {
  KeyboardAvoidingView as _KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { CURRENT_OS, OS } from 'infra/constants'
import { useStores } from 'store/globals'

export const KeyboardAvoidingView: React.FCC = ({ children }) => {
  const { keyboardStore } = useStores()
  return (
    <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
      <_KeyboardAvoidingView
        behavior={CURRENT_OS === OS.IOS ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {children}
      </_KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
