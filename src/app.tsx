import { NavigationContainer } from '@react-navigation/native'
import { ChatProvider } from 'infra/chat'
import { Colors } from 'infra/colors'
import { CURRENT_OS, OS } from 'infra/constants'
import { toastConfig } from 'infra/toast-config'
import { _navigationRef } from 'navigation/global'
import { RootStacks } from 'navigation/root-stacks'
import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import { StoresProvider } from 'store/globals'
import { AlertModal } from 'ui/common/alert-modal'

if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

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
        <Toast config={toastConfig} />
      </ChatProvider>
    </StoresProvider>
  )
}
