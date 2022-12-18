import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { App } from 'app'
import CodePush from 'react-native-code-push'
import { IS_DEV } from 'infra/constants'
import messaging from '@react-native-firebase/messaging'
import { backgroundMessageHandler } from 'infra/chat'

// NOTE(gogo): may be removed after the bug is fixed
// https://github.com/react-navigation/react-navigation/issues/7839#issuecomment-1281439945
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'Video library is currently not installed.',
  'react-native-haptic-feedback is not installed.',
  '[notifee] no background event handler has been set.',
])
messaging().setBackgroundMessageHandler(backgroundMessageHandler)
AppRegistry.registerComponent('HeyThereApp', () =>
  IS_DEV
    ? App
    : CodePush({
        checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      })(App),
)
