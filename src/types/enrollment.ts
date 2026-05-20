/** 수강 신청 유형 */
export type EnrollmentType = "personal" | "group"

export interface EnrollmentApplicant { // 개인, 그룹 공통 인터페이스
  name: string // 신청자 이름
  email: string // 신청자 이메일
  phone: string // 신청자 전화번호
  motivation?: string // 수강 동기
}

export interface PersonalEnrollmentRequest {
  courseId: string // 신청할 강의 고유 식별자
  type: "personal" // 개인 신청 유형
  applicant: EnrollmentApplicant // 신청자 정보
  agreedToTerms: boolean // 약관 동의 여부
}

export interface GroupParticipant { // 단체 참가자 개별 정보
  name: string // 참가자 이름
  email: string // 참가자 이메일
}

export interface GroupEnrollmentInfo { // 단체 신청 정보
    organizationName: string // 단체명
    headCount: number // 신청 인원 수
    participants: GroupParticipant[] // 참가자 명단
    contactPerson: string // 단체 담당자명
}

export interface GroupEnrollmentRequest {
  courseId: string // 신청할 강의 고유 식별자
  type: "group" // 단체 신청 유형
  applicant: EnrollmentApplicant // 신청자 정보
  group: GroupEnrollmentInfo // 단체 신청 정보
  agreedToTerms: boolean // 약관 동의 여부
}

export type EnrollmentFormData =
  | PersonalEnrollmentRequest
  | GroupEnrollmentRequest

export interface EnrollmentResponse {
  enrollmentId: string // 수강 신청 고유 식별자
  status: "confirmed" | "pending" // 수강 신청 처리 상태
  enrolledAt: string // 수강 신청 접수 일시
}

export type EnrollmentErrorCode =
  | "COURSE_FULL" // 강의 정원 초과
  | "DUPLICATE_ENROLLMENT" // 이미 신청된 강의
  | "INVALID_INPUT" // 입력 값 오류
  | "UNKNOWN_ERROR" // 알 수 없는 에러

export interface ErrorResponse {
  code: string // API 에러 코드
  message: string // 사용자에게 표시할 에러 메시지
  details?: Record<string, string> // 필드별 에러 메시지
}
