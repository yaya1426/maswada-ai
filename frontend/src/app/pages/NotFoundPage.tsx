import { Link } from "react-router-dom"

import { GlassCard } from "@/components/common/GlassCard"

export function NotFoundPage() {
  return (
    <GlassCard className="px-6 py-12 text-center sm:px-10">
      <h1 className="text-2xl font-semibold text-zinc-900">
        This page drifted away
      </h1>
      <p className="mt-3 text-sm text-zinc-600">
        The route you are looking for does not exist yet.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-700"
      >
        Back to home
      </Link>
    </GlassCard>
  )
}
