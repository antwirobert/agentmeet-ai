import { AlertCircleIcon } from 'lucide-react'

export const ErrorState = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-3">
        <AlertCircleIcon className="text-red-500 size-6" />
        <h3 className="font-semibold text-2xl">Something went wrong!</h3>
      </div>
      <p className="font-semibold animate-pulse">{title}</p>
    </div>
  )
}
