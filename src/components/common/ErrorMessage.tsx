interface ErrorMessageProps {
  message: string
  details?: string[]
}

export const ErrorMessage = ({ message, details }: ErrorMessageProps) => {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      <p>{message}</p>

      {details && details.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 font-normal">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
