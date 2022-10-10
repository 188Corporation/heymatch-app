import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack'

export const COMMON_STACK_SCREEN_OPTIONS: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
}
