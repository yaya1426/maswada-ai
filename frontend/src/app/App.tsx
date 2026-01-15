import { BrowserRouter, Routes, Route } from "react-router-dom"

import { NotesProvider } from "@/contexts/NotesContext"
import { ToastProvider } from "@/contexts/ToastContext"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { AppLayout } from "@/app/layout/AppLayout"
import { NotFoundPage } from "@/app/pages/NotFoundPage"
import { SignInPage } from "@/app/pages/SignInPage"
import { SignUpPage } from "@/app/pages/SignUpPage"
import { NotesPage } from "@/app/pages/NotesPage"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<NotesProvider><AppLayout /></NotesProvider>}>
                <Route path="/" element={<NotesPage />} />
                <Route path="/:noteId" element={<NotesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
