import { StreamChat } from 'stream-chat'
import { STREAM_CHAT_API_KEY } from 'infra/constants'

export const chatClient = StreamChat.getInstance(STREAM_CHAT_API_KEY)
