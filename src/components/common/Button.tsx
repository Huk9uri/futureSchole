import type { ButtonHTMLAttributes, ReactNode } from "react"
import clsx from "clsx"

type ButtonVariant = "primary" | "secondary" | "danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  children: ReactNode
}

export const Button = ({
  variant = "primary",
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-emerald-600 text-white hover:bg-emerald-700",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
      disabled={isDisabled}
      type="button"
      {...props}
    >
      {isLoading ? "처리 중..." : children}
    </button>
  )
}
