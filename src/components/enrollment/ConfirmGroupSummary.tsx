import type { EnrollmentFormValues } from "@/types/enrollment"

interface ConfirmGroupSummaryProps {
  group: EnrollmentFormValues["group"]
  onEdit: () => void
}

export const ConfirmGroupSummary = ({ group, onEdit }: ConfirmGroupSummaryProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900">단체 정보</h3>
        <button
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          onClick={onEdit}
          type="button"
        >
          수정
        </button>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">단체명</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {group.organizationName}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">신청 인원 수</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {group.headCount}명
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">단체 담당자</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {group.contactPerson}
          </dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-semibold text-slate-800">참가자 명단</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {group.participants.map((participant, index) => (
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
  )
}
