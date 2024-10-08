import { NavigationContainer } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
import { ChatProvider } from 'infra/chat'
import { Colors } from 'infra/colors'
import { CURRENT_OS, OS, SENTRY_DSN_KEY } from 'infra/constants'
import { toastConfig } from 'infra/toast-config'
import { _navigationRef } from 'navigation/global'
import { RootStacks } from 'navigation/root-stacks'
import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import { StoresProvider } from 'store/globals'
import { AlertModal } from 'ui/common/alert-modal'

/* 시뮬레이터 환경에서 reactron 사용 설정 */
if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

/* 디바이스 환경에서 reactron 사용 설정 */
// let scriptHostname
// if (__DEV__) {
//   import('../ReactotronConfig').then(() => console.log('Reactotron Configured'))
//   const scriptURL = NativeModules.SourceCode.scriptURL
//   scriptHostname = scriptURL.split('://')[1].split(':')[0]
// }
// Reactotron.configure({ host: scriptHostname }).connect()

if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_DSN_KEY,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    environment: 'production',
  })
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
