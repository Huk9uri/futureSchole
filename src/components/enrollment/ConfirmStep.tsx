import { useState } from "react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/common/Button"
import { ErrorMessage } from "@/components/common/ErrorMessage"
import { ConfirmApplicantSummary } from "@/components/enrollment/ConfirmApplicantSummary"
import { ConfirmCourseSummary } from "@/components/enrollment/ConfirmCourseSummary"
import { ConfirmGroupSummary } from "@/components/enrollment/ConfirmGroupSummary"
import { ConfirmPriceSummary } from "@/components/enrollment/ConfirmPriceSummary"
import { EnrollmentSuccessModal } from "@/components/enrollment/EnrollmentSuccessModal"
import { useCreateEnrollmentMutation } from "@/hooks/mutations/useCreateEnrollmentMutation"
import type { Course } from "@/types/course"
import type { EnrollmentFormValues, ErrorResponse } from "@/types/enrollment"
import { getApiErrorResponse } from "@/utils/apiError"
import { createEnrollmentPayload } from "@/utils/enrollment"

interface ConfirmStepProps {
  onComplete: () => void
  selectedCourse: Course
}

const ENROLLMENT_ERROR_MESSAGES: Record<string, string> = {
  COURSE_FULL: "강의 정원이 마감되었습니다. 다른 강의를 선택해 주세요.",
  DUPLICATE_ENROLLMENT: "이미 신청한 강의입니다. 신청 정보를 확인해 주세요.",
  INVALID_INPUT: "입력값을 다시 확인해 주세요.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
}

const getEnrollmentErrorMessage = (errorResponse?: ErrorResponse) => {
  if (!errorResponse) {
    return "수강 신청 제출에 실패했습니다. 잠시 후 다시 시도해 주세요."
  }

  return ENROLLMENT_ERROR_MESSAGES[errorResponse.code] ?? errorResponse.message
}

export const ConfirmStep = ({ onComplete, selectedCourse }: ConfirmStepProps) => {
  const { getValues } = useFormContext<EnrollmentFormValues>()
  const createEnrollmentMutation = useCreateEnrollmentMutation()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const formValues = getValues()
  const isGroupEnrollment = formValues.type === "group"
  const totalPrice = isGroupEnrollment
    ? selectedCourse.price * formValues.group.headCount
    : selectedCourse.price
  const enrollmentErrorResponse = getApiErrorResponse(
    createEnrollmentMutation.error,
  )
  const enrollmentErrorMessage = getEnrollmentErrorMessage(enrollmentErrorResponse)
  const enrollmentErrorDetails = enrollmentErrorResponse?.details
    ? Object.values(enrollmentErrorResponse.details)
    : undefined

  const handleSubmitEnrollment = () => {
    const payload = createEnrollmentPayload(getValues())

    createEnrollmentMutation.mutate(payload, {
      onSuccess: () => {
        setIsSuccessModalOpen(true)
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          신청 내용 확인 및 제출
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          입력한 신청 내용을 확인한 뒤 제출해 주세요.
        </p>
      </div>

      <ConfirmCourseSummary selectedCourse={selectedCourse} />

      <ConfirmApplicantSummary
        applicant={formValues.applicant}
        isGroupEnrollment={isGroupEnrollment}
      />

      {isGroupEnrollment && (
        <ConfirmGroupSummary group={formValues.group} />
      )}

      <ConfirmPriceSummary
        headCount={formValues.group.headCount}
        isGroupEnrollment={isGroupEnrollment}
        price={selectedCourse.price}
        totalPrice={totalPrice}
      />

      {createEnrollmentMutation.isError && (
        <ErrorMessage
          details={enrollmentErrorDetails}
          message={enrollmentErrorMessage}
        />
      )}

      <div className="flex justify-end">
        <Button
          disabled={createEnrollmentMutation.isSuccess}
          isLoading={createEnrollmentMutation.isPending}
          onClick={handleSubmitEnrollment}
        >
          {createEnrollmentMutation.isSuccess ? "제출 완료" : "신청 제출"}
        </Button>
      </div>

      {isSuccessModalOpen && createEnrollmentMutation.data && (
        <EnrollmentSuccessModal
          enrollment={createEnrollmentMutation.data}
          onClose={onComplete}
        />
      )}
    </div>
  )
}
