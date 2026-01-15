import { useState, useEffect, useMemo, useRef } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { ArrowLeft, Trash2, Sparkles } from "lucide-react"
import { useNotes } from "@/contexts/NotesContext"
import { useToast } from "@/contexts/ToastContext"
import { useAutoSave } from "@/hooks/useAutoSave"
import { detectTextDirection } from "@/lib/textDirection"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/forms/Input"
import { TextArea } from "@/components/forms/TextArea"
import { AutoSaveIndicator } from "./AutoSaveIndicator"
import { AIFeaturesPanel } from "@/components/ai/AIFeaturesPanel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface NoteEditorPanelProps {
  noteId: string | null
  onClose?: () => void
  className?: string
}

export function NoteEditorPanel({ noteId, onClose, className }: NoteEditorPanelProps) {
  const { notes, deleteNote } = useNotes()
  const toast = useToast()
  const intl = useIntl()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [showAIFeatures, setShowAIFeatures] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null)

  // Get the current note
  const currentNote = useMemo(
    () => notes.find((n) => n.id === noteId),
    [notes, noteId]
  )

  // Update local state when note changes (switching between notes)
  // eslint-disable-next-line
  useEffect(() => {
    if (currentNote) {
      console.log('[Editor] Loading note:', currentNote.id)
      setTitle(currentNote.title)
      setContent(currentNote.content)
    } else {
      setTitle("")
      setContent("")
    }
  }, [currentNote])

  // Detect content direction for RTL support
  const contentDir = useMemo(() => detectTextDirection(content), [content])

  const autoSaveData = useMemo(() => {
    const data = { noteId, title, content }
    console.log('[Editor] autoSaveData updated:', data)
    return data
  }, [noteId, title, content])

  // Auto-save hook - only saves when title or content changes
  const { isSaving, lastSaved, hasUnsavedChanges } = useAutoSave(autoSaveData)

  // Focus title input when new note is created
  useEffect(() => {
    if (currentNote && currentNote.title === "Untitled Note" && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [currentNote])

  const handleDelete = async () => {
    if (!noteId) return

    try {
      await deleteNote(noteId)
      toast.success(intl.formatMessage({ id: "feedback.noteDeleted" }))
      setDeleteDialogOpen(false)
      onClose?.()
    } catch {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(intl.locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!noteId || !currentNote) {
    return (
      <div className={cn("flex flex-1 flex-col items-center justify-center", className)}>
        <GlassCard className="p-12 text-center">
          <p className="text-muted-foreground">
            <FormattedMessage id="notes.empty.description" />
          </p>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-1 flex-col gap-4", className)}>
      <GlassCard className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="gap-2 md:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                <FormattedMessage id="notes.backToList" />
              </Button>
            )}
            <AutoSaveIndicator
              isSaving={isSaving}
              lastSaved={lastSaved}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIFeatures(!showAIFeatures)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                <FormattedMessage id="noteDetail.delete" />
              </span>
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
          {/* Title Input */}
          <Input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => {
              console.log('[Editor] Title changed:', e.target.value.substring(0, 20))
              setTitle(e.target.value)
            }}
            placeholder={intl.formatMessage({ id: "note.form.titlePlaceholder" })}
            className="text-2xl font-bold border-none bg-transparent px-0 focus-visible:ring-0"
          />

          {/* Content Textarea */}
          <div dir={contentDir} className="flex-1">
            <TextArea
              ref={contentTextAreaRef}
              value={content}
              onChange={(e) => {
                console.log('[Editor] Content changed:', e.target.value.substring(0, 20))
                setContent(e.target.value)
              }}
              placeholder={intl.formatMessage({ id: "note.form.contentPlaceholder" })}
              className="min-h-[400px] resize-none border-none bg-transparent px-0 focus-visible:ring-0"
              rows={20}
            />
          </div>

          {/* Metadata */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <div>
              <FormattedMessage id="notes.createdAt" />: {formatDate(currentNote.createdAt)}
            </div>
            <div>
              <FormattedMessage id="note.form.characterCount" values={{ count: content.length }} />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI Features Panel */}
      {showAIFeatures && (
        <AIFeaturesPanel noteId={noteId} noteContent={content} />
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent onClose={() => setDeleteDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>
              <FormattedMessage id="notes.delete.button" />
            </DialogTitle>
            <DialogDescription>
              <FormattedMessage id="notes.delete.confirm" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button variant="default" onClick={handleDelete}>
              <FormattedMessage id="notes.delete.button" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
