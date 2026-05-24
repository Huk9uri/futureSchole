import { useState } from "react"

import { ErrorMessage } from "@/components/common/ErrorMessage"
import { Loading } from "@/components/common/Loading"
import { CourseCard } from "@/components/enrollment/CourseCard"
import { CourseCategoryFilter } from "@/components/enrollment/CourseCategoryFilter"
import { useCoursesQuery } from "@/hooks/queries/useCoursesQuery"
import type { Course, CourseCategory } from "@/types/course"

const COURSES_PER_PAGE = 6

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
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isError, isLoading } = useCoursesQuery(selectedCategory)

  const handleSelectCategory = (category?: CourseCategory) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleChangeAvailableOnly = (checked: boolean) => {
    setShowAvailableOnly(checked)
    setCurrentPage(1)
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE)
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE,
  )

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
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      <label className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
        <input
          checked={showAvailableOnly}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          onChange={(event) =>
            handleChangeAvailableOnly(event.target.checked)
          }
          type="checkbox"
        />
        <span>신청 가능한 강의만 보기</span>
      </label>

      {filteredCourses.length > 0 ? (
        <>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedCourses.map((course) => (
              <CourseCard
                course={course}
                isSelected={course.id === selectedCourseId}
                key={course.id}
                onSelectCourse={onSelectCourse}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="강의 목록 페이지네이션"
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
            >
              <button
                className="h-9 cursor-pointer rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => handleChangePage(Math.max(currentPage - 1, 1))}
                type="button"
              >
                이전
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1

                return (
                  <button
                    aria-current={currentPage === page ? "page" : undefined}
                    className={
                      currentPage === page
                        ? "h-9 min-w-9 cursor-pointer rounded-md bg-emerald-600 px-3 text-sm font-semibold text-white"
                        : "h-9 min-w-9 cursor-pointer rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    }
                    key={page}
                    onClick={() => handleChangePage(page)}
                    type="button"
                  >
                    {page}
                  </button>
                )
              })}

              <button
                className="h-9 cursor-pointer rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() =>
                  handleChangePage(Math.min(currentPage + 1, totalPages))
                }
                type="button"
              >
                다음
              </button>
            </nav>
          )}
        </>
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
