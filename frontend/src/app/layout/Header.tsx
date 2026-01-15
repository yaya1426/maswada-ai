import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react"
import { FormattedMessage } from "react-intl"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher"
import { useLocale } from "@/contexts/LocaleContext"

export function Header() {
  const { isLoaded } = useUser()
  const { locale } = useLocale()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to={`/${locale}/notes`}
              className="text-sm font-semibold tracking-wide"
            >
              <FormattedMessage id="header.appName" />
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="header.tagline" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <SignedOut>
              <Link to={`/${locale}/sign-in`}>
                <Button variant="outline" size="sm">
                  <FormattedMessage id="nav.signIn" />
                </Button>
              </Link>
              <Link to={`/${locale}/sign-up`}>
                <Button size="sm">
                  <FormattedMessage id="nav.signUp" />
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              {isLoaded && <UserButton afterSignOutUrl={`/${locale}/sign-in`} />}
            </SignedIn>
          </div>
        </div>
        
      </div>
    </header>
  )
}
