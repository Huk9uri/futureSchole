import { formatPrice } from "@/utils/format"

interface ConfirmPriceSummaryProps {
  headCount: number
  isGroupEnrollment: boolean
  price: number
  totalPrice: number
}

export const ConfirmPriceSummary = ({
  headCount,
  isGroupEnrollment,
  price,
  totalPrice,
}: ConfirmPriceSummaryProps) => {
  return (
    <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-emerald-950">
            최종 신청 금액
          </h3>
          {isGroupEnrollment && (
            <p className="mt-1 text-sm text-emerald-700">
              {formatPrice(price)} × {headCount}명
            </p>
          )}
        </div>
        <p className="text-2xl font-bold text-emerald-700">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </section>
  )
}
