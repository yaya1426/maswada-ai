import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom"
import { IntlProvider } from "react-intl"

import { NotesProvider } from "@/contexts/NotesContext"
import { ToastProvider } from "@/contexts/ToastContext"
import { LocaleProvider } from "@/contexts/LocaleContext"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { AppLayout } from "@/app/layout/AppLayout"
import { NotFoundPage } from "@/app/pages/NotFoundPage"
import { SignInPage } from "@/app/pages/SignInPage"
import { SignUpPage } from "@/app/pages/SignUpPage"
import { NotesPage } from "@/app/pages/NotesPage"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { messages } from "@/i18n/messages"

function LocaleScopedApp() {
  const { locale } = useParams<{ locale?: string }>()
  const location = useLocation()
  const resolvedLocale = locale === "en" || locale === "ar" ? locale : "ar"

  if (locale !== resolvedLocale) {
    const nextPath = `/${resolvedLocale}${location.pathname.replace(/^\/[^/]+/, "")}`
    return <Navigate to={nextPath} replace />
  }

  return (
    <LocaleProvider routeLocale={resolvedLocale}>
      <IntlProvider messages={messages[resolvedLocale]} locale={resolvedLocale} defaultLocale="ar">
        <ToastProvider>
          <Routes>
            {/* Public routes */}
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<NotesProvider><AppLayout /></NotesProvider>}>
                <Route path="notes" element={<NotesPage />} />
                <Route path="notes/:noteId" element={<NotesPage />} />
                <Route path="" element={<NotesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </ToastProvider>
      </IntlProvider>
    </LocaleProvider>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/ar" replace />} />
          <Route path="/:locale/*" element={<LocaleScopedApp />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
