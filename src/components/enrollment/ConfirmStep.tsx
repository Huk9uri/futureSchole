import { useFormContext } from "react-hook-form"

import { Button } from "@/components/common/Button"
import { ErrorMessage } from "@/components/common/ErrorMessage"
import { useCreateEnrollmentMutation } from "@/hooks/mutations/useCreateEnrollmentMutation"
import type { Course } from "@/types/course"
import type { EnrollmentFormValues, ErrorResponse } from "@/types/enrollment"
import { getApiErrorResponse } from "@/utils/apiError"
import { createEnrollmentPayload } from "@/utils/enrollment"
import { formatCoursePeriod, formatPrice } from "@/utils/format"

interface ConfirmStepProps {
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

export const ConfirmStep = ({ selectedCourse }: ConfirmStepProps) => {
  const { getValues } = useFormContext<EnrollmentFormValues>()
  const createEnrollmentMutation = useCreateEnrollmentMutation()
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

    createEnrollmentMutation.mutate(payload)
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

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-base font-semibold text-slate-900">선택한 강의</h3>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">강의명</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {selectedCourse.title}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">강사</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {selectedCourse.instructor}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">기간</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {formatCoursePeriod(selectedCourse.startDate, selectedCourse.endDate)}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">수강료</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {formatPrice(selectedCourse.price)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-base font-semibold text-slate-900">신청 정보</h3>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">신청 유형</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {isGroupEnrollment ? "단체 신청" : "개인 신청"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">신청자</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {formValues.applicant.name}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">이메일</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {formValues.applicant.email}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">전화번호</dt>
            <dd className="mt-1 font-semibold text-slate-900">
              {formValues.applicant.phone}
            </dd>
          </div>
        </dl>

        {formValues.applicant.motivation && (
          <div className="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-900">수강 동기</p>
            <p className="mt-2">{formValues.applicant.motivation}</p>
          </div>
        )}
      </section>

      {isGroupEnrollment && (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-base font-semibold text-slate-900">단체 정보</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">단체명</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {formValues.group.organizationName}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">신청 인원 수</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {formValues.group.headCount}명
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">단체 담당자</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {formValues.group.contactPerson}
              </dd>
            </div>
          </dl>

          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-800">
              참가자 명단
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {formValues.group.participants.map((participant, index) => (
                <div
                  className="rounded-md border border-slate-200 bg-white p-4 text-sm"
                  key={`${participant.email}-${index}`}
                >
                  <p className="font-semibold text-slate-900">
                    참가자 {index + 1}
                  </p>
                  <p className="mt-2 text-slate-700">{participant.name}</p>
                  <p className="mt-1 text-slate-500">{participant.email}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-emerald-950">
              최종 신청 금액
            </h3>
            {isGroupEnrollment && (
              <p className="mt-1 text-sm text-emerald-700">
                {formatPrice(selectedCourse.price)} × {formValues.group.headCount}
                명
              </p>
            )}
          </div>
          <p className="text-2xl font-bold text-emerald-700">
            {formatPrice(totalPrice)}
          </p>
        </div>
      </section>

      {createEnrollmentMutation.isSuccess && createEnrollmentMutation.data && (
        <section className="rounded-lg border border-emerald-200 bg-white p-5">
          <h3 className="text-base font-semibold text-emerald-800">
            수강 신청이 완료되었습니다.
          </h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-slate-500">신청 번호</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {createEnrollmentMutation.data.enrollmentId}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">처리 상태</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {createEnrollmentMutation.data.status}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">접수 일시</dt>
              <dd className="mt-1 font-semibold text-slate-900">
                {createEnrollmentMutation.data.enrolledAt}
              </dd>
            </div>
          </dl>
        </section>
      )}

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
          신청 제출
        </Button>
      </div>
    </div>
  )
}
