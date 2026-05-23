import { useEffect } from "react"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"

import { Input } from "@/components/common/Input"
import type { EnrollmentFormValues } from "@/types/enrollment"

const MIN_GROUP_HEAD_COUNT = 2
const MAX_GROUP_HEAD_COUNT = 10

export const GroupForm = () => {
  const {
    control,
    formState: { errors },
    register,
    setValue,
  } = useFormContext<EnrollmentFormValues>()
  const headCount = useWatch({
    control,
    name: "group.headCount",
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "group.participants",
  })

  useEffect(() => {
    const nextHeadCount = Math.min(
      Math.max(Number(headCount) || 0, MIN_GROUP_HEAD_COUNT),
      MAX_GROUP_HEAD_COUNT,
    )

    if (fields.length < nextHeadCount) {
      Array.from({ length: nextHeadCount - fields.length }).forEach(() => {
        append({ name: "", email: "" })
      })
    }

    if (fields.length > nextHeadCount) {
      Array.from({ length: fields.length - nextHeadCount }).forEach(() => {
        remove(fields.length - 1)
      })
    }
  }, [append, fields.length, headCount, remove])

  return (
    <div className="space-y-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          단체 신청 정보
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          단체 정보와 참가자 명단을 입력해 주세요.
        </p>
      </div>

      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800">신청자 정보</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            error={errors.applicant?.name?.message}
            id="group-applicant-name"
            label="이름"
            maxLength={20}
            placeholder="홍길동"
            {...register("applicant.name")}
          />
          <Input
            error={errors.applicant?.email?.message}
            id="group-applicant-email"
            label="이메일"
            placeholder="name@example.com"
            type="email"
            {...register("applicant.email")}
          />
          <Input
            error={errors.applicant?.phone?.message}
            id="group-applicant-phone"
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
            htmlFor="group-applicant-motivation"
          >
            수강 동기
          </label>
          <textarea
            className="min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            id="group-applicant-motivation"
            maxLength={300}
            placeholder="강의를 신청하는 이유를 입력해 주세요."
            {...register("applicant.motivation")}
          />
          {errors.applicant?.motivation?.message && (
            <p className="text-sm text-red-600">
              {errors.applicant.motivation.message}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800">단체 정보</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            error={errors.group?.organizationName?.message}
            id="group-organization-name"
            label="단체명"
            placeholder="퓨처스콜레"
            {...register("group.organizationName")}
          />
          <Input
            error={errors.group?.headCount?.message}
            id="group-head-count"
            label="신청 인원 수"
            max={MAX_GROUP_HEAD_COUNT}
            min={MIN_GROUP_HEAD_COUNT}
            type="number"
            {...register("group.headCount", {
              setValueAs: (value) => Number(value),
              onBlur: (event) => {
                const value = Number(event.target.value)

                if (value < MIN_GROUP_HEAD_COUNT) {
                  setValue("group.headCount", MIN_GROUP_HEAD_COUNT)
                }

                if (value > MAX_GROUP_HEAD_COUNT) {
                  setValue("group.headCount", MAX_GROUP_HEAD_COUNT)
                }
              },
            })}
          />
          <Input
            error={errors.group?.contactPerson?.message}
            id="group-contact-person"
            label="단체 담당자명"
            placeholder="김담당"
            {...register("group.contactPerson")}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-800">참가자 명단</h4>
          <p className="mt-1 text-sm text-slate-600">
            신청 인원 수에 맞춰 참가자 정보를 입력해 주세요.
          </p>
        </div>

        <div className="space-y-3">
          {errors.group?.participants?.root?.message && (
            <p className="text-sm text-red-600">
              {errors.group.participants.root.message}
            </p>
          )}
          {fields.map((field, index) => (
            <div
              className="rounded-md border border-slate-200 bg-white p-4"
              key={field.id}
            >
              <p className="text-sm font-semibold text-slate-700">
                참가자 {index + 1}
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <Input
                  error={errors.group?.participants?.[index]?.name?.message}
                  id={`group-participant-${index}-name`}
                  label="이름"
                  maxLength={20}
                  placeholder="참가자 이름"
                  {...register(`group.participants.${index}.name`)}
                />
                <Input
                  error={errors.group?.participants?.[index]?.email?.message}
                  id={`group-participant-${index}-email`}
                  label="이메일"
                  placeholder="participant@example.com"
                  type="email"
                  {...register(`group.participants.${index}.email`)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
