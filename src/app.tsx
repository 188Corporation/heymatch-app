import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from 'navigation/root-stack'
import { Colors } from 'infra/colors'
import { StoresProvider } from 'store/globals'
import { AlertModal } from 'ui/common/alert-modal'
import { _navigationRef } from 'navigation/global'

export const App = () => {
  // NOTE(gogo): all init code should go under root stack
  return (
    <StoresProvider>
      <NavigationContainer
        ref={_navigationRef}
        // @ts-ignore
        theme={{ colors: { background: Colors.white } }}
      >
        <RootStack />
      </NavigationContainer>
      <AlertModal />
    </StoresProvider>
  )
}
