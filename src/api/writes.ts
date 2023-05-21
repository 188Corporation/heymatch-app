import { ApiError } from 'api/error'
import {
  deleteRequest,
  postFormRequest,
  postRequest,
  putFormRequest,
  putRequest,
} from 'api/fetcher'
import {
  FemaleBodyForm,
  Gender,
  GpsLocation,
  GroupDetail_regacy,
  JobTitle,
  MaleBodyForm,
  OrganizationType,
  ResponseEnvelope,
  User,
} from 'infra/types'
import { gpsLocationToGeoinfo } from 'infra/util'
import { Platform } from 'react-native'

export const getCodeByPhone = async (phone: string) => {
  const res: ResponseEnvelope<{ session_token: string }> = await postRequest(
    '/auth/phone/get-code/',
    { phone_number: phone },
  )
  if (res.code !== 200) throw new ApiError(res)
  return res.data?.session_token as string
}

export const authorizePhoneNumber = async (
  phone: string,
  code: string,
  token: string,
) => {
  const res: ResponseEnvelope<{
    // valid for 6 months
    access_token: string
    user: User
    // not used for now
    refresh_token: string
  }> = await postRequest('/auth/phone/authorize/', {
    phone_number: phone,
    security_code: code,
    session_token: token,
  })
  if (res.code === 400)
    throw new ApiError({ ...res, message: '번호를 확인해주세요!' })
  if (res.code !== 200) throw new ApiError(res)
  return res.data!
}

export const getCodeByEmail = async (email: string, type: OrganizationType) => {
  const res: ResponseEnvelope<{
    type: OrganizationType
    names: string[]
  }> = await postRequest('/auth/email/get-code/', {
    email,
    type,
  })
  if (res.code !== 200) throw new ApiError(res)
  return res.data!
}

export const authorizeEmail = async (
  email: string,
  code: string,
  type: OrganizationType,
  selected_name: string,
) => {
  const res: ResponseEnvelope<{}> = await postRequest(
    '/auth/email/authorize/',
    {
      email,
      code,
      type,
      selected_name,
    },
  )
  if (res.code === 400)
    throw new ApiError({ ...res, message: '이메일을 확인해주세요!' })
  if (res.code !== 200) throw new ApiError(res)
  return res.data!
}

export const createGroup_regacy = async (
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
  const res: ResponseEnvelope<GroupDetail_regacy> = await postFormRequest(
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
  return res.data as GroupDetail_regacy
}

export const createGroup = async (
  title: string,
  introduction: string,
  gps_point: string,
  meetup_date: string,
  member_number: number,
  member_avg_age: number,
  meetup_place_title: string,
  meetup_place_address: string,
) => {
  const res: ResponseEnvelope<{}> = await postRequest('/groups/', {
    title,
    introduction,
    gps_point,
    meetup_date,
    member_number,
    member_avg_age,
    meetup_place_title,
    meetup_place_address,
  })
  if (res.code !== 201) throw new ApiError(res)
}

export const editGroup = async (
  id: string,
  title: string,
  introduction: string,
  gps_point: string,
  meetup_date: string,
  member_number: number,
  member_avg_age: number,
  meetup_place_title: string,
  meetup_place_address: string,
) => {
  const res: ResponseEnvelope<{}> = await putRequest(`/groups/${id}/`, {
    title,
    introduction,
    gps_point,
    meetup_date,
    member_number,
    member_avg_age,
    meetup_place_title,
    meetup_place_address,
  })
  if (res.code !== 200) throw new ApiError(res)
}

export const editGroup_regacy = async (
  groupId: number,
  title: string,
  introduction: string,
  location: GpsLocation,
) => {
  const res: ResponseEnvelope<{}> = await putRequest(`/groups/${groupId}/`, {
    title,
    introduction,
    gps_geoinfo: gpsLocationToGeoinfo(location),
  })
  if (res.code !== 200) throw new ApiError(res)
}

export const deleteGroup = async (groupId: number) => {
  const res: ResponseEnvelope<{}> = await deleteRequest(`/groups/${groupId}/`)
  if (res.code !== 200) throw new ApiError(res)
}

export const sendReceipt = async (receipt: string) => {
  const res: ResponseEnvelope<{}> = await postRequest('/payments/receipt/', {
    receipt,
    platform: Platform.OS,
  })
  if (res.code !== 200) throw new ApiError(res)
}

export const sendMatchRequest = async (groupId: number) => {
  const res: ResponseEnvelope<{}> = await postRequest('/match-requests/', {
    group_id: groupId,
  })
  if (res.code !== 200) throw new ApiError(res)
}

export const acceptMatchRequest = async (matchRequestId: number) => {
  const res: ResponseEnvelope<{}> = await postRequest(
    `/match-requests/${matchRequestId}/accept/`,
  )
  if (res.code !== 200) throw new ApiError(res)
  return res.data as {
    sender_group: GroupDetail_regacy
    stream_channel_cid: string
  }
}

export const rejectMatchRequest = async (matchRequestId: number) => {
  const res: ResponseEnvelope<{}> = await postRequest(
    `/match-requests/${matchRequestId}/reject/`,
  )
  if (res.code !== 200) throw new ApiError(res)
}

export const cancelMatchRequest = async (matchRequestId: number) => {
  const res: ResponseEnvelope<{}> = await postRequest(
    `/match-requests/${matchRequestId}/cancel/`,
  )
  if (res.code !== 200) throw new ApiError(res)
}

export const withdraw = async (reason: string) => {
  const res: ResponseEnvelope<{}> = await deleteRequest('/users/my/', {
    delete_reason: reason,
  })
  if (res.code !== 200) throw new ApiError(res)
}

export const reportAbuse = async (groupId: number) => {
  const res: ResponseEnvelope<{}> = await postRequest(
    `/groups/${groupId}/report/`,
    { report_reason: '' },
  )
  if (res.code !== 200) throw new ApiError(res)
}

export const deleteChat = async (chatId: string) => {
  const res: ResponseEnvelope<{}> = await deleteRequest(`/chats/${chatId}/`)
  if (res.code !== 200) throw new ApiError(res)
}

export const editUserInfo = async (
  gender: Gender,
  birthdate: string,
  main_profile_image: string,
  other_profile_image1?: string,
  other_profile_image2?: string,
  height_cm?: number | null,
  male_body_form?: MaleBodyForm | null,
  female_body_form?: FemaleBodyForm | null,
  job_title?: JobTitle | null,
) => {
  const form = new FormData()
  form.append('gender', gender)
  form.append('birthdate', birthdate)
  height_cm && form.append('height_cm', height_cm)
  male_body_form && form.append('male_body_form', male_body_form)
  female_body_form && form.append('female_body_form', female_body_form)
  job_title && form.append('job_title', job_title)
  form.append('main_profile_image', {
    uri: main_profile_image,
    type: 'image/jpeg',
    name: 'main_photo.jpg',
  })
  other_profile_image1 &&
    form.append('other_profile_image_1', {
      uri: other_profile_image1,
      type: 'image/jpeg',
      name: 'sub_photo1.jpg',
    })
  other_profile_image2 &&
    form.append('other_profile_image_2', {
      uri: other_profile_image2,
      type: 'image/jpeg',
      name: 'sub_photo2.jpg',
    })
  const res = await putFormRequest('/users/my/', form)
  if (res.code !== 200) throw new ApiError(res)
  return res.data
}
