import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from 'navigation/root-stack'
import { Colors } from 'infra/colors'
import { StoresProvider } from 'store/globals'
import { AlertModal } from 'ui/common/alert-modal'

export const App = () => {
  // NOTE(gogo): all init code should go under root stack
  return (
    <StoresProvider>
      {/* @ts-ignore */}
      <NavigationContainer theme={{ colors: { background: Colors.white } }}>
        <RootStack />
      </NavigationContainer>
      <AlertModal />
    </StoresProvider>
  )
}
