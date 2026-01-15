import { SignUp } from "@clerk/clerk-react"
import { useLocale } from "@/contexts/LocaleContext"

export function SignUpPage() {
  const { locale } = useLocale()

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignUp 
        routing="path" 
        path={`/${locale}/sign-up`}
        signInUrl={`/${locale}/sign-in`}
        afterSignUpUrl={`/${locale}/notes`}
      />
    </div>
  )
}
