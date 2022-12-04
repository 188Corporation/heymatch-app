import React, { useEffect, useState } from 'react'
import { useChats } from 'api/reads'
import { Column, Row } from 'ui/common/layout'
import { H1 } from 'ui/common/text'
import styled from 'styled-components'
import { FlatList } from 'react-native'
import { ChatItem } from 'ui/chat/chat-item'
import { Chat } from 'infra/types'
import { useStores } from 'store/globals'
import { ScreenPlaceholder } from 'ui/common/screen-placeholder'
import { ChatPlaceholderSvg } from 'image'
import { TopInsetSpace } from 'ui/common/inset-space'
import { navigation } from 'navigation/global'
import { deleteChat } from 'api/writes'
import { LoadingOverlay } from 'ui/common/loading-overlay'
import { mutate } from 'swr'

export const ChatScreen = () => {
  const { chatStore, alertStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useChats()
  useEffect(() => {
    if (!data) return
    chatStore.update(data.map((x) => x.channel.cid))
  }, [data, chatStore])
  const onChatPress = (chat: Chat) => {
    chatStore.setChat(chat)
    navigation.navigate('ChatDetailScreen')
  }
  const onChatLongPress = (chat: Chat) => {
    alertStore.open({
      title: '채팅을 삭제할까요?',
      body: '매칭된 그룹과의 채팅을 삭제하면\n더 이상 채팅을 할 수 없어요!',
      buttonText: '삭제하기',
      cancelText: '다음에',
      onPress: async () => {
        setIsLoading(true)
        try {
          await deleteChat(chat.channel.cid)
          await mutate('/chats/')
        } catch (e) {
          alertStore.error(e)
        } finally {
          setIsLoading(false)
        }
      },
    })
  }
  return (
    <Column style={{ flex: 1 }}>
      <TopInsetSpace />
      <HeaderContainer>
        <H1>채팅</H1>
      </HeaderContainer>
      <FlatList<Chat>
        contentContainerStyle={!data?.length ? { flex: 1 } : {}}
        keyExtractor={(x) => x.channel.cid}
        data={data}
        renderItem={(x) => {
          const chat = x.item
          return (
            <ChatItem
              data={chat}
              onPress={() => onChatPress(chat)}
              onLongPress={() => onChatLongPress(chat)}
            />
          )
        }}
        ListEmptyComponent={
          <ScreenPlaceholder
            image={<ChatPlaceholderSvg />}
            text1='주고 받은 채팅이 없어요'
            text2='매칭에 성공하면 채팅이 열려요 😊'
          />
        }
      />
      {isLoading && <LoadingOverlay />}
    </Column>
  )
}

const HeaderContainer = styled(Row)`
  padding: 28px 28px 16px 28px;
`
