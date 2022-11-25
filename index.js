import 'react-native-gesture-handler'
import { AppRegistry, LogBox } from 'react-native'
import { App } from 'app'
import CodePush from 'react-native-code-push'
import { IS_DEV } from 'infra/constants'

// NOTE(gogo): may be removed after the bug is fixed
// https://github.com/react-navigation/react-navigation/issues/7839#issuecomment-1281439945
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'Video library is currently not installed.',
  'react-native-haptic-feedback is not installed.',
  // TODO: update stream-chat library
  // https://github.com/GetStream/stream-chat-react-native/issues/1634
  'An error occurred while getting app settings',
  'Both secret and user tokens are not set.',
])
AppRegistry.registerComponent('HeyThereApp', () =>
  IS_DEV
    ? App
    : CodePush({
        checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      })(App),
)
