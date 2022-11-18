import dayjs, { ConfigType } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('ko')
dayjs.extend(customParseFormat)

export const formatDate = (d: ConfigType) => dayjs(d).format('YYYY년 M월 D일')

export const formatDateTime = (d: ConfigType) =>
  dayjs(d).format('M월 D일 HH:mm')

export const parseDateHeaderDateString = (s: string) => {
  return dayjs(s.trim(), 'M월 D')
}
