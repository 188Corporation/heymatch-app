import { StreamChat } from 'stream-chat'
import { STREAM_CHAT_API_KEY } from 'infra/constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Chat, OverlayProvider } from 'stream-chat-react-native'
import React, { useEffect } from 'react'
import { useMy } from 'api/reads'
import { useStores } from 'store/globals'
import { observer } from 'mobx-react'

export const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY)

export const ChatProvider: React.FCC = observer(({ children }) => {
  const { authStore } = useStores()
  const { data } = useMy(authStore.isLoggedIn)
  const userId = data?.user?.id
  const streamToken = data?.user?.stream_token
  useEffect(() => {
    if (userId && streamToken) {
      console.log('chatClient: connect', userId, streamToken)
      chatClient.connectUser({ id: userId }, streamToken)
    } else {
      console.log('chatClient: disconnect')
      chatClient.disconnectUser()
    }
  }, [userId, streamToken])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={chatClient}>{children}</Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  )
})
