import { useFormContext } from "react-hook-form"

import { Input } from "@/components/common/Input"
import type { EnrollmentFormValues } from "@/types/enrollment"

export const PersonalForm = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<EnrollmentFormValues>()

  return (
    <div className="space-y-5 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          개인 신청 정보
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          수강 신청에 필요한 신청자 정보를 입력해 주세요.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="personal-name"
          error={errors.applicant?.name?.message}
          label="이름"
          maxLength={20}
          placeholder="홍길동"
          {...register("applicant.name")}
        />
        <Input
          id="personal-email"
          error={errors.applicant?.email?.message}
          label="이메일"
          placeholder="name@example.com"
          type="email"
          {...register("applicant.email")}
        />
        <Input
          id="personal-phone"
          error={errors.applicant?.phone?.message}
          label="전화번호"
          maxLength={13}
          placeholder="010-1234-5678"
          type="tel"
          {...register("applicant.phone")}
        />
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor="personal-motivation"
        >
          수강 동기
        </label>
        <textarea
          className="min-h-32 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          id="personal-motivation"
          maxLength={300}
          placeholder="강의를 신청하는 이유를 입력해 주세요. (선택 사항, 최대 300자)"
          {...register("applicant.motivation")}
        />
        {errors.applicant?.motivation?.message && (
          <p className="text-sm text-red-600">
            {errors.applicant.motivation.message}
          </p>
        )}
      </div>
    </div>
  )
}
