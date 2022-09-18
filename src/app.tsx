import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from 'navigation/root-stack'
import { Colors } from 'infra/colors'

export const App = () => {
  return (
    // @ts-ignore
    <NavigationContainer theme={{ colors: { background: Colors.white } }}>
      <RootStack />
    </NavigationContainer>
  )
}
