import React, { useRef } from 'react'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { TextInput, TouchableOpacity } from 'react-native'
import { DEFAULT_FONT_FAMILY } from 'ui/common/text'
import { ChatSendSvg } from 'image'
import { useStores } from 'store/globals'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Channel as ChannelType } from 'stream-chat'

class InputStore {
  text: string = ''
  constructor() {
    makeAutoObservable(this)
  }
  send(channel?: ChannelType) {
    if (!channel) return
    channel.sendMessage({ text: this.text })
    this.text = ''
  }
  setText(s: string) {
    this.text = s
  }
}

export const ChatInput = observer(() => {
  const {
    chatStore: { channel },
  } = useStores()
  const store = useRef(new InputStore()).current
  const send = () => store.send(channel)
  return (
    <TopWrapper>
      <InputContainer>
        <Input
          placeholder='메시지 보내기'
          placeholderTextColor={Colors.gray.v500}
          selectionColor={Colors.black}
          value={store.text}
          onChangeText={store.setText.bind(store)}
          onSubmitEditing={send}
          returnKeyType='send'
          blurOnSubmit={false}
        />
        <ChatSendButton onPress={send}>
          <ChatSendSvg />
        </ChatSendButton>
      </InputContainer>
    </TopWrapper>
  )
})

const TopWrapper = styled(Row)`
  padding: 6px 16px;
  margin-bottom: 12px;
`

const InputContainer = styled(Row)`
  flex: 1;
  border-radius: 22px;
  background-color: ${Colors.gray.v100};
`

const Input = styled(TextInput)`
  font-family: ${DEFAULT_FONT_FAMILY};
  color: ${Colors.gray.v600};
  font-size: 16px;
  padding: 0 0 0 16px;
  margin: 0;
  flex: 1;
`

const ChatSendButton = styled(TouchableOpacity)`
  padding: 8px;
`
