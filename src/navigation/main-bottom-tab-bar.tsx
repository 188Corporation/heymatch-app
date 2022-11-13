import { TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Column, Row } from 'ui/common/layout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { Colors } from 'infra/colors'
import { CaptionS } from 'ui/common/text'
import { CURRENT_OS, OS } from 'infra/constants'
import { SendSvg } from 'image'
import { genTabBarCommon } from 'navigation/common'

const ScreenToIconText: { [key: string]: { icon: string; text: string } } = {
  GroupScreen: { icon: 'whatshot', text: '핫플' },
  MatchTabs: { icon: 'send', text: '매칭' },
  ChatScreen: { icon: 'question-answer', text: '채팅' },
  MyScreen: { icon: 'person', text: '마이' },
}

export const MainBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <BarContainer style={{ paddingBottom: insets.bottom + 4 }}>
      {state.routes.map((route, index) => {
        // adapted from https://reactnavigation.org/docs/bottom-tab-navigator#tabbar
        const { options } = descriptors[route.key]
        const iconText = ScreenToIconText[route.name]
        const isFocused = state.index === index
        const { onPress, onLongPress } = genTabBarCommon(
          route,
          navigation,
          isFocused,
        )
        return (
          <Button
            key={index}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <ButtonContentContainer>
              {iconText.icon === 'send' ? (
                <SendSvgContainer>
                  <SendSvg
                    fill={isFocused ? Colors.primary.red : Colors.gray.v200}
                  />
                </SendSvgContainer>
              ) : (
                <CustomIcon
                  name={iconText.icon}
                  size={28}
                  color={isFocused ? Colors.primary.red : Colors.gray.v200}
                />
              )}
              <CaptionS
                style={{
                  color: isFocused ? Colors.primary.red : Colors.gray.v400,
                }}
              >
                {iconText.text}
              </CaptionS>
            </ButtonContentContainer>
          </Button>
        )
      })}
    </BarContainer>
  )
}

const BarContainer = styled(Row)`
  padding-top: 12px;
  padding-left: 32px;
  padding-right: 32px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${Colors.gray.v100};
  background-color: ${Colors.white};
`

const Button = styled(TouchableOpacity)`
  flex: 1;
  padding-bottom: ${CURRENT_OS === OS.ANDROID ? 8 : 0}px;
`

const ButtonContentContainer = styled(Column)`
  align-items: center;
`

const CustomIcon = styled(Icon)`
  margin-bottom: 4px;
`

const SendSvgContainer = styled(Row)`
  justify-content: center;
  height: 28px;
  width: 28px;
  padding-top: 2px;
  margin-bottom: 4px;
`
