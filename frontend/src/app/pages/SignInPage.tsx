import { SignIn } from "@clerk/clerk-react"
import { useLocale } from "@/contexts/LocaleContext"

export function SignInPage() {
  const { locale } = useLocale()

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignIn 
        routing="path" 
        path={`/${locale}/sign-in`}
        signUpUrl={`/${locale}/sign-up`}
        afterSignInUrl={`/${locale}/notes`}
      />
    </div>
  )
}
