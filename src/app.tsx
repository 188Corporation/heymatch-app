import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { RootStacks } from 'navigation/root-stacks'
import { Colors } from 'infra/colors'
import { StoresProvider } from 'store/globals'
import { AlertModal } from 'ui/common/alert-modal'
import { _navigationRef } from 'navigation/global'
import { ChatProvider } from 'infra/chat'
import { StatusBar } from 'react-native'
import { CURRENT_OS, OS } from 'infra/constants'
import Toast from 'react-native-toast-message'

export const App = () => {
  // NOTE(gogo): all init code should go under root stack
  return (
    <StoresProvider>
      <ChatProvider>
        <StatusBar
          barStyle={CURRENT_OS === OS.IOS ? 'dark-content' : undefined}
        />
        <NavigationContainer
          ref={_navigationRef}
          // @ts-ignore
          theme={{ colors: { background: Colors.white } }}
        >
          <RootStacks />
        </NavigationContainer>
        <AlertModal />
        <Toast />
      </ChatProvider>
    </StoresProvider>
  )
}
