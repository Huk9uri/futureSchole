import { GroupForm } from "@/components/enrollment/GroupForm"
import { PersonalForm } from "@/components/enrollment/PersonalForm"
import type { Course } from "@/types/course"
import type { EnrollmentType } from "@/types/enrollment"

interface StudentInfoStepProps {
  enrollmentType: EnrollmentType
  selectedCourse: Course
}

export const StudentInfoStep = ({
  enrollmentType,
  selectedCourse,
}: StudentInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          수강 신청 정보 입력
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          신청 유형에 맞는 정보를 입력해 주세요.
        </p>
      </div>

      <div className="space-y-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
        <p>선택한 강의: {selectedCourse.title}</p>
        <p>
          신청 유형:{" "}
          {enrollmentType === "personal" ? "개인 신청" : "단체 신청"}
        </p>
      </div>

      {enrollmentType === "personal" ? <PersonalForm /> : <GroupForm />}
    </div>
  )
}
