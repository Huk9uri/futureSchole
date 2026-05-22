import clsx from "clsx"

import { categoryLabels } from "@/components/enrollment/courseCategoryMeta"
import type { CourseCategory } from "@/types/course"

interface CourseCategoryFilterProps {
  categories: CourseCategory[]
  selectedCategory?: CourseCategory
  onSelectCategory: (category?: CourseCategory) => void
}

export const CourseCategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CourseCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={clsx(
          "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          selectedCategory
            ? "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            : "bg-emerald-600 text-white",
        )}
        onClick={() => onSelectCategory(undefined)}
        type="button"
      >
        전체
      </button>
      {categories.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <button
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              isSelected
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
            key={category}
            onClick={() => onSelectCategory(category)}
            type="button"
          >
            {categoryLabels[category]}
          </button>
        )
      })}
    </div>
  )
}
