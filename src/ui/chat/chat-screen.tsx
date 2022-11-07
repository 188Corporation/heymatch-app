import React, { useEffect, useState } from 'react'
import { useChats } from 'api/reads'
import { Column, Row } from 'ui/common/layout'
import { Channel as ChannelType } from 'stream-chat'

import { chatClient } from 'infra/chat'
import { H1 } from 'ui/common/text'
import styled from 'styled-components'

export const ChatScreen = () => {
  const { data } = useChats()
  const [channels, setChannels] = useState<ChannelType[]>()
  useEffect(() => {
    if (data) {
      const cids = data.map((x) => x.channel.cid)
      chatClient.queryChannels({ cid: { $in: cids } }).then((res) => {
        setChannels(res)
      })
    }
  }, [data])
  return (
    <Column style={{ flex: 1 }}>
      <HeaderContainer>
        <H1>채팅</H1>
      </HeaderContainer>
      {/*// ) : (*/}
      {/*//   <ChannelList*/}
      {/*//     onSelect={(c) => {*/}
      {/*//       setChannel(c)*/}
      {/*//       console.log('hi', c)*/}
      {/*//     }}*/}
      {/*//   />*/}
      {/*// )}*/}
      {/*{data && (*/}
      {/*  <>*/}
      {/*    {data.map((x) => (*/}
      {/*      <ChatItem key={x.channel.id} data={x} />*/}
      {/*    ))}*/}
      {/*    /!*<Channel channel={channel}>*!/*/}
      {/*    /!*  <MessageList />*!/*/}
      {/*    /!*  <MessageInput />*!/*/}
      {/*    /!*</Channel>*!/*/}
      {/*  </>*/}
      {/*)}*/}
    </Column>
  )
}

const HeaderContainer = styled(Row)`
  padding: 28px;
`
