import { FormattedMessage, useIntl } from "react-intl"
import { Check, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutoSaveIndicatorProps {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  hasUserEdited: boolean
  className?: string
}

export function AutoSaveIndicator({
  isSaving,
  lastSaved,
  hasUnsavedChanges,
  hasUserEdited,
  className,
}: AutoSaveIndicatorProps) {
  const intl = useIntl()

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    
    if (seconds < 5) return intl.formatMessage({ id: "common.now" })
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    return `${Math.floor(seconds / 3600)}h`
  }

  // Don't show any indicators until the user has made an edit
  if (!hasUserEdited) {
    return null
  }

  if (isSaving) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <Clock className="h-4 w-4 animate-pulse" />
        <span>
          <FormattedMessage id="notes.editor.saving" />
        </span>
      </div>
    )
  }

  if (hasUnsavedChanges) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-orange-600", className)}>
        <AlertCircle className="h-4 w-4" />
        <span>
          <FormattedMessage id="notes.editor.unsaved" />
        </span>
      </div>
    )
  }

  if (lastSaved) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-green-600", className)}>
        <Check className="h-4 w-4" />
        <span>
          <FormattedMessage
            id="notes.editor.saved"
            values={{ time: getTimeAgo(lastSaved) }}
          />
        </span>
      </div>
    )
  }

  return null
}
