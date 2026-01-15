import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Sparkles, Copy, Check, Save } from "lucide-react"
import { useApiClient } from "@/hooks/useApiClient"
import { useToast } from "@/contexts/ToastContext"
import { useNotes } from "@/contexts/NotesContext"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/common/GlassCard"
import { RewriteModal } from "./RewriteModal"

interface AIFeaturesPanelProps {
  noteId: string
  noteContent: string
}

export function AIFeaturesPanel({ noteId, noteContent }: AIFeaturesPanelProps) {
  const apiClient = useApiClient()
  const toast = useToast()
  const intl = useIntl()
  const { updateNote } = useNotes()

  const [summary, setSummary] = useState<string | null>(null)
  const [translation, setTranslation] = useState<string | null>(null)
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false)
  const [loading, setLoading] = useState<{
    summarize: boolean
    translate: boolean
  }>({
    summarize: false,
    translate: false,
  })
  const [copied, setCopied] = useState<{
    summary: boolean
    translation: boolean
  }>({
    summary: false,
    translation: false,
  })

  const handleSummarize = async () => {
    setLoading((prev) => ({ ...prev, summarize: true }))
    try {
      const result = await apiClient.summarize({ noteId })
      setSummary(result.summary)
      toast.success(intl.formatMessage({ id: "ai.summarize.success" }))
    } catch (error) {
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
    } finally {
      setLoading((prev) => ({ ...prev, summarize: false }))
    }
  }

  const handleSaveSummary = async () => {
    if (!summary) return
    try {
      await updateNote(noteId, { summary })
      toast.success(intl.formatMessage({ id: "ai.summarize.saved" }))
    } catch (error) {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const handleTranslate = async () => {
    setLoading((prev) => ({ ...prev, translate: true }))
    try {
      // Detect target language (opposite of current)
      const target = noteContent.match(/[\u0600-\u06FF]/) ? "en" : "ar"
      const result = await apiClient.translate({ noteId, target })
      setTranslation(result.translatedText)
      toast.success(intl.formatMessage({ id: "ai.translate.success" }))
    } catch (error) {
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
    } finally {
      setLoading((prev) => ({ ...prev, translate: false }))
    }
  }

  const handleRewrite = async (mode: "shorter" | "clearer" | "formal" | "casual") => {
    try {
      const result = await apiClient.rewrite({ noteId, mode })
      return result.rewrittenText
    } catch (error) {
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
      throw error
    }
  }

  const handleReplaceContent = async (newContent: string) => {
    try {
      await updateNote(noteId, { content: newContent })
      toast.success(intl.formatMessage({ id: "feedback.noteUpdated" }))
      // Refresh the page to show updated content
      window.location.reload()
    } catch (error) {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const handleCopy = async (type: "summary" | "translation", text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [type]: true }))
    toast.success(intl.formatMessage({ id: "ai.rewrite.copied" }))
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }))
    }, 2000)
  }

  return (
    <>
      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h2 className="text-xl font-semibold">AI Features</h2>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleSummarize}
            disabled={loading.summarize}
            className="gap-2"
          >
            <FormattedMessage id="ai.summarize.button" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setRewriteModalOpen(true)}
            className="gap-2"
          >
            <FormattedMessage id="ai.rewrite.button" />
          </Button>
          <Button
            variant="outline"
            onClick={handleTranslate}
            disabled={loading.translate}
            className="gap-2"
          >
            <FormattedMessage id="ai.translate" />
          </Button>
        </div>

        {/* Summary result */}
        {summary && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">
                <FormattedMessage id="noteDetail.summary" />
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy("summary", summary)}
                  disabled={copied.summary}
                  className="gap-2"
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveSummary}
                  className="gap-2"
                >
                  <Save className="h-3 w-3" />
                  <FormattedMessage id="ai.summarize.save" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
              {summary}
            </div>
          </div>
        )}

        {/* Translation result */}
        {translation && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">
                <FormattedMessage id="ai.translate" />
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy("translation", translation)}
                disabled={copied.translation}
                className="gap-2"
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
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm">
              {translation}
            </div>
          </div>
        )}
      </GlassCard>

      {/* Rewrite modal */}
      <RewriteModal
        open={rewriteModalOpen}
        onOpenChange={setRewriteModalOpen}
        onRewrite={handleRewrite}
        onReplace={handleReplaceContent}
      />
    </>
  )
}
