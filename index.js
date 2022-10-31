import { AppRegistry, LogBox } from 'react-native'
import { App } from 'app'
import codePush from 'react-native-code-push'
import { IS_DEV } from 'infra/constants'

// NOTE(gogo): may be removed after the bug is fixed
// https://github.com/react-navigation/react-navigation/issues/7839#issuecomment-1281439945
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
])
AppRegistry.registerComponent('HeyThereApp', () =>
  IS_DEV
    ? App
    : codePush({
        checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
        installMode: codePush.InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      })(App),
)
