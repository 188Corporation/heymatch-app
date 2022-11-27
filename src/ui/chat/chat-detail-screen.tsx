import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Channel, MessageList } from 'stream-chat-react-native'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { navigation } from 'navigation/global'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { BackArrowBlackSvg } from 'image'
import { Avatar } from 'ui/common/avatar'
import { Caption, CaptionS, H3 } from 'ui/common/text'
import { ChatInput } from 'ui/chat/chat-input'
import { myMessageStyle } from 'infra/chat'
import { Colors } from 'infra/colors'
import { formatDate } from 'infra/datetime'
import { START_CHAT_MESSAGE } from 'infra/messages'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { BottomInsetSpace, TopInsetSpace } from 'ui/common/inset-space'

export const ChatDetailScreen = observer(() => {
  const {
    chatStore: { channel, group, isMessage },
  } = useStores()
  if (!channel || !group) {
    navigation.goBack()
    return null
  }
  const MessageAvatar = () => (
    <Avatar
      side={32}
      source={{ uri: group.group_profile_images[0].thumbnail }}
      style={{ marginRight: 8 }}
    />
  )
  return (
    <KeyboardAvoidingView>
      <TopInsetSpace />
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrowBlackSvg />
        </BackButton>
        <MessageAvatar />
        <TitleText>{group.title}</TitleText>
      </HeaderContainer>
      <Column style={{ flex: 1 }}>
        {!isMessage && (
          <FloatingTip>
            <Caption style={{ color: Colors.gray.v500 }}>
              {START_CHAT_MESSAGE}
            </Caption>
          </FloatingTip>
        )}
        <Channel
          channel={channel}
          MessageAvatar={MessageAvatar}
          DateHeader={() => null}
          InlineDateSeparator={({ date }) => {
            if (!date) return null
            return <DateHeader>{formatDate(date)}</DateHeader>
          }}
        >
          <MessageList myMessageTheme={myMessageStyle} />
          <ChatInput />
        </Channel>
      </Column>
      <BottomInsetSpace />
    </KeyboardAvoidingView>
  )
})

const HeaderContainer = styled(Row)`
  padding: 20px 28px 20px 20px;
  align-items: center;
`

const BackButton = styled(TouchableOpacity)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const TitleText = styled(H3).attrs({
  numberOfLines: 1,
})`
  flex-shrink: 1;
`

const DateHeader = styled(CaptionS)`
  color: ${Colors.gray.v500};
  margin: 16px 0;
  text-align: center;
`

const FloatingTip = styled(Row)`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  left: 28px;
  right: 28px;
  z-index: 1;
  border-radius: 8px;
  background-color: ${Colors.gray.v100};
  padding: 16px 0;
`
