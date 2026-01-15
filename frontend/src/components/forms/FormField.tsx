import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ 
  label, 
  htmlFor, 
  error, 
  required, 
  children,
  className 
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label 
        htmlFor={htmlFor} 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-red-500">{error}</p>
      )}
    </div>
  )
}
