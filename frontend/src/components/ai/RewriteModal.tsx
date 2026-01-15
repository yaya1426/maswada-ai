import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/loading"

interface RewriteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRewrite: (mode: "shorter" | "clearer" | "formal" | "casual") => Promise<string>
  onReplace?: (text: string) => void
}

export function RewriteModal({ open, onOpenChange, onRewrite, onReplace }: RewriteModalProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const modes: Array<{ value: "shorter" | "clearer" | "formal" | "casual"; labelId: string }> = [
    { value: "shorter", labelId: "ai.rewrite.mode.shorter" },
    { value: "clearer", labelId: "ai.rewrite.mode.clearer" },
    { value: "formal", labelId: "ai.rewrite.mode.formal" },
    { value: "casual", labelId: "ai.rewrite.mode.casual" },
  ]

  const handleModeSelect = async (mode: typeof modes[0]["value"]) => {
    setLoading(true)
    setResult(null)
    try {
      const rewrittenText = await onRewrite(mode)
      setResult(rewrittenText)
    } catch (error) {
      // Error handled by parent
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReplace = () => {
    if (result && onReplace) {
      onReplace(result)
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setResult(null)
    setLoading(false)
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose} className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage id="ai.rewrite.button" />
          </DialogTitle>
          <DialogDescription>
            <FormattedMessage id="ai.rewrite.selectMode" />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Mode selection buttons */}
          {!result && !loading && (
            <div className="grid grid-cols-2 gap-3">
              {modes.map((mode) => (
                <Button
                  key={mode.value}
                  variant="outline"
                  onClick={() => handleModeSelect(mode.value)}
                  disabled={loading}
                  className="h-auto py-4"
                >
                  <FormattedMessage id={mode.labelId} />
                </Button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm text-muted-foreground">
                <FormattedMessage id="ai.rewrite.loading" />
              </p>
            </div>
          )}

          {/* Result display */}
          {result && !loading && (
            <div className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto rounded-lg border border-border bg-muted/50 p-4">
                <p className="whitespace-pre-wrap text-sm">{result}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-2"
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <FormattedMessage id="ai.rewrite.copied" />
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <FormattedMessage id="ai.rewrite.copy" />
                    </>
                  )}
                </Button>
                {onReplace && (
                  <Button onClick={handleReplace} className="flex-1">
                    <FormattedMessage id="ai.rewrite.replace" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            <FormattedMessage id="common.close" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
