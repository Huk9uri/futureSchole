import type { SelectHTMLAttributes } from "react"
import clsx from "clsx"

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
}

export const Select = ({
  id,
  label,
  error,
  placeholder,
  options,
  className,
  ...props
}: SelectProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={clsx(
          "h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 shadow-sm transition",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100",
          className,
        )}
        id={id}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
