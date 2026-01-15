import { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { X, Copy, Check, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/common/GlassCard"
import { cn } from "@/lib/utils"

interface AISidePanelProps {
  open: boolean
  onClose: () => void
  activeFeature: "summarize" | "rewrite" | "translate" | null
  summary?: string | null
  translation?: string | null
  rewriteResult?: string | null
  loading?: {
    summarize: boolean
    rewrite: boolean
    translate: boolean
  }
  copied?: {
    summary: boolean
    translation: boolean
    rewrite: boolean
  }
  onCopy: (type: "summary" | "translation" | "rewrite", text: string) => void
  onSaveSummary?: () => void
  onReplaceContent?: (content: string) => void
  onRewriteWithMode?: (mode: "shorter" | "clearer" | "formal" | "casual") => Promise<string>
}

export function AISidePanel({
  open,
  onClose,
  activeFeature,
  summary,
  translation,
  rewriteResult,
  loading = { summarize: false, rewrite: false, translate: false },
  copied = { summary: false, translation: false, rewrite: false },
  onCopy,
  onSaveSummary,
  onReplaceContent,
  onRewriteWithMode,
}: AISidePanelProps) {
  const [rewriteMode, setRewriteMode] = useState<"shorter" | "clearer" | "formal" | "casual">("clearer")
  const [isRewriting, setIsRewriting] = useState(false)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  // Handle rewrite with selected mode
  const handleRewriteClick = async () => {
    if (!onRewriteWithMode) return
    setIsRewriting(true)
    try {
      await onRewriteWithMode(rewriteMode)
    } finally {
      setIsRewriting(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Side panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full md:w-96 bg-background shadow-2xl transition-transform duration-300 ease-out overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <GlassCard className="h-full rounded-none p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {activeFeature === "summarize" && <FormattedMessage id="ai.summarize.button" />}
              {activeFeature === "rewrite" && <FormattedMessage id="ai.rewrite.button" />}
              {activeFeature === "translate" && <FormattedMessage id="ai.translate" />}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Summary View */}
          {activeFeature === "summarize" && (
            <div className="space-y-4">
              {loading.summarize ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : summary ? (
                <>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
                    {summary}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopy("summary", summary)}
                      disabled={copied.summary}
                      className="flex-1 gap-2"
                    >
                      {copied.summary ? (
                        <>
                          <Check className="h-3 w-3" />
                          <FormattedMessage id="ai.rewrite.copied" />
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <FormattedMessage id="ai.rewrite.copy" />
                        </>
                      )}
                    </Button>
                    {onSaveSummary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onSaveSummary}
                        className="flex-1 gap-2"
                      >
                        <Save className="h-3 w-3" />
                        <FormattedMessage id="ai.summarize.save" />
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  <FormattedMessage id="ai.summarize.empty" />
                </p>
              )}
            </div>
          )}

          {/* Rewrite View */}
          {activeFeature === "rewrite" && (
            <div className="space-y-4">
              {/* Mode selector */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  <FormattedMessage id="ai.rewrite.mode" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["shorter", "clearer", "formal", "casual"] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={rewriteMode === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRewriteMode(mode)}
                      className="justify-start"
                    >
                      <FormattedMessage id={`ai.rewrite.${mode}`} />
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleRewriteClick}
                disabled={isRewriting || loading.rewrite}
                className="w-full gap-2"
              >
                {isRewriting || loading.rewrite ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <FormattedMessage id="ai.rewrite.processing" />
                  </>
                ) : (
                  <FormattedMessage id="ai.rewrite.button" />
                )}
              </Button>

              {/* Result */}
              {rewriteResult && !loading.rewrite && (
                <>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
                    {rewriteResult}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCopy("rewrite", rewriteResult)}
                      disabled={copied.rewrite}
                      className="flex-1 gap-2"
                    >
                      {copied.rewrite ? (
                        <>
                          <Check className="h-3 w-3" />
                          <FormattedMessage id="ai.rewrite.copied" />
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <FormattedMessage id="ai.rewrite.copy" />
                        </>
                      )}
                    </Button>
                    {onReplaceContent && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onReplaceContent(rewriteResult)}
                        className="flex-1 gap-2"
                      >
                        <FormattedMessage id="ai.rewrite.replace" />
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Translation View */}
          {activeFeature === "translate" && (
            <div className="space-y-4">
              {loading.translate ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : translation ? (
                <>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm" dir="auto">
                    {translation}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopy("translation", translation)}
                    disabled={copied.translation}
                    className="w-full gap-2"
                  >
                    {copied.translation ? (
                      <>
                        <Check className="h-3 w-3" />
                        <FormattedMessage id="ai.rewrite.copied" />
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <FormattedMessage id="ai.rewrite.copy" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  <FormattedMessage id="ai.translate.empty" />
                </p>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </>
  )
}
