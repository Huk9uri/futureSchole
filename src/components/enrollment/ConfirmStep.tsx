import { useFormContext } from "react-hook-form"

import type { Course } from "@/types/course"
import type { EnrollmentFormValues } from "@/types/enrollment"
import { formatCoursePeriod, formatPrice } from "@/utils/format"

interface ConfirmStepProps {
  selectedCourse: Course
}

export const ConfirmStep = ({ selectedCourse }: ConfirmStepProps) => {
  const { getValues } = useFormContext<EnrollmentFormValues>()
  const formValues = getValues()
  const isGroupEnrollment = formValues.type === "group"
  const totalPrice = isGroupEnrollment
    ? selectedCourse.price * formValues.group.headCount
    : selectedCourse.price

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
    </div>
  )
}
