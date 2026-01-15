import { useAuth } from "@clerk/clerk-react"
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"

export function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()
  const location = useLocation()
  const { locale } = useParams<{ locale?: string }>()
  const resolvedLocale = locale === "en" || locale === "ar" ? locale : "ar"

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      </div>
    )
  }

  // Redirect to sign-in if not authenticated, preserving the intended destination
  if (!isSignedIn) {
    return <Navigate to={`/${resolvedLocale}/sign-in`} state={{ from: location }} replace />
  }

  // Render child routes if authenticated
  return <Outlet />
}
