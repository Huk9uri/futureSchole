import type {
  EnrollmentErrorCode,
  EnrollmentFormData,
  EnrollmentResponse,
  ErrorResponse,
} from "@/types/enrollment"
import { mockCourses } from "@/mocks/courses"
import { delay } from "@/utils/delay"

const ENROLLMENT_API_DELAY_MS = 800
const UNKNOWN_ERROR_EMAIL_KEYWORD = "unknown-error"

const submittedEnrollmentKeys = new Set<string>()

type EnrollmentApiError = Error & {
  response: {
    data: ErrorResponse
  }
}

const createEnrollmentError = (
  code: EnrollmentErrorCode,
  message: string,
  details?: Record<string, string>,
): EnrollmentApiError => {
  const error = new Error(message) as EnrollmentApiError

  error.response = {
    data: {
      code,
      message,
      details,
    },
  }

  return error
}

const getEnrollmentKey = (data: EnrollmentFormData) =>
  `${data.courseId}:${data.applicant.email.trim().toLowerCase()}`

const validateEnrollmentInput = (data: EnrollmentFormData) => {
  const details: Record<string, string> = {}

  if (!data.courseId) {
    details.courseId = "신청할 강의를 선택해 주세요."
  }

  if (!data.applicant.name.trim()) {
    details["applicant.name"] = "신청자 이름을 입력해 주세요."
  }

  if (!data.applicant.email.trim()) {
    details["applicant.email"] = "신청자 이메일을 입력해 주세요."
  }

  if (!data.agreedToTerms) {
    details.agreedToTerms = "약관에 동의해 주세요."
  }

  if (data.type === "group") {
    if (!data.group.organizationName.trim()) {
      details["group.organizationName"] = "단체명을 입력해 주세요."
    }

    if (data.group.headCount < 2) {
      details["group.headCount"] = "단체 신청 인원은 2명 이상이어야 합니다."
    }

    if (data.group.participants.length !== data.group.headCount) {
      details["group.participants"] =
        "참가자 수가 신청 인원과 일치하지 않습니다."
    }
  }

  if (Object.keys(details).length > 0) {
    throw createEnrollmentError(
      "INVALID_INPUT",
      "입력값을 다시 확인해 주세요.",
      details,
    )
  }
}

export const createEnrollment = async (
  data: EnrollmentFormData,
): Promise<EnrollmentResponse> => {
  await delay(ENROLLMENT_API_DELAY_MS)

  validateEnrollmentInput(data)

  const course = mockCourses.find((course) => course.id === data.courseId)

  if (!course) {
    throw createEnrollmentError(
      "INVALID_INPUT",
      "존재하지 않는 강의입니다.",
      {
        courseId: "선택한 강의를 찾을 수 없습니다.",
      },
    )
  }

  if (course.currentEnrollment >= course.maxCapacity) {
    throw createEnrollmentError(
      "COURSE_FULL",
      "강의 정원이 마감되었습니다.",
      {
        courseId: "다른 강의를 선택해 주세요.",
      },
    )
  }

  const enrollmentKey = getEnrollmentKey(data)

  if (submittedEnrollmentKeys.has(enrollmentKey)) {
    throw createEnrollmentError(
      "DUPLICATE_ENROLLMENT",
      "이미 신청한 강의입니다.",
      {
        "applicant.email": "같은 이메일로 이미 신청된 내역이 있습니다.",
      },
    )
  }

  if (data.applicant.email.includes(UNKNOWN_ERROR_EMAIL_KEYWORD)) {
    throw createEnrollmentError(
      "UNKNOWN_ERROR",
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    )
  }

  submittedEnrollmentKeys.add(enrollmentKey)

  return {
    enrollmentId: crypto.randomUUID(),
    status: "confirmed",
    enrolledAt: new Date().toISOString(),
  }
}
