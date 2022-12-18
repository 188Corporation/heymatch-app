import { StreamChat } from 'stream-chat'
import {
  CURRENT_OS,
  OS,
  PUSH_PROVIDER,
  PUSH_PROVIDER_NAME,
  STREAM_CHAT_API_KEY,
} from 'infra/constants'
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
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import notifee, { Notification } from '@notifee/react-native'

export const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY)
const i18nInstance = new Streami18n({ language: 'ko' })

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission()
  const enabled = [
    messaging.AuthorizationStatus.AUTHORIZED,
    messaging.AuthorizationStatus.PROVISIONAL,
  ].includes(authStatus)
  if (!enabled) {
    // TODO: toast push notification permission guide
  }
}

const getAndroidChannelId = async () => {
  const channelId = 'chat-messages'
  const isCreated = await notifee.isChannelCreated(channelId)
  if (!isCreated) {
    await notifee.createChannel({ id: channelId, name: '채팅 메시지' })
  }
  return channelId
}

const getPushNotificationToken = async () => {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages()
  }
  return await messaging().getToken()
}

const handlePushMessage = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  // only handle `new message` signal from stream.io
  if (message?.data?.type !== 'message.new') return
  const res = await chatClient.getMessage(message.data.id)
  // console.log('message', res.message)
  const notification: Notification = {
    title: '새로운 메시지가 도착했어요!',
    body: res.message.text,
  }
  if (CURRENT_OS === OS.ANDROID) {
    notification.android = { channelId: await getAndroidChannelId() }
  }
  await notifee.displayNotification(notification)
}

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

// 너무 빨리 바뀌는 경우에 chatClient 가 정신을 못 차림
// 병렬적으로 진행되지 않고 순차적으로 진행되게 순서를 정해준다
let _sequencer: Promise<any> = Promise.resolve()
const sequence = (func: () => Promise<any>) => {
  _sequencer = _sequencer.then(() => func())
}

export const ChatProvider: React.FCC = observer(({ children }) => {
  const { authStore } = useStores()
  const { data } = useMy(authStore.isLoggedIn)
  const userId = data?.user?.id
  const userToken = data?.user?.stream_token

  // handle chat user connection
  useEffect(() => {
    console.log('chatClient: connect', userId, userToken)
    if (userId && userToken) {
      sequence(async () => {
        await chatClient.connectUser({ id: userId }, userToken)
        try {
          await chatClient.addDevice(
            await getPushNotificationToken(),
            PUSH_PROVIDER,
            userId,
            PUSH_PROVIDER_NAME,
          )
        } catch (e) {
          console.log('addDevice failed', e)
        }
      })
    } else {
      sequence(async () => {
        await chatClient.connectAnonymousUser()
        try {
          await chatClient.removeDevice(await getPushNotificationToken())
        } catch (e) {
          // do nothing
        }
      })
    }
    return () => {
      console.log('chatClient: disconnect')
      sequence(() => chatClient.disconnectUser())
    }
  }, [userId, userToken])

  // handle push notification
  useEffect(() => {
    requestPermission()
    return messaging().onMessage((message) => {
      console.log('[messaging] onMessage:', message)
      handlePushMessage(message)
    })
  }, [])

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
