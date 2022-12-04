import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Body2, CaptionS, H3 } from 'ui/common/text'
import { Chat } from 'infra/types'
import { Avatar as _Avatar } from 'ui/common/avatar'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { START_CHAT_MESSAGE } from 'infra/messages'
import { formatRelative } from 'infra/datetime'

export const ChatItem: React.FC<{
  data: Chat
  onPress: () => void
  onLongPress: () => void
}> = ({ data, onPress, onLongPress }) => {
  const message = data.channel.last_message
  return (
    <Container onPress={onPress} onLongPress={onLongPress}>
      <Column>
        <Avatar
          side={64}
          source={{ uri: data.group.group_profile_images[0].thumbnail }}
        />
      </Column>
      <Right>
        <Upper>
          <TitleText>{data.group.title}</TitleText>
          {message && <TimeText>{formatRelative(message.sent_at)}</TimeText>}
        </Upper>
        <LastMessageText isRead={!!message && message.is_read}>
          {message?.content || START_CHAT_MESSAGE}
        </LastMessageText>
      </Right>
    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  padding: 16px 28px;
  flex-direction: row;
`

const Avatar = styled(_Avatar)`
  margin-right: 20px;
`

const Right = styled(Column)`
  flex: 1;
  justify-content: center;
`

const Upper = styled(Row)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

const TitleText = styled(H3).attrs({
  numberOfLines: 1,
})`
  flex-shrink: 1;
`

const TimeText = styled(CaptionS)`
  color: ${Colors.gray.v400};
  margin-left: 20px;
`

const LastMessageText = styled(Body2).attrs({
  numberOfLines: 1,
})<{
  isRead: boolean
}>`
  color: ${(p) => (p.isRead ? Colors.gray.v400 : Colors.primary.red)};
`
