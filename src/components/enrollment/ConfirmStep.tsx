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
import type { EnrollmentFormValues } from "@/types/enrollment"
import { getApiErrorResponse } from "@/utils/apiError"
import { createEnrollmentPayload } from "@/utils/enrollment"
import {
  getEnrollmentErrorDetails,
  getEnrollmentErrorMessage,
} from "@/utils/enrollmentError"

interface ConfirmStepProps {
  onComplete: () => void
  onEditEnrollmentInfo: () => void
  selectedCourse: Course
}

export const ConfirmStep = ({
  onComplete,
  onEditEnrollmentInfo,
  selectedCourse,
}: ConfirmStepProps) => {
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
  const enrollmentErrorDetails = getEnrollmentErrorDetails(enrollmentErrorResponse)

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
        onEdit={onEditEnrollmentInfo}
      />

      {isGroupEnrollment && (
        <ConfirmGroupSummary
          group={formValues.group}
          onEdit={onEditEnrollmentInfo}
        />
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
