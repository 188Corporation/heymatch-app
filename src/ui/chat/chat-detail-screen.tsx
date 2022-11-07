import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Channel, MessageInput, MessageList } from 'stream-chat-react-native'
import { observer } from 'mobx-react'
import { useStores } from 'store/globals'
import { navigation } from 'navigation/global'
import styled from 'styled-components'
import { Column, Row } from 'ui/common/layout'
import { BackArrowBlackSvg } from 'image'
import { Avatar } from 'ui/common/avatar'
import { H3 } from 'ui/common/text'

export const ChatDetailScreen = observer(() => {
  const {
    chatStore: { channel, group },
  } = useStores()
  if (!channel || !group) {
    navigation.goBack()
    return null
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderContainer>
        <BackButton onPress={() => navigation.goBack()}>
          <BackArrowBlackSvg />
        </BackButton>
        <Avatar
          side={32}
          source={{ uri: group.group_profile_images[0].thumbnail }}
          style={{ marginRight: 8 }}
        />
        <TitleText>{group.title}</TitleText>
      </HeaderContainer>
      <Column style={{ flex: 1 }}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Column>
    </SafeAreaView>
  )
})

const HeaderContainer = styled(Row)`
  padding: 20px 28px 20px 20px;
  align-items: center;
`

const BackButton = styled(TouchableOpacity)`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const TitleText = styled(H3).attrs({
  numberOfLines: 1,
})`
  flex-shrink: 1;
`
