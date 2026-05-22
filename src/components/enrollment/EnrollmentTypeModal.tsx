import clsx from "clsx"

import { Button } from "@/components/common/Button"
import type { EnrollmentType } from "@/types/enrollment"

interface EnrollmentTypeOption {
  icon: "person" | "group"
  label: string
  value: EnrollmentType
}

interface EnrollmentTypeModalProps {
  courseTitle?: string
  onClose: () => void
  onSelectType: (type: EnrollmentType) => void
}

const enrollmentTypeOptions: EnrollmentTypeOption[] = [
  {
    icon: "person",
    label: "개인 신청",
    value: "personal",
  },
  {
    icon: "group",
    label: "단체 신청",
    value: "group",
  },
]

const EnrollmentTypeIcon = ({ type }: { type: EnrollmentTypeOption["icon"] }) => {
  if (type === "person") {
    return (
      <svg
        aria-hidden="true"
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M5 20a7 7 0 0 1 14 0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M3.5 20a6.5 6.5 0 0 1 13 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M17 10.5a3 3 0 1 0 0-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18.5 18.5a5 5 0 0 0-2.5-4.33"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export const EnrollmentTypeModal = ({
  courseTitle,
  onClose,
  onSelectType,
}: EnrollmentTypeModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
          {courseTitle}
          </h2>
          {courseTitle && (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              신청 유형을 선택해주세요
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {enrollmentTypeOptions.map((option) => (
            <button
              className={clsx(
                "flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-center transition",
                "hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              )}
              key={option.value}
              onClick={() => onSelectType(option.value)}
              type="button"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <EnrollmentTypeIcon type={option.icon} />
              </span>
              <span className="text-base font-semibold text-slate-950">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="secondary">
            취소
          </Button>
        </div>
      </div>
    </div>
  )
}
