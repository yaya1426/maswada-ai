import { ArrowUpRight, Sparkles } from "lucide-react"

import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"

const typography = [
  { label: "Display", className: "text-4xl md:text-5xl font-semibold" },
  { label: "Heading", className: "text-2xl md:text-3xl font-semibold" },
  { label: "Title", className: "text-xl font-semibold" },
  { label: "Body", className: "text-base text-muted-foreground" },
  { label: "Caption", className: "text-sm text-muted-foreground" },
]

const spacing = [
  "Section spacing: `py-12` or `py-16`",
  "Card padding: `p-6` or `p-8`",
  "Grid gap: `gap-4` or `gap-6`",
  "Stacked spacing: `space-y-4` to `space-y-8`",
]

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="px-6 py-10 sm:px-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Design System
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          A calm, glass-forward interface for Maswada AI
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          This scaffold sets the foundation for an elegant, monochrome product
          experience. Glass panels, refined spacing, and soft borders keep the
          focus on content while staying future-ready for AI workflows.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="outline" size="default" className="gap-2">
            Explore surfaces
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground">
            Minimal palette • Soft blur • Subtle elevation
          </span>
        </div>
      </GlassCard>

      {/* Feature cards */}
      <section className="grid gap-6 md:grid-cols-3">
        {["Glass panels", "Soft borders", "Mono palette"].map((item) => (
          <GlassCard key={item} className="p-6">
            <p className="text-sm font-semibold">{item}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Use the <code className="rounded bg-black/5 px-1 py-0.5 text-xs">glass</code>,{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">glass-card</code>, and{" "}
              <code className="rounded bg-black/5 px-1 py-0.5 text-xs">glass-border</code> utilities to
              keep surfaces consistent across the UI.
            </p>
          </GlassCard>
        ))}
      </section>

      {/* Documentation cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Typography</h2>
          <div className="mt-4 space-y-3">
            {typography.map((item) => (
              <div key={item.label} className="flex items-baseline gap-3">
                <span className="w-20 text-xs uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </span>
                <span className={item.className}>Maswada AI</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Spacing system</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {spacing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </GlassCard>
      </section>
    </div>
  )
}
