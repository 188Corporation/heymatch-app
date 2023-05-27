import useSWRNative from '@nandorojo/swr-react-native'
import { chainJsonParser, getRequest } from 'api/fetcher'
import {
  Chat,
  Geocoding,
  GroupDetail,
  GroupsList,
  HotPlace,
  MatchRequest,
  MyInfo,
  PurchaseItem,
  ResponseEnvelope,
  SearchPlaceList,
  TopRankedAddress,
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

export const useGroupList = (filter?: string) => {
  const {
    data: res,
    error,
    size,
    setSize,
  } = useSWRInfinite<GroupsList>(
    (pageIndex: number, previousPageData: GroupsList) => {
      if (previousPageData && previousPageData.data.next === null) {
        return null
      }
      return `/groups/?page=${pageIndex + 1}${filter}`
    },
    getRequest,
  )
  return {
    data: res,
    isError: error,
    size,
    setSize,
  }
}

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

export const useTopRankedAddress = () =>
  useCustomSWR<TopRankedAddress>('/groups/top-ranked-address/')

export const useChats = () => useCustomSWR<Chat[]>('/chats/')

export const useSearchPlace = (query: string) => {
  const { data: res, error } = useSWRNative<SearchPlaceList>(
    `https://openapi.naver.com/v1/search/local.json?query=${query}&display=5`,
    (url: string) => {
      const CLIENT_ID = 'yTGgiqz_swvAiOWZN74G'
      const CLIENT_SECRET = 'eldIpeJeBI'
      const headers = new Headers()
      headers.append('X-Naver-Client-Id', CLIENT_ID)
      headers.append('X-Naver-Client-Secret', CLIENT_SECRET)
      const options = {
        method: 'GET',
        headers: headers,
      }
      return fetch(url, options).then(chainJsonParser)
    },
  )
  return {
    data: res,
    isLoading: !error && !res,
    isError: error,
  }
}

export const useGeocoding = (query: string) => {
  const { data: res, error } = useSWRNative<Geocoding>(
    `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
    (url: string) => {
      const CLIENT_ID = 'iuvp8u5i1b'
      const CLIENT_SECRET = 'hametJJlKEj8tCulH4TfStljsEF4IKyUJ4dqetMm'
      const headers = new Headers()
      headers.append('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
      headers.append('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
      const options = {
        method: 'GET',
        headers: headers,
      }
      return fetch(url, options).then(chainJsonParser)
    },
  )
  return {
    data: res,
    isLoading: !error && !res,
    isError: error,
  }
}
