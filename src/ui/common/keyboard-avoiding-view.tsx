import React from 'react'
import {
  ColorValue,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { CURRENT_OS, OS } from 'infra/constants'
import { useStores } from 'store/globals'

export const KeyboardAvoidingView: React.FCC<{
  backgroundColor: ColorValue
}> = ({ children, backgroundColor }) => {
  const { keyboardStore } = useStores()
  return (
    <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
      <_KeyboardAvoidingView
        behavior={CURRENT_OS === OS.IOS ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {children}
        </ScrollView>
      </_KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
