import useSWRNative from '@nandorojo/swr-react-native'
import { getRequest } from 'api/fetcher'
import {
  Chat,
  GroupDetail,
  Groups_v2,
  HotPlace,
  MatchRequest,
  MyInfo,
  PurchaseItem,
  ResponseEnvelope,
} from 'infra/types'
import qs from 'query-string'
import { PublicConfiguration } from 'swr/dist/types'
import useSWRInfinite from 'swr/infinite'

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

// export const useHotPlaceWithGroupsList = () =>
//   useCustomSWR<HotPlaceWithGroups[]>('/groups/')

export const useGroupList = (filter?: string) =>
  useSWRInfinite<Groups_v2>(
    (pageIndex: number, previousPageData: Groups_v2) => {
      if (previousPageData && previousPageData.data.next === null) {
        return null
      }
      return `/groups/?page=${pageIndex + 1}${filter}`
    },
    getRequest,
  )

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
