import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/common/Button"
import { ConfirmStep } from "@/components/enrollment/ConfirmStep"
import { CourseSelectStep } from "@/components/enrollment/CourseSelectStep"
import { EnrollmentTypeModal } from "@/components/enrollment/EnrollmentTypeModal"
import { StepIndicator } from "@/components/enrollment/StepIndicator"
import { StudentInfoStep } from "@/components/enrollment/StudentInfoStep"
import { enrollmentFormSchema } from "@/schemas/enrollmentSchema"
import type { Course } from "@/types/course"
import type { EnrollmentFormValues, EnrollmentType } from "@/types/enrollment"

const FIRST_STEP = 1
const LAST_STEP = 3

const createDefaultEnrollmentFormValues = (
  values?: Partial<Pick<EnrollmentFormValues, "courseId" | "type">>,
): EnrollmentFormValues => ({
  courseId: values?.courseId ?? "",
  type: values?.type ?? "personal",
  applicant: {
    name: "",
    email: "",
    phone: "",
    motivation: "",
  },
  agreedToTerms: false,
  group: {
    organizationName: "",
    headCount: 2,
    participants: [
      { name: "", email: "" },
      { name: "", email: "" },
    ],
    contactPerson: "",
  },
})

export const EnrollmentPage = () => {
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: createDefaultEnrollmentFormValues(),
  })
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
    form.reset(
      createDefaultEnrollmentFormValues({
        courseId: selectedCourse?.id ?? "",
        type,
      }),
    )
    setIsEnrollmentTypeModalOpen(false)
    setCurrentStep(2)
  }

  const handlePreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, FIRST_STEP))
  }

  const handleNextStep = async () => {
    if (currentStep === 2) {
      const fieldsToValidate =
        enrollmentType === "group"
          ? [
              "applicant.name",
              "applicant.email",
              "applicant.phone",
              "applicant.motivation",
              "agreedToTerms",
              "group.organizationName",
              "group.headCount",
              "group.contactPerson",
              "group.participants",
            ]
          : [
              "applicant.name",
              "applicant.email",
              "applicant.phone",
              "applicant.motivation",
              "agreedToTerms",
            ]

      const isValid = await form.trigger(fieldsToValidate as never)

      if (!isValid) {
        return
      }
    }

    setCurrentStep((step) => Math.min(step + 1, LAST_STEP))
  }

  const handleCompleteEnrollment = () => {
    form.reset(createDefaultEnrollmentFormValues())
    setSelectedCourse(undefined)
    setEnrollmentType(undefined)
    setIsEnrollmentTypeModalOpen(false)
    setCurrentStep(FIRST_STEP)
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

        <FormProvider {...form}>
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

            {currentStep === 3 && selectedCourse && (
              <ConfirmStep
                onComplete={handleCompleteEnrollment}
                selectedCourse={selectedCourse}
              />
            )}
          </section>
        </FormProvider>

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
