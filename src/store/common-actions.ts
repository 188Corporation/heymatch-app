import { acceptMatchRequest, rejectMatchRequest } from 'api/writes'
import { navigation } from 'navigation/global'
import { AlertStore } from 'store/alert'
import { ChatStore } from 'store/chat'
import { mutate } from 'swr'

export const accept = async (
  matchRequestId: number,
  alertStore: AlertStore,
  chatStore: ChatStore,
) => {
  try {
    const res = await acceptMatchRequest(matchRequestId)
    await mutate('/match-requests/')
    alertStore.open({
      title: '매칭을 수락했어요!',
      mainButton: '채팅하기',
      onMainPress: async () => {
        await chatStore.update([res.stream_channel_cid])
        chatStore.setChat({
          group: res.sender_group,
          channel: { cid: res.stream_channel_cid },
        })
        navigation.navigate('ChatDetailScreen')
      },
    })
  } catch (e) {
    alertStore.error(e, '매칭 수락에 실패했어요!')
  }
}

export const reject = async (
  matchRequestId: number,
  alertStore: AlertStore,
) => {
  try {
    await rejectMatchRequest(matchRequestId)
    await mutate('/match-requests/')
    alertStore.open({ title: '매칭을 거절했어요!' })
  } catch (e) {
    alertStore.error(e, '매칭 거절에 실패했어요!')
  }
}
