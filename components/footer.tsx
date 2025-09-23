"use client"

import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo" aria-label="Pie de página de Astra Consulting">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity cursor-pointer">
              <img 
                src="/logo.svg" 
                alt="Astra Consulting Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">Consulting</span>
            </a>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Consultoría informática líder en Chile, especializada en transformación digital, SEO y desarrollo de
              soluciones tecnológicas innovadoras para empresas de todos los tamaños.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/astraconsulting-cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
                aria-label="Síguenos en LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/astraconsulting.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Ver Todos los Servicios
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  SEO y Marketing Digital
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Aplicaciones Móviles
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Análisis de Datos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Ciberseguridad
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Automatización
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/casos-exito" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                <div className="text-primary-foreground/80">
                  Chillán, Chile
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <a href="https://wa.me/56926873545" className="text-primary-foreground/80 hover:text-secondary transition-colors">+56 9 2687 3545</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:contacto@astraconsulting.cl" className="text-primary-foreground/80 hover:text-secondary transition-colors">contacto@astraconsulting.cl</a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
              <div className="text-sm font-semibold text-secondary mb-2">Consulta Gratuita</div>
              <p className="text-xs text-primary-foreground/80">
                Agenda tu consulta gratuita y descubre cómo podemos transformar tu negocio.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              © 2025 Astra Consulting. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/politica-privacidad" className="text-primary-foreground/60 hover:text-secondary transition-colors" aria-current={pathname === '/politica-privacidad' ? 'page' : undefined}>
                Política de Privacidad
              </Link>
              <Link href="/terminos-servicio" className="text-primary-foreground/60 hover:text-secondary transition-colors" aria-current={pathname === '/terminos-servicio' ? 'page' : undefined}>
                Términos de Servicio
              </Link>
              <Link href="/cookies" className="text-primary-foreground/60 hover:text-secondary transition-colors" aria-current={pathname === '/cookies' ? 'page' : undefined}>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
