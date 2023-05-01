import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { SendSvg } from 'image'
import { Colors } from 'infra/colors'
import { genTabBarCommon } from 'navigation/common'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { CaptionS } from 'ui/common/text'

const ScreenToIconText: { [key: string]: { icon: string; text: string } } = {
  GroupList: { icon: 'whatshot', text: '메인' },
  // GroupScreen: { icon: 'whatshot', text: '핫플' },
  NewGroupDetailScreen: { icon: 'group', text: '그룹' },
  ChatScreen: { icon: 'question-answer', text: '채팅' },
  MyScreen: { icon: 'person', text: '마이' },
}

export const MainBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <BarContainer>
      <Row>
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
      </Row>
      <BottomInsetSpace />
    </BarContainer>
  )
}

const BarContainer = styled(Column)`
  padding: 12px 32px;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: ${Colors.gray.v100};
  background-color: ${Colors.white};
`

const Button = styled(TouchableOpacity)`
  flex: 1;
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
