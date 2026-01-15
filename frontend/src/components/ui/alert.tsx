import * as React from "react"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertProps {
  variant?: "default" | "success" | "error" | "warning" | "info"
  className?: string
  children: React.ReactNode
}

const variantStyles = {
  default: "border-border bg-background text-foreground",
  success: "border-green-200 bg-green-50 text-green-900",
  error: "border-red-200 bg-red-50 text-red-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
}

const variantIcons = {
  default: Info,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

export function Alert({ variant = "default", className, children }: AlertProps) {
  const Icon = variantIcons[variant]

  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border p-4",
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  )
}

interface AlertTitleProps {
  className?: string
  children: React.ReactNode
}

export function AlertTitle({ className, children }: AlertTitleProps) {
  return <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)}>{children}</h5>
}

interface AlertDescriptionProps {
  className?: string
  children: React.ReactNode
}

export function AlertDescription({ className, children }: AlertDescriptionProps) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)}>{children}</div>
}
