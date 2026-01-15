import { Languages } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLocale } from "@/contexts/LocaleContext"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en"
    setLocale(nextLocale)

    const segments = location.pathname.split("/")
    const suffix = `${location.search}${location.hash}`
    if (segments.length > 1 && (segments[1] === "en" || segments[1] === "ar")) {
      segments[1] = nextLocale
      navigate(`${segments.join("/")}${suffix}`, { replace: true })
    } else {
      navigate(`/${nextLocale}${location.pathname}${suffix}`, { replace: true })
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      className="gap-2"
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">{locale === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
