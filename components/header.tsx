"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAnalytics } from "@/hooks/use-analytics"

export function Header() {
  const { trackEvent } = useAnalytics()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Cerrar menú al presionar Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  // Función para cerrar el menú móvil
  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }

  // Funciones de tracking para botones CTA
  const handleConsultaClick = () => {
    trackEvent('cta_click', {
      button_text: 'Consulta Gratuita',
      button_location: 'header',
      event_category: 'engagement'
    })
    closeMobileMenu()
  }

  const handleComenzarClick = () => {
    trackEvent('cta_click', {
      button_text: 'Comenzar Ahora',
      button_location: 'header',
      event_category: 'engagement'
    })
    closeMobileMenu()
  }

  return (
    <header 
      className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50" 
      ref={menuRef}
      style={{ 
        minHeight: '4rem',
        contain: 'layout style'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[4rem] header-container" style={{ contain: 'layout' }}>
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-lg"
              aria-label="Astra Consulting - Ir al inicio"
            >
              <div className="logo-container">
                <img 
                  src="/logo.svg" 
                  alt="Astra Consulting Logo" 
                  className="logo-image"
                  width="200"
                  height="60"
                  loading="eager"
                  decoding="sync"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center" role="navigation" aria-label="Navegación principal">
            <a 
              href="/servicios" 
              className={`relative transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 group ${
                isActive('/servicios') 
                  ? 'text-secondary font-semibold' 
                  : 'text-foreground hover:text-secondary hover:font-semibold'
              }`}
              aria-label="Ver nuestros servicios de consultoría informática"
            >
              Servicios
              <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                isActive('/servicios') 
                  ? 'w-full' 
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="/casos-exito" 
              className={`relative transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 group ${
                isActive('/casos-exito') 
                  ? 'text-secondary font-semibold' 
                  : 'text-foreground hover:text-secondary hover:font-semibold'
              }`}
              aria-label="Ver casos de éxito y testimonios de clientes"
            >
              Casos de Éxito
              <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                isActive('/casos-exito') 
                  ? 'w-full' 
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
            <a 
              href="/sobre-nosotros" 
              className={`relative transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 group ${
                isActive('/sobre-nosotros') 
                  ? 'text-secondary font-semibold' 
                  : 'text-foreground hover:text-secondary hover:font-semibold'
              }`}
              aria-label="Conoce más sobre Astra Consulting"
            >
              Sobre Nosotros
              <span className={`absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                isActive('/sobre-nosotros') 
                  ? 'w-full' 
                  : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <Link href="/#contacto">
              <Button 
                variant="outline" 
                onClick={handleConsultaClick}
                className="hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/20 px-6 py-3 min-h-[44px] h-auto"
                aria-label="Solicitar consulta gratuita"
              >
                <span className="relative z-10">Consulta Gratuita</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button 
                onClick={handleComenzarClick}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-secondary/20 px-6 py-3 min-h-[44px]"
                aria-label="Comenzar transformación digital ahora"
              >
                <span className="relative z-10">Comenzar Ahora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button 
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md p-1" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu" 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 py-4 border-t border-border' 
              : 'max-h-0 opacity-0 py-0 border-t-0'
          }`}
          style={{ 
            willChange: isMenuOpen ? 'auto' : 'max-height, opacity',
            contain: 'layout style'
          }}
        >
          <nav className="flex flex-col space-y-4" role="navigation" aria-label="Navegación móvil">
              <a 
                href="/servicios" 
                onClick={closeMobileMenu}
                className={`transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${
                  isActive('/servicios') 
                    ? 'text-secondary font-semibold bg-secondary/10 rounded-md' 
                    : 'text-foreground hover:text-secondary hover:font-semibold hover:bg-secondary/5 hover:rounded-md'
                }`}
                style={{ transitionDelay: isMenuOpen ? '0.1s' : '0s' }}
                aria-label="Ver nuestros servicios de consultoría informática"
              >
                Servicios
              </a>
              <a 
                href="/casos-exito" 
                onClick={closeMobileMenu}
                className={`transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${
                  isActive('/casos-exito') 
                    ? 'text-secondary font-semibold bg-secondary/10 rounded-md' 
                    : 'text-foreground hover:text-secondary hover:font-semibold hover:bg-secondary/5 hover:rounded-md'
                }`}
                style={{ transitionDelay: isMenuOpen ? '0.2s' : '0s' }}
                aria-label="Ver casos de éxito y testimonios de clientes"
              >
                Casos de Éxito
              </a>
              <a 
                href="/sobre-nosotros" 
                onClick={closeMobileMenu}
                className={`transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:rounded-md px-2 py-1 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                } ${
                  isActive('/sobre-nosotros') 
                    ? 'text-secondary font-semibold bg-secondary/10 rounded-md' 
                    : 'text-foreground hover:text-secondary hover:font-semibold hover:bg-secondary/5 hover:rounded-md'
                }`}
                style={{ transitionDelay: isMenuOpen ? '0.3s' : '0s' }}
                aria-label="Conoce más sobre Astra Consulting"
              >
                Sobre Nosotros
              </a>
              <div className={`flex flex-col space-y-4 pt-4 transform transition-all duration-300 ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '0.4s' : '0s' }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/#contacto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleConsultaClick}
                      className="hover:scale-105 hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 px-6 py-3 min-h-[44px]"
                      aria-label="Solicitar consulta gratuita desde móvil"
                    >
                      Consulta Gratuita
                    </Button>
                  </Link>
                  <Link href="/servicios">
                    <Button 
                      onClick={handleComenzarClick}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/20 px-6 py-3 min-h-[44px]"
                      aria-label="Comenzar transformación digital ahora desde móvil"
                    >
                      Comenzar Ahora
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
      </div>
    </header>
  )
}
