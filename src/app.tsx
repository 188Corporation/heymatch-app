import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from 'navigation/root-stack'
import { Colors } from 'infra/colors'
import { keyboardStore } from 'store/keyboard'

export const App = () => {
  useEffect(() => {
    keyboardStore.sub()
    return () => {
      keyboardStore.unsub()
    }
  }, [])
  return (
    // @ts-ignore
    <NavigationContainer theme={{ colors: { background: Colors.white } }}>
      <RootStack />
    </NavigationContainer>
  )
}
