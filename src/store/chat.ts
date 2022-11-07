import { makeAutoObservable, runInAction } from 'mobx'
import { Channel as ChannelType } from 'stream-chat'
import { chatClient } from 'infra/chat'
import { Chat } from 'infra/types'

export class ChatStore {
  currentChat: Chat | null = null
  _channelsInfo: ChannelType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get channel() {
    const chat = this.currentChat
    if (!chat) return
    return this._channelsInfo.find((x) => x.cid === chat.channel.cid)
  }

  get group() {
    return this.currentChat?.group
  }

  get isMessage() {
    return !!this.currentChat?.channel?.last_message
  }

  update(cIds: string[]) {
    chatClient.queryChannels({ cid: { $in: cIds } }).then((res) => {
      runInAction(() => {
        this._channelsInfo = res
      })
    })
  }

  setChat(chat: Chat) {
    this.currentChat = chat
  }
}
