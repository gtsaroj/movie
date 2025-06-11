import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#ffffff] mb-4">Something went wrong!</h2>
        <p className="text-[#acacac] mb-6">{error.message}</p>
        <Button 
          onClick={resetErrorBoundary}
          className="bg-[var(--primary-color)] text-[#000000] hover:bg-[#b3e600]"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

export function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={reset}
    >
      {children}
    </ErrorBoundary>
  )
}


