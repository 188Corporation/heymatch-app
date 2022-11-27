import useSWRNative from '@nandorojo/swr-react-native'
import qs from 'query-string'
import {
  Chat,
  GroupDetail,
  HotPlace,
  HotPlaceWithGroups,
  MatchRequest,
  MyInfo,
  PurchaseItem,
  ResponseEnvelope,
} from 'infra/types'
import { getRequest } from 'api/fetcher'
import { PublicConfiguration } from 'swr/dist/types'

export const useCustomSWR = <T>(
  path: string | null,
  params?: Record<string, any>,
  config?: Partial<PublicConfiguration>,
) => {
  // should be cached with query params as a whole
  const wholePath =
    path === null ? null : `${path}${params ? `?${qs.stringify(params)}` : ''}`
  const { data: res, error } = useSWRNative<ResponseEnvelope<T>>(
    wholePath,
    getRequest,
    config,
  )
  return {
    data: res?.data,
    isLoading: !error && !res,
    isError: error,
  }
}

export const useMy = (isLoggedIn: boolean = true) =>
  useCustomSWR<MyInfo>(isLoggedIn ? '/users/my/' : null)

export const useHotPlaceList = () => useCustomSWR<HotPlace[]>('/hotplaces/')

export const useHotPlaceWithGroupsList = () =>
  useCustomSWR<HotPlaceWithGroups[]>('/groups/')

export const useGroup = (groupId?: number) =>
  useCustomSWR<GroupDetail>(groupId ? `/groups/${groupId}/` : null)

export const usePurchaseItems = () =>
  useCustomSWR<{
    point_items: PurchaseItem[]
    free_pass_items: PurchaseItem[]
  }>('/payments/items/')

export const useMatchRequests = () =>
  useCustomSWR<{
    sent: MatchRequest[]
    received: MatchRequest[]
  }>('/match-requests/', undefined, {
    revalidateOnFocus: false,
  })

export const useChats = () => useCustomSWR<Chat[]>('/chats/')
