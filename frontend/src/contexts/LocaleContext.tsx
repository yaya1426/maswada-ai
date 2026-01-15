import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Locale } from "@/types"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: "ltr" | "rtl"
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const LOCALE_STORAGE_KEY = "maswada-locale"

interface LocaleProviderProps {
  children: ReactNode
  routeLocale?: Locale
}

export function LocaleProvider({ children, routeLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Initialize from route, localStorage, or default to 'ar'
    if (routeLocale) return routeLocale
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    return stored === "ar" || stored === "en" ? stored : "ar"
  })

  const dir = locale === "ar" ? "rtl" : "ltr"

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
  }

  // Sync locale with route when it changes
  useEffect(() => {
    if (!routeLocale) return
    if (routeLocale !== locale) {
      setLocaleState(routeLocale)
      localStorage.setItem(LOCALE_STORAGE_KEY, routeLocale)
    }
  }, [routeLocale, locale])

  // Update document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale, dir])

  const value: LocaleContextValue = {
    locale,
    setLocale,
    dir,
  }

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
