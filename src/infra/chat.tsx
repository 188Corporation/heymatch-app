import { StreamChat } from 'stream-chat'
import { STREAM_CHAT_API_KEY } from 'infra/constants'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  Chat,
  DeepPartial,
  MessageActionListItem,
  OverlayProvider,
  Streami18n,
  Theme,
} from 'stream-chat-react-native'
import React, { useEffect } from 'react'
import { useMy } from 'api/reads'
import { useStores } from 'store/globals'
import { observer } from 'mobx-react'
import { DEFAULT_FONT_FAMILY } from 'ui/common/text'
import { Colors } from 'infra/colors'
import {
  ActionType,
  MessageActionListItemProps,
} from 'stream-chat-react-native-core/src/components/MessageOverlay/MessageActionListItem'

export const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY)
const i18nInstance = new Streami18n({ language: 'ko' })

const chatStyle: DeepPartial<Theme> = {
  messageSimple: {
    content: {
      markdown: {
        text: {
          fontSize: 16,
          fontFamily: DEFAULT_FONT_FAMILY,
          color: Colors.gray.v600,
        },
      },
      container: {
        borderWidth: 0,
        marginBottom: 4,
      },
      containerInner: {
        borderWidth: 0,
      },
      deletedContainerInner: {
        borderWidth: 0,
      },
      textContainer: {
        backgroundColor: Colors.gray.v100,
        borderWidth: 0,
        padding: 4,
      },
    },
  },
  messageList: {
    container: {
      backgroundColor: 'transparent',
    },
  },
}

export const myMessageStyle: DeepPartial<Theme> = {
  messageSimple: {
    content: {
      markdown: {
        text: { color: Colors.white },
      },
      textContainer: {
        backgroundColor: Colors.primary.blue,
      },
    },
  },
}

const WHITELISTED_ACTION_TYPES: ActionType[] = [
  'selectReaction',
  'copyMessage',
  'pinMessage',
  'unpinMessage',
  'flagMessage',
]

const CustomMessageActionListItem: React.ComponentType<
  MessageActionListItemProps
> = ({ action, actionType, ...rest }) => {
  // hide if not whitelisted
  if (!WHITELISTED_ACTION_TYPES.includes(actionType)) return null
  return (
    <MessageActionListItem action={action} actionType={actionType} {...rest} />
  )
}

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
      <OverlayProvider
        i18nInstance={i18nInstance}
        MessageActionListItem={CustomMessageActionListItem}
      >
        <Chat client={chatClient} i18nInstance={i18nInstance} style={chatStyle}>
          {children}
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  )
})
