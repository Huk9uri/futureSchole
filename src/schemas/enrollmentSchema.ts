import { z } from "zod"

const KOREAN_PHONE_REGEX = /^(01[016789]-?\d{3,4}-?\d{4}|0\d{1,2}-?\d{3,4}-?\d{4})$/
const NAME_REGEX = /^[가-힣a-zA-Z\s]+$/

export const enrollmentFormSchema = z
  .object({
    courseId: z.string().min(1, "강의를 선택해 주세요."),
    type: z.enum(["personal", "group"]),
    applicant: z.object({
      name: z
        .string()
        .trim()
        .min(2, "이름은 2자 이상 입력해 주세요.")
        .max(20, "이름은 20자 이하로 입력해 주세요.")
        .regex(NAME_REGEX, "이름은 한글 또는 영문으로 입력해 주세요."),
      email: z
        .string()
        .trim()
        .min(1, "이메일을 입력해 주세요.")
        .email("올바른 이메일 형식으로 입력해 주세요."),
      phone: z
        .string()
        .trim()
        .min(1, "전화번호를 입력해 주세요.")
        .regex(
          KOREAN_PHONE_REGEX,
          "한국 전화번호 형식으로 입력해 주세요. 예: 010-1234-5678",
        ),
      motivation: z
        .string()
        .max(300, "수강 동기는 300자 이하로 입력해 주세요."),
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

    if (data.group.headCount < 2 || data.group.headCount > 10) {
      context.addIssue({
        code: "custom",
        message: "신청 인원 수는 2명 이상 10명 이하로 입력해 주세요.",
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
      const participantName = participant.name.trim()

      if (!participantName) {
        context.addIssue({
          code: "custom",
          message: "참가자 이름을 입력해 주세요.",
          path: ["group", "participants", index, "name"],
        })
      }

      if (participantName && participantName.length < 2) {
        context.addIssue({
          code: "custom",
          message: "참가자 이름은 2자 이상 입력해 주세요.",
          path: ["group", "participants", index, "name"],
        })
      }

      if (participantName.length > 20) {
        context.addIssue({
          code: "custom",
          message: "참가자 이름은 20자 이하로 입력해 주세요.",
          path: ["group", "participants", index, "name"],
        })
      }

      if (participantName && !NAME_REGEX.test(participantName)) {
        context.addIssue({
          code: "custom",
          message: "참가자 이름은 한글 또는 영문으로 입력해 주세요.",
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
