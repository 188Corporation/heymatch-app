import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'
import { mutate } from 'swr'
import { throttle } from 'lodash-es'

export const COMMON_STACK_SCREEN_OPTIONS: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
}

const throttledMatchRequestUpdate = throttle(
  () => mutate('/match-requests/'),
  1000,
  { trailing: false },
)

// route type is not exposed
// navigation type is not common
export const genTabBarCommon = (
  route: any,
  navigation: any,
  isFocused: boolean,
) => {
  return {
    onPress: () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      })
      // update match tabs on press
      if (route.key.includes('MatchTabs')) throttledMatchRequestUpdate()
      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        // @ts-ignore
        navigation.navigate({ name: route.name, merge: true })
      }
    },
    onLongPress: () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      })
    },
  }
}
