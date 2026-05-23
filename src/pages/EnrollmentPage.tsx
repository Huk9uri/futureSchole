import { useState } from "react"

import { Button } from "@/components/common/Button"
import { CourseSelectStep } from "@/components/enrollment/CourseSelectStep"
import { EnrollmentTypeModal } from "@/components/enrollment/EnrollmentTypeModal"
import { StepIndicator } from "@/components/enrollment/StepIndicator"
import { StudentInfoStep } from "@/components/enrollment/StudentInfoStep"
import type { Course } from "@/types/course"
import type { EnrollmentType } from "@/types/enrollment"

const FIRST_STEP = 1
const LAST_STEP = 3

export const EnrollmentPage = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_STEP)
  const [selectedCourse, setSelectedCourse] = useState<Course>()
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType>()
  const [isEnrollmentTypeModalOpen, setIsEnrollmentTypeModalOpen] =
    useState(false)

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course)
    setIsEnrollmentTypeModalOpen(true)
  }

  const handleSelectEnrollmentType = (type: EnrollmentType) => {
    setEnrollmentType(type)
    setIsEnrollmentTypeModalOpen(false)
    setCurrentStep(2)
  }

  const handlePreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, FIRST_STEP))
  }

  const handleNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, LAST_STEP))
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Future School Enrollment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            다단계 수강 신청 폼
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            강의를 선택하고 신청 정보를 입력한 뒤, 마지막 단계에서 신청
            내용을 확인합니다.
          </p>
        </header>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <StepIndicator currentStep={currentStep} />
        </div>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {currentStep === 1 && (
            <CourseSelectStep
              onSelectCourse={handleSelectCourse}
              selectedCourseId={selectedCourse?.id}
            />
          )}

          {currentStep === 2 && selectedCourse && enrollmentType && (
            <StudentInfoStep
              enrollmentType={enrollmentType}
              selectedCourse={selectedCourse}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">
                신청 내용 확인 및 제출
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                신청 내용 확인 단계는 다음 작업에서 구현합니다.
              </p>
            </div>
          )}
        </section>

        <div className="mt-6 flex justify-between">
          <Button
            disabled={currentStep === FIRST_STEP}
            onClick={handlePreviousStep}
            variant="secondary"
          >
            이전
          </Button>
          {currentStep > FIRST_STEP && currentStep < LAST_STEP && (
            <Button onClick={handleNextStep}>다음</Button>
          )}
        </div>
      </section>
      {isEnrollmentTypeModalOpen && (
        <EnrollmentTypeModal
          courseTitle={selectedCourse?.title}
          onClose={() => setIsEnrollmentTypeModalOpen(false)}
          onSelectType={handleSelectEnrollmentType}
        />
      )}
    </main>
  )
}
