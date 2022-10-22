import { AppRegistry, LogBox } from 'react-native'
import { App } from 'app'

// NOTE(gogo): may be removed after the bug is fixed
// https://github.com/react-navigation/react-navigation/issues/7839#issuecomment-1281439945
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
])
AppRegistry.registerComponent('HeyThereApp', () => App)
