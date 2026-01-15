import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Plus, Search, Trash2, FileText } from "lucide-react"
import { useNotes } from "@/contexts/NotesContext"
import { useToast } from "@/contexts/ToastContext"
import type { Note } from "@/types"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/forms/Input"
import { EmptyState } from "@/components/common/EmptyState"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface NotesListPanelProps {
  selectedNoteId: string | null
  onSelectNote: (noteId: string) => void
  onNewNote: () => Promise<void>
  className?: string
}

export function NotesListPanel({
  selectedNoteId,
  onSelectNote,
  onNewNote,
  className,
}: NotesListPanelProps) {
  const { notes, deleteNote } = useNotes()
  const toast = useToast()
  const intl = useIntl()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const [isCreatingNote, setIsCreatingNote] = useState(false)

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNewNote = async () => {
    setIsCreatingNote(true)
    try {
      await onNewNote()
    } finally {
      setIsCreatingNote(false)
    }
  }

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation()
    setNoteToDelete(noteId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return

    try {
      await deleteNote(noteToDelete)
      toast.success(intl.formatMessage({ id: "feedback.noteDeleted" }))
      setDeleteDialogOpen(false)
      setNoteToDelete(null)
      
      // If deleted note was selected, select another note
      if (noteToDelete === selectedNoteId) {
        const remainingNotes = filteredNotes.filter(n => n.id !== noteToDelete)
        if (remainingNotes.length > 0) {
          onSelectNote(remainingNotes[0].id)
        }
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(intl.locale, {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className={cn("flex w-full flex-col md:w-80 lg:w-96", className)}>
      <GlassCard className="flex h-full flex-col p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            <FormattedMessage id="notes.title" />
          </h2>
          <Button
            size="sm"
            onClick={handleNewNote}
            disabled={isCreatingNote}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">
              <FormattedMessage id="nav.createNote" />
            </span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={intl.formatMessage({ id: "notes.search.placeholder" })}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Notes List */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <EmptyState
              title={intl.formatMessage({ id: "notes.empty.title" })}
              description={intl.formatMessage({ id: "notes.empty.description" })}
              icon={<FileText className="h-8 w-8 text-muted-foreground" />}
            />
          ) : (
            filteredNotes.map((note) => (
              <NoteListItem
                key={note.id}
                note={note}
                isSelected={note.id === selectedNoteId}
                onSelect={() => onSelectNote(note.id)}
                onDelete={(e) => handleDeleteClick(e, note.id)}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
      </GlassCard>

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
            <Button variant="default" onClick={handleDeleteConfirm}>
              <FormattedMessage id="notes.delete.button" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface NoteListItemProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onDelete: (e: React.MouseEvent) => void
  formatDate: (date: string) => string
}

function NoteListItem({ note, isSelected, onSelect, onDelete, formatDate }: NoteListItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full rounded-lg border p-3 text-left transition-colors",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 overflow-hidden">
          <h3 className="truncate font-medium text-sm">{note.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{note.content}</p>
          <p className="mt-2 text-xs text-muted-foreground">{formatDate(note.updatedAt)}</p>
        </div>
        <button
          onClick={onDelete}
          className="flex-shrink-0 rounded p-1 opacity-0 transition-opacity hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </button>
  )
}
