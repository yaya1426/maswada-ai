import { SignIn } from "@clerk/clerk-react"

export function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignIn 
        routing="path" 
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/"
      />
    </div>
  )
}
