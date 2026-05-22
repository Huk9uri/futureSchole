import clsx from "clsx"

interface Step {
  id: number
  label: string
}

interface StepIndicatorProps {
  currentStep: number
  steps?: Step[]
}

const defaultSteps: Step[] = [
  { id: 1, label: "강의 선택" },
  { id: 2, label: "정보 입력" },
  { id: 3, label: "확인 및 제출" },
]

export const StepIndicator = ({
  currentStep,
  steps = defaultSteps,
}: StepIndicatorProps) => {
  return (
    <ol className="flex w-full items-start">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = step.id < currentStep
        const isLast = index === steps.length - 1

        return (
          <li
            className={clsx("relative flex flex-1 flex-col items-center")}
            key={step.id}
          >
            {!isLast && (
              <span
                className={clsx(
                  "absolute left-1/2 top-4 h-0.5 w-full",
                  isCompleted ? "bg-emerald-500" : "bg-slate-200",
                )}
              />
            )}
            <span
              className={clsx(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-sm transition-colors",
                isActive && "bg-emerald-600 text-white",
                isCompleted &&
                  "border-emerald-500 bg-emerald-500 text-white",
                !isActive &&
                  !isCompleted &&
                  "border-slate-300 bg-white text-slate-400",
              )}
            >
              {isCompleted ? "✓" : step.id}
            </span>
            <span
              className={clsx(
                "mt-3 text-center text-sm font-semibold leading-5",
                isActive && "text-emerald-700",
                isCompleted && "text-emerald-700",
                !isActive && !isCompleted && "text-slate-500",
              )}
            >
              {step.label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
