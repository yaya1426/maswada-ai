import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import { useNotes } from "@/contexts/NotesContext"
import { useToast } from "@/contexts/ToastContext"
import { useLocale } from "@/contexts/LocaleContext"
import { NotesListPanel } from "@/components/notes/NotesListPanel"
import { NoteEditorPanel } from "@/components/notes/NoteEditorPanel"
import { NotesListSkeleton } from "@/components/ui/loading"

export function NotesPage() {
  const { noteId: urlNoteId } = useParams<{ noteId?: string }>()
  const navigate = useNavigate()
  const { notes, loading, fetchNotes, createNote } = useNotes()
  const toast = useToast()
  const intl = useIntl()
  const { locale } = useLocale()
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(urlNoteId || null)
  const [isMobileEditorView, setIsMobileEditorView] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  // Sync selected note with URL parameter
  useEffect(() => {
    if (urlNoteId) {
      setSelectedNoteId(urlNoteId)
      setIsMobileEditorView(true)
    } else if (notes.length > 0 && !selectedNoteId) {
      // Auto-select first note when notes are loaded and no note in URL
      const firstNoteId = notes[0].id
      setSelectedNoteId(firstNoteId)
      navigate(`/${locale}/notes/${firstNoteId}`, { replace: true })
    }
  }, [urlNoteId, notes, selectedNoteId, navigate, locale])

  const handleNewNote = async () => {
    try {
      const newNote = await createNote({
        title: intl.formatMessage({ id: "notes.untitled" }),
        content: "",
      })
      // Navigate to the new note's URL
      navigate(`/${locale}/notes/${newNote.id}`)
      setSelectedNoteId(newNote.id)
      setIsMobileEditorView(true) // Show editor on mobile
    } catch (error) {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const handleSelectNote = (noteId: string) => {
    // Navigate to the note's URL
    navigate(`/${locale}/notes/${noteId}`)
    setSelectedNoteId(noteId)
    setIsMobileEditorView(true) // Show editor on mobile when note selected
  }

  const handleCloseEditor = () => {
    setIsMobileEditorView(false)
    // Navigate back to notes list when closing editor on mobile
    navigate(`/${locale}/notes`)
  }

  if (loading && notes.length === 0) {
    return (
      <div className="h-[calc(100vh-8rem)] space-y-6">
        <NotesListSkeleton />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden">
      {/* List View - Left Side */}
      <NotesListPanel
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
        className={isMobileEditorView ? "hidden md:flex" : "flex"}
      />

      {/* Editor View - Right Side */}
      <NoteEditorPanel
        noteId={selectedNoteId}
        onClose={handleCloseEditor}
        className={!isMobileEditorView && selectedNoteId ? "hidden md:flex" : selectedNoteId ? "flex" : "hidden"}
      />
    </div>
  )
}
