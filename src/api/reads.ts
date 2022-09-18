import useSWR from 'swr'
import qs from 'query-string'
import { JoinedGroup, ResponseEnvelope, User } from 'infra/types'
import { getRequest } from 'api/fetcher'

export const useCustomSWR = <T>(
  path: string | null,
  params?: Record<string, any>,
) => {
  // should be cached with query params as a whole
  const wholePath =
    path === null ? null : `${path}${params ? `?${qs.stringify(params)}` : ''}`
  const { data: res, error } = useSWR<ResponseEnvelope<T>>(
    wholePath,
    getRequest,
  )
  return {
    data: res?.data,
    isLoading: !error && !res,
    isError: error,
  }
}

export const useUser = () =>
  useCustomSWR<{
    user: User
    joined_group: JoinedGroup
  }>('/users/my')
