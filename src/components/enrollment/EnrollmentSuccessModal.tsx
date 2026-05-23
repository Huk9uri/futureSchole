import { Button } from "@/components/common/Button"
import type { EnrollmentResponse } from "@/types/enrollment"
import { formatDateTime } from "@/utils/format"

interface EnrollmentSuccessModalProps {
  enrollment: EnrollmentResponse
  onClose: () => void
}

const ENROLLMENT_STATUS_LABELS = {
  confirmed: "신청 확정",
  pending: "확인 대기",
} as const

export const EnrollmentSuccessModal = ({
  enrollment,
  onClose,
}: EnrollmentSuccessModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
      <section
        aria-labelledby="enrollment-success-title"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        role="dialog"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
            <span className="text-xl font-bold">✓</span>
          </div>

          <h3
            className="mt-4 text-lg font-semibold text-slate-950"
            id="enrollment-success-title"
          >
            수강 신청이 완료되었습니다.
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            신청 내역이 정상적으로 접수되었습니다.
          </p>
        </div>

        <dl className="mt-6 space-y-3 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">신청 번호</dt>
            <dd className="truncate font-semibold text-slate-900">
              {enrollment.enrollmentId}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">처리 상태</dt>
            <dd className="font-semibold text-emerald-700">
              {ENROLLMENT_STATUS_LABELS[enrollment.status]}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-slate-500">접수 일시</dt>
            <dd className="font-semibold text-slate-900">
              {formatDateTime(enrollment.enrolledAt)}
            </dd>
          </div>
        </dl>

        <Button className="mt-6 w-full" onClick={onClose}>
          확인
        </Button>
      </section>
    </div>
  )
}
