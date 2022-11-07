import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useChats } from 'api/reads'
import { Chat } from 'infra/types'
import { H1 } from 'ui/common/text'
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from 'stream-chat-react-native'

export const ChatScreen = () => {
  const { data } = useChats()
  const [channel, setChannel] = useState()
  return (
    <ScrollView style={{ flex: 1 }}>
      <ChannelList onSelect={(c) => setChannel(c)} />
      {data && (
        <>
          {data.map((x) => (
            <ChatItem key={x.channel.id} data={x} />
          ))}
          {/*<Channel channel={channel}>*/}
          {/*  <MessageList />*/}
          {/*  <MessageInput />*/}
          {/*</Channel>*/}
        </>
      )}
    </ScrollView>
  )
}

const ChatItem: React.FC<{
  data: Chat
}> = ({ data }) => {
  return (
    <TouchableOpacity>
      <H1>{data.channel.id}</H1>
    </TouchableOpacity>
  )
}
