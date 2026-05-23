import { useState } from "react"

import { ErrorMessage } from "@/components/common/ErrorMessage"
import { Loading } from "@/components/common/Loading"
import { CourseCard } from "@/components/enrollment/CourseCard"
import { CourseCategoryFilter } from "@/components/enrollment/CourseCategoryFilter"
import { useCoursesQuery } from "@/hooks/queries/useCoursesQuery"
import type { Course, CourseCategory } from "@/types/course"

interface CourseSelectStepProps {
  selectedCourseId?: string
  onSelectCourse: (course: Course) => void
}

export const CourseSelectStep = ({
  selectedCourseId,
  onSelectCourse,
}: CourseSelectStepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>()
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const { data, isError, isLoading } = useCoursesQuery(selectedCategory)

  if (isLoading) {
    return <Loading message="강의 목록을 불러오는 중입니다." />
  }

  if (isError || !data) {
    return (
      <ErrorMessage message="강의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." />
    )
  }

  const filteredCourses = showAvailableOnly
    ? data.courses.filter(
        (course) => course.currentEnrollment < course.maxCapacity,
      )
    : data.courses

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">강의 선택</h2>
        <p className="mt-2 text-sm text-slate-600">
          수강 신청할 강의를 하나 선택해 주세요.
        </p>
      </div>

      <CourseCategoryFilter
        categories={data.categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <label className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
        <input
          checked={showAvailableOnly}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          onChange={(event) => setShowAvailableOnly(event.target.checked)}
          type="checkbox"
        />
        <span>신청 가능한 강의만 보기</span>
      </label>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              course={course}
              isSelected={course.id === selectedCourseId}
              key={course.id}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
          <p className="text-sm font-semibold text-slate-800">
            조건에 맞는 강의가 없습니다.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            카테고리나 신청 가능 필터를 변경해 주세요.
          </p>
        </div>
      )}
    </div>
  )
}
