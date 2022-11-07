import React from 'react'
import { SafeAreaView } from 'react-native'
import { Channel, MessageInput, MessageList } from 'stream-chat-react-native'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { navigation } from 'navigation/global'

export const ChatDetailScreen = observer(() => {
  const {
    channelStore: { channel },
  } = useStores()
  if (!channel) {
    navigation.goBack()
    return null
  }
  return (
    <SafeAreaView>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  )
})
