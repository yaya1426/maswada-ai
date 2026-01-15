import { useState } from "react"
import { useIntl } from "react-intl"
import { useApiClient } from "@/hooks/useApiClient"
import { useToast } from "@/contexts/ToastContext"
import { useNotes } from "@/contexts/NotesContext"

export function useAIFeatures(noteId: string, noteContent: string) {
  const apiClient = useApiClient()
  const toast = useToast()
  const intl = useIntl()
  const { updateNote } = useNotes()

  const [summary, setSummary] = useState<string | null>(null)
  const [translation, setTranslation] = useState<string | null>(null)
  const [rewriteResult, setRewriteResult] = useState<string | null>(null)
  const [loading, setLoading] = useState<{
    summarize: boolean
    translate: boolean
    rewrite: boolean
  }>({
    summarize: false,
    translate: false,
    rewrite: false,
  })
  const [copied, setCopied] = useState<{
    summary: boolean
    translation: boolean
    rewrite: boolean
  }>({
    summary: false,
    translation: false,
    rewrite: false,
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
    } catch {
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
    setLoading((prev) => ({ ...prev, rewrite: true }))
    try {
      const result = await apiClient.rewrite({ noteId, mode })
      setRewriteResult(result.rewrittenText)
      return result.rewrittenText
    } catch (error) {
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
      throw error
    } finally {
      setLoading((prev) => ({ ...prev, rewrite: false }))
    }
  }

  const handleReplaceContent = async (newContent: string) => {
    try {
      await updateNote(noteId, { content: newContent })
      toast.success(intl.formatMessage({ id: "feedback.noteUpdated" }))
      // Refresh the page to show updated content
      window.location.reload()
    } catch {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const handleCopy = async (type: "summary" | "translation" | "rewrite", text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied((prev) => ({ ...prev, [type]: true }))
    toast.success(intl.formatMessage({ id: "ai.rewrite.copied" }))
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }))
    }, 2000)
  }

  return {
    summary,
    translation,
    rewriteResult,
    loading,
    copied,
    handleSummarize,
    handleTranslate,
    handleRewrite,
    handleCopy,
    handleSaveSummary,
    handleReplaceContent,
  }
}
