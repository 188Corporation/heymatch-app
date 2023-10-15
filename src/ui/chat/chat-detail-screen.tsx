import { useGroup } from 'api/reads'
import { BackArrowBlackSvg } from 'image'
import { myMessageStyle } from 'infra/chat'
import { Colors } from 'infra/colors'
import { formatDate } from 'infra/datetime'
import { START_CHAT_MESSAGE } from 'infra/messages'
import { observer } from 'mobx-react'
import { navigation } from 'navigation/global'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStores } from 'store/globals'
import { Channel, MessageList } from 'stream-chat-react-native'
import styled from 'styled-components'
import { ChatInput } from 'ui/chat/chat-input'
import { Avatar } from 'ui/common/avatar'
import { BottomInsetSpace, TopInsetSpace } from 'ui/common/inset-space'
import { KeyboardAvoidingView } from 'ui/common/keyboard-avoiding-view'
import { Column, Row } from 'ui/common/layout'
import { Caption, CaptionS, H3 } from 'ui/common/text'

export const ChatDetailScreen = observer(() => {
  const {
    chatStore: { channel, group, isMessage },
    alertStore,
  } = useStores()
  if (!channel || !group) {
    navigation.goBack()
    return null
  }
  const { data } = useGroup(group.id)

  const MessageAvatar = () => (
    <Avatar
      side={32}
      source={{
        uri: group.group_members[0].user.user_profile_images.find(
          (x) => x.is_main,
        )?.image,
      }}
      style={{ marginRight: 8 }}
    />
  )

  const handlePressAvatar = () => {
    if (!data) {
      alertStore.open({
        title: '삭제된 그룹입니다!',
        body: '상대방과의 대화는 계속 할 수 있어요.',
      })
      return
    }
    navigation.navigate('GroupDetailScreen', {
      id: group.id,
      hideButton: true,
    })
  }

  return (
    <KeyboardAvoidingView>
      <TopInsetSpace />
      <HeaderContainer>
        <BackButton onPress={() => navigation.navigate('ChatScreen')}>
          <BackArrowBlackSvg />
        </BackButton>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          onPress={handlePressAvatar}
        >
          <MessageAvatar />
          <TitleText>{group.title}</TitleText>
        </TouchableOpacity>
      </HeaderContainer>
      <Column style={{ flex: 1 }}>
        {!isMessage && (
          <FloatingTip>
            <Caption style={{ color: Colors.gray.v500 }}>
              {START_CHAT_MESSAGE}
            </Caption>
          </FloatingTip>
        )}
        <Channel
          channel={channel}
          MessageAvatar={MessageAvatar}
          DateHeader={() => null}
          InlineDateSeparator={({ date }) => {
            if (!date) return null
            return <DateHeader>{formatDate(date)}</DateHeader>
          }}
        >
          <MessageList myMessageTheme={myMessageStyle} />
          <ChatInput />
        </Channel>
      </Column>
      <BottomInsetSpace />
    </KeyboardAvoidingView>
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

const DateHeader = styled(CaptionS)`
  color: ${Colors.gray.v500};
  margin: 16px 0;
  text-align: center;
`

const FloatingTip = styled(Row)`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 12px;
  left: 28px;
  right: 28px;
  z-index: 1;
  border-radius: 8px;
  background-color: ${Colors.gray.v100};
  padding: 16px 0;
`
