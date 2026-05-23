import clsx from "clsx"

import { categoryLabels } from "@/components/enrollment/courseCategoryMeta"
import type { Course, CourseCategory } from "@/types/course"

const categoryThumbnailStyles: Record<CourseCategory, string> = {
  development: "from-sky-100 via-cyan-50 to-emerald-100",
  design: "from-rose-100 via-orange-50 to-amber-100",
  marketing: "from-violet-100 via-fuchsia-50 to-rose-100",
  business: "from-slate-100 via-stone-50 to-emerald-100",
}

const getCapacityStatus = (course: Course) => {
  const enrollmentRate = course.currentEnrollment / course.maxCapacity

  if (course.currentEnrollment >= course.maxCapacity) {
    return {
      label: "마감",
      progressColor: "bg-red-500",
      badgeClassName: "bg-red-50 text-red-700 ring-red-200",
      isFull: true,
    }
  }

  if (enrollmentRate >= 0.8) {
    return {
      label: "마감 임박",
      progressColor: "bg-amber-500",
      badgeClassName: "bg-amber-50 text-amber-700 ring-amber-200",
      isFull: false,
    }
  }

  return {
    label: "신청 가능",
    progressColor: "bg-emerald-500",
    badgeClassName: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    isFull: false,
  }
}

interface CourseCardProps {
  course: Course
  isSelected: boolean
  onSelectCourse: (course: Course) => void
}

export const CourseCard = ({
  course,
  isSelected,
  onSelectCourse,
}: CourseCardProps) => {
  const capacityStatus = getCapacityStatus(course)
  const enrollmentRate = Math.min(
    (course.currentEnrollment / course.maxCapacity) * 100,
    100,
  )

  return (
    <button
      className={clsx(
        "group overflow-hidden rounded-lg border bg-white text-left shadow-sm transition",
        "hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        capacityStatus.isFull &&
          "cursor-not-allowed opacity-70 hover:translate-y-0 hover:border-slate-200 hover:shadow-sm",
        isSelected
          ? "border-emerald-500 ring-2 ring-emerald-100"
          : "border-slate-200",
      )}
      disabled={capacityStatus.isFull}
      onClick={() => onSelectCourse(course)}
      type="button"
    >
      <div
        className={clsx(
          "relative h-36 bg-gradient-to-br",
          categoryThumbnailStyles[course.category],
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_32%),radial-gradient(circle_at_75%_60%,rgba(15,23,42,0.12),transparent_28%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
            {categoryLabels[course.category]}
          </span>
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-semibold shadow-sm ring-1",
              capacityStatus.badgeClassName,
            )}
          >
            {capacityStatus.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-slate-950">
          {course.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        <dl className="mt-5 grid gap-3 text-sm text-slate-600">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-500">강사</dt>
            <dd className="font-semibold text-slate-800">
              {course.instructor}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-500">기간</dt>
            <dd className="font-semibold text-slate-800">
              {course.startDate} - {course.endDate}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-slate-500">정원</dt>
            <dd
              className={clsx(
                "font-semibold",
                capacityStatus.isFull ? "text-red-700" : "text-slate-800",
              )}
            >
              {course.currentEnrollment} / {course.maxCapacity}명
            </dd>
          </div>
        </dl>

        <div className="mt-3">
          <div className="h-1.5 rounded-full bg-slate-100">
            <div
              className={clsx("h-full rounded-full", capacityStatus.progressColor)}
              style={{
                width: `${enrollmentRate}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-lg font-bold text-slate-950">
            {course.price.toLocaleString()}원
          </span>
          <span
            className={clsx(
              "rounded-md px-3 py-2 text-sm font-semibold transition-colors",
              capacityStatus.isFull &&
                "cursor-not-allowed bg-slate-100 text-slate-500",
              isSelected
                ? "cursor-pointer bg-emerald-600 text-white"
                : !capacityStatus.isFull &&
                    "cursor-pointer bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100",
            )}
          >
            {capacityStatus.isFull
              ? "신청 마감"
              : isSelected
                ? "선택됨"
                : "신청하기"}
          </span>
        </div>
      </div>
    </button>
  )
}
