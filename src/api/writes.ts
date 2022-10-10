import { postFormRequest, postRequest } from 'api/fetcher'
import { GpsLocation, GroupDetail, ResponseEnvelope, User } from 'infra/types'
import { ApiError } from 'api/error'
import { gpsLocationToGeoinfo } from 'infra/util'

export const getCodeByPhone = async (phone: string) => {
  const res: ResponseEnvelope<{ session_token: string }> = await postRequest(
    '/auth/phone/get-code/',
    { phone_number: phone },
  )
  if (res.code !== 200) throw new ApiError(res)
  return res.data?.session_token as string
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
  if (res.code === 400)
    throw new ApiError({ ...res, message: '번호를 확인해주세요!' })
  if (res.code !== 200) throw new ApiError(res)
  return res.data?.access_token as string
}

export const createGroup = async (
  photo: string,
  maleCount: number,
  femaleCount: number,
  averageAge: number,
  title: string,
  intro: string,
  location: GpsLocation,
) => {
  const form = new FormData()
  form.append('gps_geoinfo', gpsLocationToGeoinfo(location))
  form.append('male_member_number', maleCount)
  form.append('female_member_number', femaleCount)
  form.append('member_average_age', averageAge)
  form.append('title', title)
  form.append('introduction', intro)
  form.append('group_profile_images', {
    uri: photo,
    type: 'image/jpeg',
    name: 'photo.jpg',
  })
  const res: ResponseEnvelope<GroupDetail> = await postFormRequest(
    '/groups/',
    form,
  )
  if (res.code === 400)
    throw new ApiError({
      ...res,
      message: '현재 위치가 핫플 내에 있지 않아요!',
    })
  if (res.code === 403)
    throw new ApiError({ ...res, message: '이미 그룹을 생성했어요!' })
  if (res.code !== 201) throw new ApiError(res)
  return res.data as GroupDetail
}
