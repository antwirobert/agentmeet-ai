import { Loader2Icon } from 'lucide-react'

export const LoadingState = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Loader2Icon className="size-15 animate-spin text-primary" />
      <p className="font-semibold animate-pulse">{title}</p>
    </div>
  )
}
