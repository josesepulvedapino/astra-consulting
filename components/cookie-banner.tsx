"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Cookie, Settings, Shield, X } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre true, no se puede desactivar
    analytics: false,
    marketing: false
  })

  useEffect(() => {
    // Verificar si ya se ha dado consentimiento
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    
    // Habilitar Google Analytics si se acepta
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    setPreferences(necessaryOnly)
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly))
    setShowBanner(false)
    
    // Deshabilitar Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
  }

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowSettings(false)
    
    // Actualizar consentimiento de Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      })
    }
  }

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return // No se puede desactivar
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50">
      <Card className="p-4 shadow-xl border border-border/50 bg-card/95 backdrop-blur-md">
        {!showSettings ? (
          // Vista principal del banner - Compacta
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-secondary/10 p-1.5 rounded-md">
                <Cookie className="h-4 w-4 text-secondary" />
              </div>
              <h3 className="font-medium text-sm">Cookies</h3>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              Usamos cookies para mejorar tu experiencia. Puedes personalizar tus preferencias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={acceptAll}
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-xs h-10 px-4 cursor-pointer"
                aria-label="Aceptar todas las cookies"
              >
                Aceptar
              </Button>
              <Button 
                onClick={acceptNecessary}
                variant="outline"
                size="sm"
                className="text-xs h-10 px-4 cursor-pointer"
                aria-label="Aceptar solo cookies necesarias"
              >
                Solo Necesarias
              </Button>
              <Button 
                onClick={() => setShowSettings(true)}
                variant="ghost"
                size="sm"
                className="text-xs h-10 w-10 p-0 cursor-pointer"
                aria-label="Abrir configuración de cookies"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Vista de configuración detallada - Compacta
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Configuración</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(false)}
                className="h-8 w-8 p-0 cursor-pointer"
                aria-label="Cerrar configuración de cookies"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {/* Cookies Necesarias */}
              <div className="flex items-center justify-between p-2 bg-secondary/5 rounded-md">
                <div>
                  <h4 className="font-medium text-xs">Necesarias</h4>
                  <p className="text-xs text-muted-foreground">
                    Funcionamiento del sitio
                  </p>
                </div>
                <div className="bg-secondary/20 px-2 py-1 rounded-full text-xs font-medium">
                  Siempre
                </div>
              </div>

              {/* Cookies Analíticas */}
              <div className="flex items-center justify-between p-2 bg-card rounded-md border">
                <div>
                  <h4 className="font-medium text-xs">Analíticas</h4>
                  <p className="text-xs text-muted-foreground">
                    Google Analytics
                  </p>
                </div>
                <Button
                  variant={preferences.analytics ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePreference('analytics')}
                  className="h-8 px-3 text-xs cursor-pointer min-w-[60px]"
                  aria-label={`${preferences.analytics ? 'Desactivar' : 'Activar'} cookies analíticas`}
                  aria-pressed={preferences.analytics}
                >
                  {preferences.analytics ? "ON" : "OFF"}
                </Button>
              </div>

              {/* Cookies de Marketing */}
              <div className="flex items-center justify-between p-2 bg-card rounded-md border">
                <div>
                  <h4 className="font-medium text-xs">Marketing</h4>
                  <p className="text-xs text-muted-foreground">
                    Anuncios personalizados
                  </p>
                </div>
                <Button
                  variant={preferences.marketing ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePreference('marketing')}
                  className="h-8 px-3 text-xs cursor-pointer min-w-[60px]"
                  aria-label={`${preferences.marketing ? 'Desactivar' : 'Activar'} cookies de marketing`}
                  aria-pressed={preferences.marketing}
                >
                  {preferences.marketing ? "ON" : "OFF"}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={savePreferences}
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-xs h-10 px-4 cursor-pointer"
                aria-label="Guardar configuración de cookies"
              >
                Guardar
              </Button>
              <Button 
                onClick={acceptAll}
                variant="outline"
                size="sm"
                className="text-xs h-10 px-4 cursor-pointer"
                aria-label="Aceptar todas las cookies"
              >
                Aceptar Todas
              </Button>
              <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center">
                Más información
              </Link>
            </div>
          </div>
          )}
        </Card>
      </div>
  )
}
