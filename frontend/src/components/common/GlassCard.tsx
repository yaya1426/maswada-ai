import type { HTMLAttributes } from "react"

export type GlassCardProps = HTMLAttributes<HTMLDivElement>

/**
 * Glass card component - for content cards with rounded corners.
 * Uses bg-white/70 with stronger backdrop blur and rounded-2xl.
 */
export function GlassCard({ className = "", ...props }: GlassCardProps) {
  return <div className={`glass-card ${className}`} {...props} />
}
