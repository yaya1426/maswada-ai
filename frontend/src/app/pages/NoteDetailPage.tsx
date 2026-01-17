import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useIntl } from "react-intl"
import { useLocale } from "@/contexts/LocaleContext"
import { useNotes } from "@/contexts/NotesContext"
import { NoteEditorPanel } from "@/components/notes/NoteEditorPanel"
import { Loading } from "@/components/ui/loading"

export function NoteDetailPage() {
  const { noteId } = useParams<{ noteId: string }>()
  const navigate = useNavigate()
  const { locale } = useLocale()
  const intl = useIntl()
  const { notes, loading, fetchNotes } = useNotes()

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const handleBackToList = () => {
    navigate(`/${locale}/notes`)
  }

  if (loading && notes.length === 0) {
    return <Loading message={intl.formatMessage({ id: "loading.note" })} />
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      <NoteEditorPanel noteId={noteId || null} onClose={handleBackToList} className="flex-1" />
    </div>
  )
}
