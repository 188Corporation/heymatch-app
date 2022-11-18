import React, { useEffect } from 'react'
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

export const ChatScreen = () => {
  const { chatStore } = useStores()
  const { data } = useChats()
  useEffect(() => {
    if (!data) return
    chatStore.update(data.map((x) => x.channel.cid))
  }, [data, chatStore])
  return (
    <Column style={{ flex: 1 }}>
      <HeaderContainer>
        <H1>채팅</H1>
      </HeaderContainer>
      {data && data.length > 0 ? (
        <FlatList<Chat>
          keyExtractor={(x) => x.channel.cid}
          data={data}
          renderItem={(x) => <ChatItem data={x.item} />}
        />
      ) : (
        <ScreenPlaceholder
          image={<ChatPlaceholderSvg />}
          text1='채팅이 비어있어요'
          text2='매칭에 성공하면 채팅이 열려요 😊'
        />
      )}
    </Column>
  )
}

const HeaderContainer = styled(Row)`
  padding: 28px 28px 16px 28px;
`
