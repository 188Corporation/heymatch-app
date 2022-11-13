import React from 'react'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Animated, TouchableOpacity } from 'react-native'
import { genTabBarCommon } from 'navigation/common'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { WINDOW_DIMENSIONS } from 'infra/constants'

const HORIZONTAL_PADDING = 10
const FOCUS_INDICATOR_WIDTH =
  (WINDOW_DIMENSIONS.width - HORIZONTAL_PADDING * 2) / 2

export const MatchTopTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const inputRange = state.routes.map((_, i) => i)
  const translateX = position.interpolate({
    inputRange,
    outputRange: inputRange.map(
      (i) => HORIZONTAL_PADDING + i * FOCUS_INDICATOR_WIDTH,
    ),
  })
  return (
    <BarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel as string
        const isFocused = state.index === index
        const { onPress, onLongPress } = genTabBarCommon(
          route,
          navigation,
          isFocused,
        )
        return (
          <BarButton
            key={index}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ color: isFocused ? 'black' : 'green' }}>
              {label}
            </Animated.Text>
          </BarButton>
        )
      })}
      <FocusIndicator style={{ transform: [{ translateX }] }} />
    </BarContainer>
  )
}

const BarContainer = styled(Row)`
  background-color: red;
  position: relative;
`

const BarButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  padding: 16px 0;
`

const FocusIndicator = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${FOCUS_INDICATOR_WIDTH}px;
  height: 10px;
  background-color: black;
`
