import { useQuery } from "@tanstack/react-query"

import { getCourses } from "../../api/courses"
import type { CourseCategory } from "../../types/course"

export const useCoursesQuery = (category?: CourseCategory) => {
  return useQuery({
    queryKey: ["courses", category],
    queryFn: () => getCourses(category),
  })
}
