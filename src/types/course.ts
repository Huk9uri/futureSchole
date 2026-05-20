export type CourseCategory =
  | "development"
  | "design"
  | "marketing"
  | "business"

export interface Course {
  id: string // 강의 고유 식별자
  title: string // 강의명
  description: string // 강의 소개 및 설명
  category: CourseCategory // 강의 카테고리
  price: number // 1인 기준 수강 가격
  maxCapacity: number // 최대 수강 가능 인원
  currentEnrollment: number // 현재 신청 인원
  startDate: string // 강의 시작일
  endDate: string // 강의 종료일
  instructor: string // 담당 강사명
}

export interface CourseListResponse {
  courses: Course[] // 강의 목록  
  categories: CourseCategory[] // 강의 카테고리 목록
}