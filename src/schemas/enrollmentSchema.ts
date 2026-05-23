import { z } from "zod"

export const enrollmentFormSchema = z.object({
  courseId: z.string().min(1, "강의를 선택해 주세요."),
  type: z.enum(["personal", "group"]),
  applicant: z.object({
    name: z.string().min(1, "이름을 입력해 주세요."),
    email: z
      .string()
      .min(1, "이메일을 입력해 주세요.")
      .email("올바른 이메일 형식으로 입력해 주세요."),
    phone: z.string().min(1, "전화번호를 입력해 주세요."),
    motivation: z
      .string()
      .min(10, "수강 동기는 10자 이상 입력해 주세요."),
  }),
  agreedToTerms: z
    .boolean()
    .refine((value) => value, "수강 신청 안내 및 개인정보 수집에 동의해 주세요."),
  group: z.object({
    organizationName: z.string(),
    headCount: z.number(),
    participants: z.array(
      z.object({
        name: z.string(),
        email: z.string(),
      }),
    ),
    contactPerson: z.string(),
  }),
})
