import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { X, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "warning" | "info"
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast["type"]) => void
  success: (message: string) => void
  error: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).substring(7)
    const toast: Toast = { id, message, type }
    
    setToasts((prev) => [...prev, toast])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }, [removeToast])

  const success = useCallback((message: string) => showToast(message, "success"), [showToast])
  const error = useCallback((message: string) => showToast(message, "error"), [showToast])
  const warning = useCallback((message: string) => showToast(message, "warning"), [showToast])
  const info = useCallback((message: string) => showToast(message, "info"), [showToast])

  const value: ToastContextValue = {
    showToast,
    success,
    error,
    warning,
    info,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 sm:bottom-4 sm:right-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const styles = {
    success: "border-green-200 bg-green-50 text-green-900",
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  }

  const Icon = icons[toast.type]

  return (
    <div
      className={`pointer-events-auto flex min-w-[300px] items-start gap-3 rounded-lg border p-4 shadow-lg ${styles[toast.type]}`}
      role="alert"
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
