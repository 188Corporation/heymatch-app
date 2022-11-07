import React from 'react'
import { TouchableOpacity } from 'react-native'
import { H1 } from 'ui/common/text'
import { Chat } from 'infra/types'

export const ChatItem: React.FC<{
  data: Chat
}> = ({ data }) => {
  return (
    <TouchableOpacity>
      <H1>{data.channel.id}</H1>
    </TouchableOpacity>
  )
}
