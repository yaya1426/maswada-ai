import { useEffect, useRef, useState, useCallback } from "react"
import { useNotes } from "@/contexts/NotesContext"

interface AutoSaveResult {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
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
  const delay = 1000

  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  const timeoutRef = useRef<number | undefined>(undefined)
  const previousNoteIdRef = useRef<string | null>(null)
  const previousTitleRef = useRef<string>("")
  const previousContentRef = useRef<string>("")
  const isInitialLoadRef = useRef(true)
  
  // Function to perform the actual save
  const performSave = useCallback(async (dataToSave: NoteDraft) => {
    console.log('[AutoSave] performSave called', dataToSave)
    if (!dataToSave.noteId) {
      console.log('[AutoSave] No noteId, skipping save')
      return
    }

    try {
      console.log('[AutoSave] Starting save...', { noteId: dataToSave.noteId })
      setIsSaving(true)
      setHasUnsavedChanges(false)

      await updateNote(dataToSave.noteId, {
        title: dataToSave.title,
        content: dataToSave.content,
      })

      console.log('[AutoSave] Save successful!')
      setLastSaved(new Date())
      setIsSaving(false)
    } catch (error) {
      console.error('[AutoSave] Save failed:', error)
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
    console.log('[AutoSave] Effect triggered', { noteId, title: title.substring(0, 20), content: content.substring(0, 20) })

    // If note changed, reset and skip save (user is switching notes)
    const noteChanged = noteId !== previousNoteIdRef.current
    if (noteChanged) {
      console.log('[AutoSave] Note changed, resetting state')
      previousNoteIdRef.current = noteId
      previousTitleRef.current = title
      previousContentRef.current = content
      isInitialLoadRef.current = false
      return
    }

    // Skip initial load - just store the data
    if (isInitialLoadRef.current) {
      console.log('[AutoSave] Initial load, storing data and skipping save')
      isInitialLoadRef.current = false
      previousNoteIdRef.current = noteId
      previousTitleRef.current = title
      previousContentRef.current = content
      return
    }

    // Check if data has actually changed
    const titleChanged = title !== previousTitleRef.current
    const contentChanged = content !== previousContentRef.current

    console.log('[AutoSave] Change detection:', { titleChanged, contentChanged })

    if (!titleChanged && !contentChanged) {
      console.log('[AutoSave] No changes detected, skipping')
      return
    }

    console.log('[AutoSave] Changes detected! Setting up debounce timer...')
    previousNoteIdRef.current = noteId
    previousTitleRef.current = title
    previousContentRef.current = content
    
    // Defer state update to avoid cascading renders within effect
    queueMicrotask(() => {
      setHasUnsavedChanges(true)
    })

    // Clear existing timeout
    if (timeoutRef.current) {
      console.log('[AutoSave] Clearing existing timeout')
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for debounced save
    console.log(`[AutoSave] Starting ${delay}ms debounce timer`)
    timeoutRef.current = window.setTimeout(() => {
      console.log('[AutoSave] Debounce timer completed, calling performSave')
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
    saveNow,
  }
}
