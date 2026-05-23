import type { ErrorResponse } from "@/types/enrollment"

type ApiErrorLike = {
  response?: {
    data?: ErrorResponse
  }
}

const isApiErrorLike = (error: unknown): error is ApiErrorLike => {
  return typeof error === "object" && error !== null && "response" in error
}

export const getApiErrorResponse = (
  error: unknown,
): ErrorResponse | undefined => {
  if (!isApiErrorLike(error)) {
    return undefined
  }

  return error.response?.data
}
