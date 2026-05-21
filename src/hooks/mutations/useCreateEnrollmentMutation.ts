import { useMutation } from "@tanstack/react-query"

import { createEnrollment } from "@/api/enrollments"

export const useCreateEnrollmentMutation = () => {
  return useMutation({
    mutationFn: createEnrollment,
  })
}
