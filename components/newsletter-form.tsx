"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  className?: string
  showName?: boolean
  buttonText?: string
  placeholder?: string
}

export function NewsletterForm({ 
  className = "", 
  showName = false, 
  buttonText = "Suscribirse Gratis",
  placeholder = "Tu correo electrónico"
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setIsSuccess(false)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setIsSuccess(true)
        setMessage(data.message)
        setEmail('')
        setName('')
        
        // Limpiar mensaje después de 5 segundos
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => {
          setMessage('')
          setIsSuccess(false)
        }, 5000)
      } else {
        setIsSuccess(false)
        setMessage(data.message)
        // Auto-ocultar también errores
        if (hideTimer.current) clearTimeout(hideTimer.current)
        hideTimer.current = setTimeout(() => {
          setMessage('')
          setIsSuccess(false)
        }, 5000)
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage('Error de conexión. Inténtalo más tarde.')
      // Auto-ocultar también errores
      if (hideTimer.current) clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => {
        setMessage('')
        setIsSuccess(false)
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showName && (
          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
          />
        )}
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all duration-300"
        />
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale transition-all duration-300 cursor-pointer group relative overflow-hidden"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Suscribiendo...
            </>
          ) : (
            <>
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </Button>
      </form>

      {/* Alert de resultado (auto-oculta y color secundario para éxito y error) */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={
            'mt-4 p-4 rounded-lg border transition-all duration-300 bg-secondary/10 border-secondary/30 text-secondary'
          }
        >
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle className="h-5 w-5 text-secondary" />
            ) : (
              <XCircle className="h-5 w-5 text-secondary" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
