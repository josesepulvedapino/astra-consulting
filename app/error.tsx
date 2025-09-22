"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-semibold text-foreground">
            Algo salió mal
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Intentar de nuevo
          </Button>
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/" aria-label="Ir al inicio">
              <Home className="h-4 w-4" />
              Ir al Inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
