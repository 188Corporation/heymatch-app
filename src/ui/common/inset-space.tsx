import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'infra/util'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'

export const TopInsetSpace = () => {
  const { top: height } = useSafeAreaInsets()
  return <View style={{ height }} />
}

export const BottomInsetSpace = observer(() => {
  const { bottom: height } = useSafeAreaInsets()
  const { keyboardStore } = useStores()
  if (keyboardStore.isVisible) return null
  return <View style={{ height }} />
})
