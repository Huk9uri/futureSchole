import type { EnrollmentFormValues, EnrollmentType } from "@/types/enrollment"

const ENROLLMENT_DRAFT_STORAGE_KEY = "futureSchole:enrollmentDraft"

export interface EnrollmentDraft {
  currentStep: number
  enrollmentType?: EnrollmentType
  formValues: EnrollmentFormValues
  selectedCourseId?: string
}

export const getEnrollmentDraft = (): EnrollmentDraft | undefined => {
  if (typeof window === "undefined") {
    return undefined
  }

  const draft = window.localStorage.getItem(ENROLLMENT_DRAFT_STORAGE_KEY)

  if (!draft) {
    return undefined
  }

  try {
    return JSON.parse(draft) as EnrollmentDraft
  } catch {
    window.localStorage.removeItem(ENROLLMENT_DRAFT_STORAGE_KEY)
    return undefined
  }
}

export const saveEnrollmentDraft = (draft: EnrollmentDraft) => {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(
    ENROLLMENT_DRAFT_STORAGE_KEY,
    JSON.stringify(draft),
  )
}

export const removeEnrollmentDraft = () => {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(ENROLLMENT_DRAFT_STORAGE_KEY)
}
