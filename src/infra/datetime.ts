import dayjs, { ConfigType } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('ko')
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)

export const formatDate = (d: ConfigType) => dayjs(d).format('YYYY년 M월 D일')

export const formatDateTime = (d: ConfigType) =>
  dayjs(d).format('M월 D일 HH:mm')

export const formatRelative = (d: ConfigType) => dayjs(d).fromNow()
