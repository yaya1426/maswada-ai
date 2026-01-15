import { SignUp } from "@clerk/clerk-react"

export function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <SignUp 
        routing="path" 
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/"
      />
    </div>
  )
}
