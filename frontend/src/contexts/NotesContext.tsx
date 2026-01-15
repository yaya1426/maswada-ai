import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import type { Note, CreateNoteData, UpdateNoteData } from "@/types"

interface NotesContextValue {
  notes: Note[]
  loading: boolean
  error: string | null
  fetchNotes: () => Promise<void>
  createNote: (data: CreateNoteData) => Promise<Note>
  updateNote: (id: string, data: UpdateNoteData) => Promise<Note>
  deleteNote: (id: string) => Promise<void>
  refreshNotes: () => Promise<void>
  getNote: (id: string) => Note | undefined
}

const NotesContext = createContext<NotesContextValue | null>(null)

interface NotesProviderProps {
  children: ReactNode
}

export function NotesProvider({ children }: NotesProviderProps) {
  const apiClient = useApiClient()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedNotes = await apiClient.getNotes()
      setNotes(fetchedNotes)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch notes"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiClient])

  const createNote = useCallback(
    async (data: CreateNoteData): Promise<Note> => {
      try {
        setError(null)
        const newNote = await apiClient.createNote(data)
        setNotes((prev) => [newNote, ...prev])
        return newNote
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create note"
        setError(errorMessage)
        throw err
      }
    },
    [apiClient]
  )

  const updateNote = useCallback(
    async (id: string, data: UpdateNoteData): Promise<Note> => {
      try {
        setError(null)
        const updatedNote = await apiClient.updateNote(id, data)
        setNotes((prev) =>
          prev.map((note) => (note.id === id ? updatedNote : note))
        )
        return updatedNote
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to update note"
        setError(errorMessage)
        throw err
      }
    },
    [apiClient]
  )

  const deleteNote = useCallback(
    async (id: string): Promise<void> => {
      try {
        setError(null)
        await apiClient.deleteNote(id)
        setNotes((prev) => prev.filter((note) => note.id !== id))
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to delete note"
        setError(errorMessage)
        throw err
      }
    },
    [apiClient]
  )

  const refreshNotes = useCallback(async () => {
    await fetchNotes()
  }, [fetchNotes])

  const getNote = useCallback(
    (id: string): Note | undefined => {
      return notes.find((note) => note.id === id)
    },
    [notes]
  )

  const value: NotesContextValue = {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    refreshNotes,
    getNote,
  }

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export function useNotes(): NotesContextValue {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider")
  }
  return context
}
