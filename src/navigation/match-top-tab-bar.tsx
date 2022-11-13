import React from 'react'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Animated, TouchableOpacity, View } from 'react-native'
import { genTabBarCommon } from 'navigation/common'

export const MatchTopTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel as string
        const isFocused = state.index === index
        const { onPress, onLongPress } = genTabBarCommon(
          route,
          navigation,
          isFocused,
        )
        const inputRange = state.routes.map((_, i) => i)
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        })
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
