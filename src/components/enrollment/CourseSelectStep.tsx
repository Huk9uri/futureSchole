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
  const { data, isError, isLoading } = useCoursesQuery(selectedCategory)

  if (isLoading) {
    return <Loading message="강의 목록을 불러오는 중입니다." />
  }

  if (isError || !data) {
    return (
      <ErrorMessage message="강의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." />
    )
  }

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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.courses.map((course) => (
          <CourseCard
            course={course}
            isSelected={course.id === selectedCourseId}
            key={course.id}
            onSelectCourse={onSelectCourse}
          />
        ))}
      </div>
    </div>
  )
}
