import type { ChangeEvent } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Sparkles, RefreshCw, Languages, Loader2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type RewriteMode = "shorter" | "clearer" | "formal" | "casual"

interface AIToolbarProps {
  onSummarize: () => void
  onRewrite: (mode: RewriteMode) => void
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
  const intl = useIntl()
  const handleRewriteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const mode = event.target.value as RewriteMode
    if (!mode) return
    onRewrite(mode)
    event.target.value = ""
  }

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
        {loading.summarize ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          <FormattedMessage id="ai.summarize.button" />
        </span>
      </Button>
      
      <div className="relative">
        <select
          onChange={handleRewriteChange}
          disabled={loading.rewrite}
          aria-label={intl.formatMessage({ id: "ai.rewrite.selectMode" })}
          className="h-8 appearance-none rounded-md border border-input bg-background px-8 pr-8 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue=""
        >
          <option value="" disabled>
            {intl.formatMessage({ id: "ai.rewrite.selectMode" })}
          </option>
          <option value="shorter">
            {intl.formatMessage({ id: "ai.rewrite.mode.shorter" })}
          </option>
          <option value="clearer">
            {intl.formatMessage({ id: "ai.rewrite.mode.clearer" })}
          </option>
          <option value="formal">
            {intl.formatMessage({ id: "ai.rewrite.mode.formal" })}
          </option>
          <option value="casual">
            {intl.formatMessage({ id: "ai.rewrite.mode.casual" })}
          </option>
        </select>
        <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          {loading.rewrite ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </div>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onTranslate}
        disabled={loading.translate}
        className="gap-2"
      >
        {loading.translate ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Languages className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          <FormattedMessage id="ai.translate" />
        </span>
      </Button>
    </div>
  )
}
