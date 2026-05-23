import type {
  EnrollmentFormData,
  EnrollmentFormValues,
} from "@/types/enrollment"

export const createEnrollmentPayload = (
  values: EnrollmentFormValues,
): EnrollmentFormData => {
  if (values.type === "personal") {
    return {
      courseId: values.courseId,
      type: "personal",
      applicant: values.applicant,
      agreedToTerms: values.agreedToTerms,
    }
  }

  return {
    courseId: values.courseId,
    type: "group",
    applicant: values.applicant,
    group: values.group,
    agreedToTerms: values.agreedToTerms,
  }
}
