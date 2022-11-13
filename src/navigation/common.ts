import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'

export const COMMON_STACK_SCREEN_OPTIONS: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
}

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
