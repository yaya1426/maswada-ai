import { FormattedMessage } from "react-intl"
import { Sparkles, RefreshCw, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AIToolbarProps {
  onSummarize: () => void
  onRewrite: () => void
  onTranslate: () => void
  loading?: {
    summarize: boolean
    rewrite: boolean
    translate: boolean
  }
  className?: string
}

export function AIToolbar({
  onSummarize,
  onRewrite,
  onTranslate,
  loading = { summarize: false, rewrite: false, translate: false },
  className,
}: AIToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-b border-border pb-4 mb-4",
        className
      )}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onSummarize}
        disabled={loading.summarize}
        className="gap-2"
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">
          <FormattedMessage id="ai.summarize.button" />
        </span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onRewrite}
        disabled={loading.rewrite}
        className="gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        <span className="hidden sm:inline">
          <FormattedMessage id="ai.rewrite.button" />
        </span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onTranslate}
        disabled={loading.translate}
        className="gap-2"
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">
          <FormattedMessage id="ai.translate" />
        </span>
      </Button>
    </div>
  )
}
