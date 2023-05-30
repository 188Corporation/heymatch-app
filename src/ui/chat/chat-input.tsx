import { ChatSendSvg } from 'image'
import { Colors } from 'infra/colors'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import React, { useRef } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { useStores } from 'store/globals'
import { Channel as ChannelType } from 'stream-chat'
import styled from 'styled-components'
import { Row } from 'ui/common/layout'
import { DEFAULT_FONT_FAMILY } from 'ui/common/text'

class InputStore {
  text: string = ''
  constructor() {
    makeAutoObservable(this)
  }
  getText() {
    return this.text
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
  const text = store.getText()
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
        <ChatSendButton onPress={send} disabled={!text}>
          <ChatSendSvg />
        </ChatSendButton>
      </InputContainer>
    </TopWrapper>
  )
})

const TopWrapper = styled(Row)`
  margin-top: -24px;
  padding: 8px 16px;
  background-color: ${Colors.white};
`

const InputContainer = styled(Row)`
  flex: 1;
  border-radius: 24px;
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
