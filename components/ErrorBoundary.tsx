'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          retry={() => this.setState({ hasError: false, error: undefined })}
        />
      )
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800">
            Oops! Something went wrong
          </h3>
          <p className="text-slate-600 max-w-md">
            We encountered an unexpected error. Don't worry, you can try refreshing this section.
          </p>
          {error && (
            <details className="mt-4 text-sm text-slate-500">
              <summary className="cursor-pointer hover:text-slate-700">
                Technical details
              </summary>
              <pre className="mt-2 p-2 bg-slate-100 rounded text-xs overflow-auto max-w-md">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary