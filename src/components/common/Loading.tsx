interface LoadingProps {
  message?: string
}

export const Loading = ({ message = "불러오는 중입니다." }: LoadingProps) => {
  return (
    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
      <span>{message}</span>
    </div>
  )
}
