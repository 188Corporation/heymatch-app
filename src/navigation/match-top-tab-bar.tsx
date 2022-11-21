import React, { useEffect, useRef } from 'react'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Animated, TouchableOpacity, View } from 'react-native'
import { genTabBarCommon } from 'navigation/common'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { WINDOW_DIMENSIONS } from 'infra/constants'
import { Colors } from 'infra/colors'
import { DEFAULT_FONT_FAMILY } from 'ui/common/text'
import { TabBarLabel } from 'infra/types'
import { TopInsetSpace } from 'ui/common/top-inset-space'

const HORIZONTAL_PADDING = 20
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
  const positionJs = useRef(new Animated.Value(0)).current
  useEffect(() => {
    const listener = position.addListener(
      Animated.event([{ value: positionJs }], { useNativeDriver: false }),
    )
    return () => position.removeListener(listener)
  }, [position, positionJs])
  return (
    <Column>
      <TopInsetSpace />
      <BarContainer>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label: TabBarLabel = JSON.parse(options.tabBarLabel as string)
          const isFocused = state.index === index
          const { onPress, onLongPress } = genTabBarCommon(
            route,
            navigation,
            isFocused,
          )
          const color = positionJs.interpolate({
            inputRange,
            outputRange: inputRange.map((i) =>
              i === index ? Colors.gray.v600 : Colors.gray.v300,
            ),
          })
          const numberColor = positionJs.interpolate({
            inputRange,
            outputRange: inputRange.map((i) =>
              i === index ? Colors.primary.blue : Colors.gray.v300,
            ),
          })
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
              <AnimatedH3 style={{ color, marginRight: 4 }}>
                {label.text}
              </AnimatedH3>
              <AnimatedH3 style={{ color: numberColor }}>
                {label.number}
              </AnimatedH3>
            </BarButton>
          )
        })}
        <FocusIndicator style={{ transform: [{ translateX }] }} />
      </BarContainer>
      <BottomLine />
    </Column>
  )
}

const BarContainer = styled(Row)`
  position: relative;
  margin-top: 4px;
  padding: 0 ${HORIZONTAL_PADDING}px;
`

const BottomLine = styled(View)`
  height: 1px;
  background-color: ${Colors.gray.v100};
`

const BarButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
`

const FocusIndicator = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${FOCUS_INDICATOR_WIDTH}px;
  height: 3px;
  background-color: black;
`

const AnimatedH3 = styled(Animated.Text)`
  font-family: ${DEFAULT_FONT_FAMILY};
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`
