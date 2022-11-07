import { makeAutoObservable } from 'mobx'
import { Channel as ChannelType } from 'stream-chat'

export class ChannelStore {
  channel: ChannelType | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setChannel(c: ChannelType) {
    this.channel = c
  }
}
