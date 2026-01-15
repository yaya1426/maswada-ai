import { Languages } from "lucide-react"
import { useLocale } from "@/contexts/LocaleContext"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en")
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
