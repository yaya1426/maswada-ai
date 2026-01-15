import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        {icon || <FileText className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
