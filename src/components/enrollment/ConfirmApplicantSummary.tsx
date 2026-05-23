import type { EnrollmentFormValues } from "@/types/enrollment"

interface ConfirmApplicantSummaryProps {
  applicant: EnrollmentFormValues["applicant"]
  isGroupEnrollment: boolean
}

export const ConfirmApplicantSummary = ({
  applicant,
  isGroupEnrollment,
}: ConfirmApplicantSummaryProps) => {
  return (
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
            {applicant.name}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">이메일</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {applicant.email}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">전화번호</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {applicant.phone}
          </dd>
        </div>
      </dl>

      {applicant.motivation && (
        <div className="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-slate-700">
          <p className="font-semibold text-slate-900">수강 동기</p>
          <p className="mt-2">{applicant.motivation}</p>
        </div>
      )}
    </section>
  )
}
