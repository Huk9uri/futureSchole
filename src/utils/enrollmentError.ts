import type { ErrorResponse } from "@/types/enrollment"

const ENROLLMENT_ERROR_MESSAGES: Record<string, string> = {
  COURSE_FULL: "강의 정원이 마감되었습니다. 다른 강의를 선택해 주세요.",
  DUPLICATE_ENROLLMENT: "이미 신청한 강의입니다. 신청 정보를 확인해 주세요.",
  INVALID_INPUT: "입력값을 다시 확인해 주세요.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
}

export const getEnrollmentErrorMessage = (
  errorResponse?: ErrorResponse,
): string => {
  if (!errorResponse) {
    return "수강 신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요."
  }

  return ENROLLMENT_ERROR_MESSAGES[errorResponse.code] ?? errorResponse.message
}

export const getEnrollmentErrorDetails = (
  errorResponse?: ErrorResponse,
): string[] | undefined => {
  if (!errorResponse?.details) {
    return undefined
  }

  return Object.values(errorResponse.details)
}
