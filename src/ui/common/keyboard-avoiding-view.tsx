import React from 'react'
import {
  ColorValue,
  KeyboardAvoidingView as _KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { CURRENT_OS, OS } from 'infra/constants'
import { useStores } from 'store/globals'
import { Colors } from 'infra/colors'

export const KeyboardAvoidingView: React.FCC<{
  backgroundColor?: ColorValue
  withoutScrollView?: boolean
}> = ({
  children,
  backgroundColor = Colors.white,
  withoutScrollView = false,
}) => {
  const { keyboardStore } = useStores()
  return (
    <TouchableWithoutFeedback onPress={() => keyboardStore.hide()}>
      <_KeyboardAvoidingView
        behavior={CURRENT_OS === OS.IOS ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor }}
      >
        {!withoutScrollView ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>
        ) : (
          <>{children}</>
        )}
      </_KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
