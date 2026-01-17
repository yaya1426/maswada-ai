import { useState } from "react"
import { useIntl } from "react-intl"
import { useApiClient } from "@/hooks/useApiClient"
import { useToast } from "@/contexts/ToastContext"
import { useNotes } from "@/contexts/NotesContext"

export function useAIFeatures(noteId: string) {
  const apiClient = useApiClient()
  const toast = useToast()
  const intl = useIntl()
  const { updateNote } = useNotes()

  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState<{
    summarize: boolean
    translate: boolean
    rewrite: boolean
  }>({
    summarize: false,
    translate: false,
    rewrite: false,
  })
  const [copied, setCopied] = useState(false)

  const handleSummarize = async () => {
    setLoading((prev) => ({ ...prev, summarize: true }))
    try {
      const result = await apiClient.summarize({ noteId })
      
      // Validate result is not empty
      if (!result.summary || result.summary.trim() === '') {
        console.error('[Frontend] Summarize returned empty result')
        toast.error('Summary resulted in empty content')
        return
      }
      
      setSummary(result.summary)
      toast.success(intl.formatMessage({ id: "ai.summarize.success" }))
    } catch (error) {
      console.error('[Frontend] Summarize error:', error)
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
    } finally {
      setLoading((prev) => ({ ...prev, summarize: false }))
    }
  }

  const handleTranslate = async () => {
    setLoading((prev) => ({ ...prev, translate: true }))
    try {
      const result = await apiClient.translate({ noteId })
      
      // Validate result is not empty
      if (!result.translatedText || result.translatedText.trim() === '') {
        console.error('[Frontend] Translate returned empty result')
        toast.error('Translation resulted in empty content. Note content not updated.')
        return
      }
      
      await updateNote(noteId, { content: result.translatedText })
      toast.success(intl.formatMessage({ id: "ai.translate.success" }))
    } catch (error) {
      console.error('[Frontend] Translate error:', error)
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
    } finally {
      setLoading((prev) => ({ ...prev, translate: false }))
    }
  }

  const handleRewrite = async (mode: "shorter" | "clearer" | "formal" | "casual") => {
    setLoading((prev) => ({ ...prev, rewrite: true }))
    try {
      const result = await apiClient.rewrite({ noteId, mode })
      
      // Validate result is not empty
      if (!result.rewrittenText || result.rewrittenText.trim() === '') {
        console.error('[Frontend] Rewrite returned empty result')
        toast.error('Rewrite resulted in empty content. Note content not updated.')
        return
      }
      
      await updateNote(noteId, { content: result.rewrittenText })
      toast.success(intl.formatMessage({ id: "feedback.noteUpdated" }))
    } catch (error) {
      console.error('[Frontend] Rewrite error:', error)
      toast.error(intl.formatMessage({ id: "ai.result.error" }))
      throw error
    } finally {
      setLoading((prev) => ({ ...prev, rewrite: false }))
    }
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(intl.formatMessage({ id: "ai.rewrite.copied" }))
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return {
    summary,
    loading,
    copied,
    handleSummarize,
    handleTranslate,
    handleRewrite,
    handleCopy,
  }
}
