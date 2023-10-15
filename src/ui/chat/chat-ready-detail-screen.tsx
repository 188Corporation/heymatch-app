import { useChats } from 'api/reads'
import { navigation } from 'navigation/global'
import { ChatReadyDetailScreenProps } from 'navigation/types'
import React, { useEffect } from 'react'
import { useStores } from 'store/globals'
import { LoadingOverlay } from 'ui/common/loading-overlay'

export const ChatReadyDetailScreen: React.FC<ChatReadyDetailScreenProps> = (
  props,
) => {
  const { cid } = props.route.params
  const { data } = useChats()
  const { chatStore } = useStores()
  useEffect(() => {
    if (!data) return
    const chat = data.find((_) => _.channel.cid === cid)
    if (!chat) return
    chatStore.setChat(chat)
    navigation.navigate('ChatScreen')
    navigation.navigate('ChatDetailScreen')
  }, [chatStore, cid, data])

  return (
    <>
      <LoadingOverlay />
    </>
  )
}
