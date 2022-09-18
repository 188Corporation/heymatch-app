import { tokenManager, postRequest } from 'api/fetcher'
import { ResponseEnvelope, User } from 'infra/types'
import { ApiError } from 'api/error'

export const getCodeByPhone = async (phone: string) => {
  const res: ResponseEnvelope<{ session_token: string }> = await postRequest(
    '/auth/phone/get-code/',
    { phone_number: phone },
  )
  if (res.code !== 200) throw new ApiError(res)
  return { token: res.data?.session_token as string }
}

export const authorize = async (phone: string, code: string, token: string) => {
  const res: ResponseEnvelope<{
    // valid for 6 months
    access_token: string
    // not used for now
    refresh_token: string
    user: User
  }> = await postRequest('/auth/phone/authorize/', {
    phone_number: phone,
    security_code: code,
    session_token: token,
  })
  if (res.code !== 200) throw new ApiError(res)
  tokenManager.setToken(res.data?.access_token as string)
  // TODO: 응답 받아서 auth store 에서 관리
  //  데이터 저장 처리 필요
}
