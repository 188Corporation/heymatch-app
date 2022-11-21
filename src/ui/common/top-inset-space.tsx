import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const TopInsetSpace = () => {
  const { top: height } = useSafeAreaInsets()
  return <View style={{ height }} />
}
