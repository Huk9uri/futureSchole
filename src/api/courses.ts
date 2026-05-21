import { mockCourseCategories, mockCourses } from "@/mocks/courses"
import type {
  Course,
  CourseCategory,
  CourseListResponse,
} from "@/types/course"
import { delay } from "@/utils/delay"

const COURSE_API_DELAY_MS = 500

export const getCourses = async (
  category?: CourseCategory,
): Promise<CourseListResponse> => {
  await delay(COURSE_API_DELAY_MS)

  const courses = category
    ? mockCourses.filter((course) => course.category === category)
    : mockCourses

  return {
    courses,
    categories: mockCourseCategories,
  }
}

export const getCourseById = async (
  courseId: string,
): Promise<Course | undefined> => {
  await delay(COURSE_API_DELAY_MS)

  return mockCourses.find((course) => course.id === courseId)
}
