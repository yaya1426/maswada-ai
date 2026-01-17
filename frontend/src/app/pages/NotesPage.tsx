import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import { useNotes } from "@/contexts/NotesContext"
import { useToast } from "@/contexts/ToastContext"
import { useLocale } from "@/contexts/LocaleContext"
import { NotesListPanel } from "@/components/notes/NotesListPanel"
import { NotesListSkeleton } from "@/components/ui/loading"

export function NotesPage() {
  const navigate = useNavigate()
  const { notes, loading, fetchNotes, createNote } = useNotes()
  const toast = useToast()
  const intl = useIntl()
  const { locale } = useLocale()

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleNewNote = async () => {
    try {
      const newNote = await createNote({
        title: intl.formatMessage({ id: "notes.untitled" }),
        content: "",
      })
      // Navigate to the new note's URL
      navigate(`/${locale}/notes/${newNote.id}`)
    } catch {
      toast.error(intl.formatMessage({ id: "feedback.error" }))
    }
  }

  const handleSelectNote = (noteId: string) => {
    // Navigate to the note's URL
    navigate(`/${locale}/notes/${noteId}`)
  }

  if (loading && notes.length === 0) {
    return (
      <div className="h-[calc(100vh-8rem)] space-y-6">
        <NotesListSkeleton />
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <NotesListPanel
        selectedNoteId={null}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
        className="h-full"
      />
    </div>
  )
}
