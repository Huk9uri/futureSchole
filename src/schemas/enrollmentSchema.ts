import { z } from "zod"

export const enrollmentFormSchema = z
  .object({
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
      .refine(
        (value) => value,
        "수강 신청 안내 및 개인정보 수집에 동의해 주세요.",
      ),
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
  .superRefine((data, context) => {
    if (data.type !== "group") {
      return
    }

    if (!data.group.organizationName.trim()) {
      context.addIssue({
        code: "custom",
        message: "단체명을 입력해 주세요.",
        path: ["group", "organizationName"],
      })
    }

    if (data.group.headCount < 2) {
      context.addIssue({
        code: "custom",
        message: "신청 인원 수는 2명 이상이어야 합니다.",
        path: ["group", "headCount"],
      })
    }

    if (!data.group.contactPerson.trim()) {
      context.addIssue({
        code: "custom",
        message: "단체 담당자명을 입력해 주세요.",
        path: ["group", "contactPerson"],
      })
    }

    if (data.group.participants.length !== data.group.headCount) {
      context.addIssue({
        code: "custom",
        message: "참가자 수가 신청 인원 수와 일치해야 합니다.",
        path: ["group", "participants"],
      })
    }

    const participantEmails = new Set<string>()

    data.group.participants.forEach((participant, index) => {
      if (!participant.name.trim()) {
        context.addIssue({
          code: "custom",
          message: "참가자 이름을 입력해 주세요.",
          path: ["group", "participants", index, "name"],
        })
      }

      if (!participant.email.trim()) {
        context.addIssue({
          code: "custom",
          message: "참가자 이메일을 입력해 주세요.",
          path: ["group", "participants", index, "email"],
        })

        return
      }

      const emailResult = z.email().safeParse(participant.email)

      if (!emailResult.success) {
        context.addIssue({
          code: "custom",
          message: "올바른 이메일 형식으로 입력해 주세요.",
          path: ["group", "participants", index, "email"],
        })

        return
      }

      if (participantEmails.has(participant.email)) {
        context.addIssue({
          code: "custom",
          message: "참가자 이메일은 중복될 수 없습니다.",
          path: ["group", "participants", index, "email"],
        })
      }

      participantEmails.add(participant.email)
    })
  })
