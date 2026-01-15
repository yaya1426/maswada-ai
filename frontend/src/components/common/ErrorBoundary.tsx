import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { GlassCard } from "./GlassCard"
import { Button } from "../ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = "/"
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <GlassCard className="w-full max-w-md p-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              An unexpected error occurred. Please try refreshing the page or return to the home page.
            </p>
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                  Error details
                </summary>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                Refresh Page
              </Button>
              <Button onClick={this.handleReset} className="flex-1">
                Go Home
              </Button>
            </div>
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
}
