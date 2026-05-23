export const formatPrice = (price: number): string =>
  `${price.toLocaleString()}원`

export const formatCoursePeriod = (startDate: string, endDate: string): string =>
  `${startDate} ~ ${endDate}`
