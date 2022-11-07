import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Body2, CaptionS, H3 } from 'ui/common/text'
import { Chat } from 'infra/types'
import { Avatar as _Avatar } from 'ui/common/avatar'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { Colors } from 'infra/colors'
import { useStores } from 'store/globals'
import { navigation } from 'navigation/global'

export const ChatItem: React.FC<{
  data: Chat
}> = ({ data }) => {
  const { chatStore } = useStores()
  return (
    <Container
      onPress={() => {
        chatStore.setChat(data)
        navigation.navigate('ChatDetailScreen')
      }}
    >
      <Column>
        <Avatar
          side={64}
          source={{ uri: data.group.group_profile_images[0].thumbnail }}
        />
      </Column>
      <Right>
        <Upper>
          <TitleText>{data.group.title}</TitleText>
          <TimeText>방금 전</TimeText>
        </Upper>
        <LastMessageText>
          {/*{JSON.stringify(data.channel.lastMessage)}*/}
        </LastMessageText>
      </Right>
    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  padding: 18px 28px;
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
})`
  color: ${Colors.primary.red};
`
