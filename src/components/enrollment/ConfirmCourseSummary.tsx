import type { Course } from "@/types/course"
import { formatCoursePeriod, formatPrice } from "@/utils/format"

interface ConfirmCourseSummaryProps {
  selectedCourse: Course
}

export const ConfirmCourseSummary = ({
  selectedCourse,
}: ConfirmCourseSummaryProps) => {
  return (
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
  )
}
