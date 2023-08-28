import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useChats, useMatchRequests } from 'api/reads'
import { SendSvg } from 'image'
import { Colors } from 'infra/colors'
import { genTabBarCommon } from 'navigation/common'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import { BottomInsetSpace } from 'ui/common/inset-space'
import { Column, Row } from 'ui/common/layout'
import { CaptionS } from 'ui/common/text'

const ScreenToIconText: { [key: string]: { icon: string; text: string } } = {
  GroupList: { icon: 'whatshot', text: '메인' },
  MatchTabs: { icon: 'send', text: '매칭' },
  ChatScreen: { icon: 'question-answer', text: '채팅' },
  MyScreen: { icon: 'person', text: 'MY' },
}

export const MainBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { data: chatData } = useChats()
  const isUnreadChat = chatData?.find(
    (chat) => chat.channel.unread_messages > 0,
  )
  const { data: matchRequestData } = useMatchRequests()
  const isReceivedRequest = matchRequestData?.received.find(
    (req) => req.status === 'WAITING',
  )

  const getIcon = (iconText: string, isFocused: boolean) => {
    switch (iconText) {
      case 'send':
        return (
          <SvgContainer>
            {isReceivedRequest && <Badge />}
            <SendSvg fill={isFocused ? Colors.primary.red : Colors.gray.v200} />
          </SvgContainer>
        )
      case 'question-answer':
        return (
          <SvgContainer>
            {isUnreadChat && <Badge />}
            <CustomIcon
              name={iconText}
              size={28}
              color={isFocused ? Colors.primary.red : Colors.gray.v200}
            />
          </SvgContainer>
        )
      default:
        return (
          <CustomIcon
            name={iconText}
            size={28}
            color={isFocused ? Colors.primary.red : Colors.gray.v200}
          />
        )
    }
  }

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
                {getIcon(iconText.icon, isFocused)}
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

const SvgContainer = styled(Row)`
  justify-content: center;
  height: 28px;
  width: 28px;
  padding-top: 2px;
  margin-bottom: 4px;
  position: relative;
`
const Badge = styled(View)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  left: -4px;
  background-color: red;
`
