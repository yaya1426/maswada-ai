import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ClerkProvider } from "@clerk/clerk-react"
import { IntlProvider } from "react-intl"
import { LocaleProvider, useLocale } from "@/contexts/LocaleContext"
import { messages } from "@/i18n/messages"
import "./index.css"
import App from "@/app/App"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file")
}

function AppWithIntl() {
  const { locale } = useLocale()
  
  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      <App />
    </IntlProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <LocaleProvider>
        <AppWithIntl />
      </LocaleProvider>
    </ClerkProvider>
  </StrictMode>
)
