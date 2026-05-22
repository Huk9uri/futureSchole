import type { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({
  id,
  label,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={clsx(
          "h-11 w-full rounded-md border bg-white px-3 text-sm text-slate-950 shadow-sm transition",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100",
          className,
        )}
        id={id}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
