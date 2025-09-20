"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Target, Check, X } from "lucide-react"

export function CookieSettings() {
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre true, no se puede desactivar
    analytics: false,
    marketing: false
  })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [isAcceptingAll, setIsAcceptingAll] = useState(false)
  const [isAcceptingNecessary, setIsAcceptingNecessary] = useState(false)

  useEffect(() => {
    // Cargar preferencias guardadas
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
    setHasLoaded(true)
  }, [])

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return // No se puede desactivar
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }


  const acceptAll = async () => {
    setIsAcceptingAll(true)
    
    // Simular un pequeño delay para la animación
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    
    // Habilitar Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
    
    setIsAcceptingAll(false)
  }

  const acceptNecessary = async () => {
    setIsAcceptingNecessary(true)
    
    // Simular un pequeño delay para la animación
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    }
    setPreferences(necessaryOnly)
    localStorage.setItem('cookie-consent', JSON.stringify(necessaryOnly))
    
    // Deshabilitar Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
    
    setIsAcceptingNecessary(false)
  }

  if (!hasLoaded) {
    return <div className="text-center py-4">Cargando configuración...</div>
  }

  return (
    <div className="space-y-6">
      {/* Estado actual */}
      <div className="p-4 bg-secondary/5 rounded-lg border">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-secondary" />
          Estado Actual de las Cookies
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-card rounded-md">
            <span className="text-sm">Necesarias:</span>
            <span className="flex items-center gap-1 text-secondary">
              <Check className="h-3 w-3" />
              <span className="text-xs">Activas</span>
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded-md">
            <span className="text-sm">Analíticas:</span>
            <span className={`flex items-center gap-1 ${preferences.analytics ? 'text-secondary' : 'text-muted-foreground'}`}>
              {preferences.analytics ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              <span className="text-xs">{preferences.analytics ? 'Activas' : 'Inactivas'}</span>
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded-md">
            <span className="text-sm">Marketing:</span>
            <span className={`flex items-center gap-1 ${preferences.marketing ? 'text-secondary' : 'text-muted-foreground'}`}>
              {preferences.marketing ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              <span className="text-xs">{preferences.marketing ? 'Activas' : 'Inactivas'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Configuración individual */}
      <div className="space-y-4">
        {/* Cookies Necesarias */}
        <Card className="border-secondary/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg flex-shrink-0">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base">Cookies Necesarias</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Esenciales para el funcionamiento del sitio web
                  </p>
                </div>
              </div>
              <div className="bg-secondary/20 px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                Siempre Activas
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies Analíticas */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg flex-shrink-0">
                  <Eye className="h-5 w-5 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base">Cookies Analíticas</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Google Analytics para entender cómo usas nuestro sitio
                  </p>
                </div>
              </div>
              <Button
                variant={preferences.analytics ? "default" : "outline"}
                size="sm"
                onClick={() => togglePreference('analytics')}
                className="w-full sm:w-auto min-w-[100px] h-10 cursor-pointer"
                aria-label={`${preferences.analytics ? 'Desactivar' : 'Activar'} cookies analíticas`}
                aria-pressed={preferences.analytics}
              >
                {preferences.analytics ? "Activa" : "Inactiva"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cookies de Marketing */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg flex-shrink-0">
                  <Target className="h-5 w-5 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm sm:text-base">Cookies de Marketing</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Para personalizar anuncios y contenido relevante
                  </p>
                </div>
              </div>
              <Button
                variant={preferences.marketing ? "default" : "outline"}
                size="sm"
                onClick={() => togglePreference('marketing')}
                className="w-full sm:w-auto min-w-[100px] h-10 cursor-pointer"
                aria-label={`${preferences.marketing ? 'Desactivar' : 'Activar'} cookies de marketing`}
                aria-pressed={preferences.marketing}
              >
                {preferences.marketing ? "Activa" : "Inactiva"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          onClick={acceptAll}
          disabled={isAcceptingAll}
          className={`bg-secondary hover:bg-secondary/90 transition-all duration-300 cursor-pointer ${
            isAcceptingAll ? 'animate-pulse' : ''
          }`}
          aria-label="Aceptar todas las cookies incluyendo analíticas y marketing"
        >
          <Check className={`h-4 w-4 mr-2 transition-transform duration-300 ${
            isAcceptingAll ? 'animate-spin' : ''
          }`} />
          {isAcceptingAll ? 'Aceptando...' : 'Aceptar Todas'}
        </Button>
        <Button 
          onClick={acceptNecessary}
          disabled={isAcceptingNecessary}
          variant="outline"
          className={`transition-all duration-300 cursor-pointer ${
            isAcceptingNecessary ? 'animate-pulse' : ''
          }`}
          aria-label="Aceptar solo cookies necesarias para el funcionamiento del sitio"
        >
          <X className={`h-4 w-4 mr-2 transition-transform duration-300 ${
            isAcceptingNecessary ? 'animate-spin' : ''
          }`} />
          {isAcceptingNecessary ? 'Aceptando...' : 'Solo Necesarias'}
        </Button>
      </div>

      {/* Información adicional */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Nota:</strong> Los cambios se aplicarán inmediatamente. Las cookies necesarias siempre permanecen activas para garantizar el funcionamiento del sitio web.
        </p>
      </div>
    </div>
  )
}
