import dayjs from "dayjs"

export const formatPrice = (price: number): string =>
  `${price.toLocaleString()}원`

export const formatCoursePeriod = (startDate: string, endDate: string): string =>
  `${startDate} ~ ${endDate}`

export const formatDateTime = (dateTime: string): string =>
  dayjs(dateTime).format("YYYY.MM.DD HH:mm")
