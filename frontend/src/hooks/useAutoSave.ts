import { useEffect, useRef, useState, useCallback } from "react"
import { useNotes } from "@/contexts/NotesContext"

interface UseAutoSaveParams {
  noteId: string | null
  title: string
  content: string
  userEditedRef: React.MutableRefObject<boolean>
}

interface UseAutoSaveReturn {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  hasUserEdited: boolean
}

export function useAutoSave({
  noteId,
  title,
  content,
  userEditedRef,
}: UseAutoSaveParams): UseAutoSaveReturn {
  const { updateNote } = useNotes()
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  const debounceTimerRef = useRef<number | null>(null)
  const previousTitleRef = useRef(title)
  const previousContentRef = useRef(content)

  const saveNote = useCallback(async () => {
    if (!noteId || !userEditedRef.current) return

    try {
      setIsSaving(true)
      await updateNote(noteId, { title, content })
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      previousTitleRef.current = title
      previousContentRef.current = content
    } catch (error) {
      console.error("Failed to auto-save note:", error)
    } finally {
      setIsSaving(false)
    }
  }, [noteId, title, content, updateNote, userEditedRef])

  useEffect(() => {
    // Check if title or content changed
    const titleChanged = title !== previousTitleRef.current
    const contentChanged = content !== previousContentRef.current

    if (!titleChanged && !contentChanged) {
      return
    }

    // Mark as having unsaved changes
    if (userEditedRef.current) {
      setHasUnsavedChanges(true)
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer for 1 second debounce
    debounceTimerRef.current = setTimeout(() => {
      saveNote()
    }, 1000)

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [title, content, saveNote, userEditedRef])


  return {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    hasUserEdited: userEditedRef.current,
  }
}
