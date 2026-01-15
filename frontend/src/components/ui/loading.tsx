import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-gray-300 border-t-gray-900",
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingProps {
  message?: string
}

export function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <LoadingSpinner size="lg" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}

export function FullPageLoading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoadingSpinner size="lg" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />
}

export function NotesListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card space-y-4 p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
