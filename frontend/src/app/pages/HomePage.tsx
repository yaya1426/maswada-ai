import { Link } from "react-router-dom"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { FormattedMessage } from "react-intl"
import { Sparkles, FileText, Languages, Zap } from "lucide-react"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Smart Notes",
    description: "Create and organize your notes with a beautiful, intuitive interface.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "AI-Powered",
    description: "Summarize, rewrite, and enhance your notes with advanced AI features.",
  },
  {
    icon: <Languages className="h-8 w-8" />,
    title: "Bilingual Support",
    description: "Full support for English and Arabic with automatic RTL text handling.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Built with modern React 19 for instant performance and seamless experience.",
  },
]

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <GlassCard className="px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <FormattedMessage id="home.hero.badge" />
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          <FormattedMessage id="home.hero.title" />
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          <FormattedMessage id="home.hero.description" />
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <SignedOut>
            <Link to="/sign-up">
              <Button size="lg" className="gap-2">
                <FormattedMessage id="home.hero.getStarted" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link to="/notes">
              <Button size="lg" className="gap-2">
                <FormattedMessage id="home.hero.viewNotes" />
              </Button>
            </Link>
            <Link to="/notes/new">
              <Button variant="outline" size="lg">
                <FormattedMessage id="nav.createNote" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </GlassCard>

      {/* Features grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <GlassCard key={feature.title} className="p-6">
            <div className="mb-4 text-muted-foreground">{feature.icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </GlassCard>
        ))}
      </section>
    </div>
  )
}
