import { useEffect, useRef, useState, useCallback } from "react"
import { useNotes } from "@/contexts/NotesContext"

interface AutoSaveResult {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  hasUserEdited: boolean
  saveNow: () => Promise<void>
}

interface NoteDraft {
  noteId: string | null
  title: string
  content: string
}

/**
 * Hook for auto-saving data with debounce
 * @param data - The data to save
 * @param onSave - Function to call when saving
 * @param options - Configuration options
 * @returns Auto-save status and controls
 */
export function useAutoSave(data: NoteDraft): AutoSaveResult {
  const { updateNote } = useNotes()
  const delay = 3000

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [hasUserEdited, setHasUserEdited] = useState(false)
  
  const timeoutRef = useRef<number | undefined>(undefined)
  const previousNoteIdRef = useRef<string | null>(null)
  const previousTitleRef = useRef<string>("")
  const previousContentRef = useRef<string>("")
  const isInitialLoadRef = useRef(true)
  
  // Function to perform the actual save
  const performSave = useCallback(async (dataToSave: NoteDraft) => {
    if (!dataToSave.noteId) {
      return
    }

    try {
      setIsSaving(true)
      setHasUnsavedChanges(false)

      await updateNote(dataToSave.noteId, {
        title: dataToSave.title,
        content: dataToSave.content,
      })

      setLastSaved(new Date())
      setIsSaving(false)
    } catch {
      setIsSaving(false)
      setHasUnsavedChanges(true)
    }
  }, [updateNote])

  // Manual save function
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    await performSave(data)
  }, [data, performSave])

  // Auto-save effect with debounce
  useEffect(() => {
    const { noteId, title, content } = data

    // If note changed, reset all state and skip save (user is switching notes)
    const noteChanged = noteId !== previousNoteIdRef.current
    if (noteChanged) {
      previousNoteIdRef.current = noteId
      previousTitleRef.current = title
      previousContentRef.current = content
      isInitialLoadRef.current = false
      
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      // Reset all auto-save state indicators (deferred to avoid cascading renders)
      window.setTimeout(() => {
        setHasUnsavedChanges(false)
        setIsSaving(false)
        setLastSaved(null)
        setHasUserEdited(false) // Reset edit flag for new note
      }, 0)
      
      return
    }

    // Skip initial load - just store the data
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false
      previousNoteIdRef.current = noteId
      previousTitleRef.current = title
      previousContentRef.current = content
      return
    }

    // Check if data has actually changed
    const titleChanged = title !== previousTitleRef.current
    const contentChanged = content !== previousContentRef.current

    if (!titleChanged && !contentChanged) {
      return
    }

    previousNoteIdRef.current = noteId
    previousTitleRef.current = title
    previousContentRef.current = content
    
    // Defer state update to avoid cascading renders within effect
    // Mark that user has made an edit and show unsaved changes indicator
    window.setTimeout(() => {
      setHasUserEdited(true)
      setHasUnsavedChanges(true)
    }, 0)

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for debounced save
    timeoutRef.current = window.setTimeout(() => {
      performSave(data)
    }, delay)

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, delay, performSave])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    hasUserEdited,
    saveNow,
  }
}
