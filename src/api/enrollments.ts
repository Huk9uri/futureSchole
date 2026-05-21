import type {
  EnrollmentFormData,
  EnrollmentResponse,
} from "@/types/enrollment"
import { delay } from "@/utils/delay"

const ENROLLMENT_API_DELAY_MS = 800

export const createEnrollment = async (
  data: EnrollmentFormData,
): Promise<EnrollmentResponse> => {
  void data

  await delay(ENROLLMENT_API_DELAY_MS)

  return {
    enrollmentId: crypto.randomUUID(),
    status: "confirmed",
    enrolledAt: new Date().toISOString(),
  }
}
