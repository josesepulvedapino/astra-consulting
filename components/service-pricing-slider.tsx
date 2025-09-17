"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Star, Search, Code, Smartphone, BarChart3, Shield, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PricingTier {
  name: string
  price: number
  description: string
  features: string[]
  duration?: string
  included: string[]
  popular?: boolean
}

interface ServicePricingData {
  id: number
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<any>
  color: string
  tiers: PricingTier[]
}

const servicePricingData: ServicePricingData[] = [
  {
    id: 1,
    title: "SEO y Marketing Digital",
    subtitle: "Posicionamiento Web Efectivo",
    description: "Transformamos tu presencia digital con estrategias SEO avanzadas y marketing digital integral.",
    icon: Search,
    color: "bg-blue-500",
    tiers: [
      {
        name: "Básico",
        price: 100000,
        description: "Perfecto para empresas que recién comienzan",
        features: [
          "Optimización básica SEO",
          "5 keywords principales",
          "Reporte mensual",
          "Google Analytics setup"
        ],
        duration: "1-2 meses",
        included: ["Auditoría inicial", "Optimización técnica básica"]
      },
      {
        name: "Intermedio",
        price: 200000,
        description: "Ideal para crecimiento sostenido",
        features: [
          "SEO completo + contenido",
          "15 keywords principales",
          "Link building local",
          "Reportes quincenales",
          "Google Ads básico"
        ],
        duration: "2-4 meses",
        included: ["Auditoría completa", "Estrategia de contenido", "Link building"]
      },
      {
        name: "Avanzado",
        price: 350000,
        description: "Máximo rendimiento y resultados",
        features: [
          "SEO + Marketing Digital completo",
          "30+ keywords principales",
          "Link building nacional",
          "Reportes semanales",
          "Google Ads + Facebook Ads",
          "Redes sociales"
        ],
        duration: "3-6 meses",
        included: ["Estrategia integral", "Análisis de competencia", "ROI tracking"],
        popular: true
      }
    ]
  },
  {
    id: 2,
    title: "Desarrollo Web",
    subtitle: "Sitios Web Modernos y Escalables",
    description: "Desarrollamos sitios web modernos, rápidos y optimizados para conversión.",
    icon: Code,
    color: "bg-green-500",
    tiers: [
      {
        name: "Landing Page",
        price: 100000,
        description: "Una página optimizada para conversión",
        features: [
          "1 página responsive",
          "Formulario de contacto",
          "SEO básico incluido",
          "Hosting por 1 año",
          "Soporte técnico 1 mes"
        ],
        duration: "1-2 semanas",
        included: ["Diseño personalizado", "Optimización móvil", "Soporte 1 mes"]
      },
      {
        name: "Sitio Corporativo",
        price: 250000,
        description: "Sitio web completo para empresas",
        features: [
          "5 páginas responsive",
          "Panel administrativo",
          "SEO optimizado",
          "Integración Google Analytics",
          "Hosting + dominio 1 año"
        ],
        duration: "3-4 semanas",
        included: ["CMS personalizado", "Formularios avanzados", "Soporte 2 meses"]
      },
      {
        name: "E-commerce",
        price: 500000,
        description: "Tienda online completa",
        features: [
          "Catálogo de productos",
          "Carrito de compras",
          "Pagos online integrados",
          "Panel de administración",
          "SEO + Marketing digital"
        ],
        duration: "6-8 semanas",
        included: ["Integración de pagos", "Gestión de inventario", "Soporte 3 meses"],
        popular: true
      }
    ]
  },
  {
    id: 3,
    title: "Aplicaciones",
    subtitle: "Web y Móviles que Conectan con tus Clientes",
    description: "Desarrollamos aplicaciones web progresivas y móviles que conectan directamente con tus clientes.",
    icon: Smartphone,
    color: "bg-purple-500",
    tiers: [
      {
        name: "App Web Básica",
        price: 200000,
        description: "Aplicación web simple para tu negocio",
        features: [
          "Aplicación web responsive",
          "Funcionalidades básicas",
          "Integración con backend",
          "Optimización para móviles"
        ],
        duration: "3-4 semanas",
        included: ["Diseño UX/UI", "Testing básico", "Soporte 1 mes"]
      },
      {
        name: "App Móvil",
        price: 400000,
        description: "App móvil completa iOS y Android",
        features: [
          "Diseño iOS y Android",
          "Funcionalidades avanzadas",
          "Push notifications",
          "Publicación en stores"
        ],
        duration: "6-8 semanas",
        included: ["Backend básico", "Soporte 2 meses"]
      },
      {
        name: "PWA Completa",
        price: 600000,
        description: "Aplicación web progresiva con funcionalidades móviles",
        features: [
          "PWA con funcionalidades offline",
          "Notificaciones push web",
          "Instalación en dispositivos",
          "Sincronización de datos",
          "Analytics avanzado"
        ],
        duration: "8-12 semanas",
        included: ["Backend completo", "Soporte 3 meses"],
        popular: true
      }
    ]
  },
  {
    id: 4,
    title: "Análisis de Datos",
    subtitle: "Business Intelligence y Analytics",
    description: "Transformamos tus datos en insights accionables para decisiones estratégicas.",
    icon: BarChart3,
    color: "bg-orange-500",
    tiers: [
      {
        name: "Básico",
        price: 150000,
        description: "Análisis básico de datos",
        features: [
          "Dashboard simple",
          "Reportes mensuales",
          "KPIs básicos",
          "Capacitación inicial"
        ],
        duration: "1-2 meses",
        included: ["Setup inicial", "2 reportes", "Soporte 1 mes"]
      },
      {
        name: "Avanzado",
        price: 300000,
        description: "Business Intelligence completo",
        features: [
          "Dashboards interactivos",
          "Reportes automatizados",
          "Predicciones con IA",
          "Alertas inteligentes"
        ],
        duration: "2-4 meses",
        included: ["Integración completa", "Capacitación avanzada", "Soporte 2 meses"],
        popular: true
      }
    ]
  },
  {
    id: 5,
    title: "Ciberseguridad",
    subtitle: "Protección Integral Digital",
    description: "Protegemos tu infraestructura digital con auditorías y mejores prácticas.",
    icon: Shield,
    color: "bg-red-500",
    tiers: [
      {
        name: "Básico",
        price: 100000,
        description: "Protección esencial",
        features: [
          "Auditoría de seguridad",
          "Backup automático",
          "Antivirus empresarial",
          "Capacitación básica"
        ],
        duration: "1 mes",
        included: ["Reporte de vulnerabilidades", "Plan de mejora", "Soporte 1 mes"]
      },
      {
        name: "Completo",
        price: 250000,
        description: "Protección integral",
        features: [
          "Monitoreo 24/7",
          "Cumplimiento normativo",
          "Plan de respuesta",
          "Certificaciones"
        ],
        duration: "2-3 meses",
        included: ["Implementación completa", "Soporte 2 meses"],
        popular: true
      }
    ]
  },
  {
    id: 6,
    title: "Automatización",
    subtitle: "Optimización de Procesos",
    description: "Optimizamos tus procesos con automatización inteligente y workflows.",
    icon: Zap,
    color: "bg-yellow-500",
    tiers: [
      {
        name: "Básico",
        price: 120000,
        description: "Automatización simple",
        features: [
          "Workflows básicos",
          "Integración de 2 sistemas",
          "Reportes automáticos",
          "Capacitación inicial"
        ],
        duration: "1-2 meses",
        included: ["Setup inicial", "2 automatizaciones", "Soporte 1 mes"]
      },
      {
        name: "Avanzado",
        price: 280000,
        description: "Automatización completa",
        features: [
          "Workflows complejos",
          "Chatbots inteligentes",
          "RPA avanzado",
          "Integración total"
        ],
        duration: "2-4 meses",
        included: ["Implementación completa", "Soporte 3 meses"],
        popular: true
      }
    ]
  }
]

export function ServicePricingSlider() {
  const [selectedService, setSelectedService] = useState(0)
  const [selectedTier, setSelectedTier] = useState(0)

  const currentService = servicePricingData[selectedService]
  const currentTier = currentService.tiers[selectedTier]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      {/* Service Selector */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Selecciona tu Servicio</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {servicePricingData.map((service, index) => (
            <button
              key={service.id}
              onClick={() => {
                setSelectedService(index)
                setSelectedTier(0)
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedService === index
                  ? 'border-secondary bg-secondary/10 shadow-lg'
                  : 'border-border hover:border-secondary/50'
              }`}
            >
              <div className="bg-secondary/10 p-3 rounded-lg mb-2 w-fit mx-auto">
                <service.icon className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-sm font-semibold">{service.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {service.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Service Info */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5">
          <div className="flex items-center space-x-4">
            <div className="bg-secondary/10 p-4 rounded-lg">
              <currentService.icon className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-2xl">{currentService.title}</CardTitle>
              <p className="text-secondary font-semibold">{currentService.subtitle}</p>
              <p className="text-muted-foreground mt-2">{currentService.description}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pricing Slider */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Selecciona tu Plan</h4>
                
                {/* Tier Selector */}
                <div className="space-y-3 mb-6">
                  {currentService.tiers.map((tier, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTier(index)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedTier === index
                          ? 'border-secondary bg-secondary/10 shadow-md'
                          : 'border-border hover:border-secondary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{tier.name}</span>
                            {tier.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {tier.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-secondary">
                            {formatPrice(tier.price)}
                          </div>
                          {tier.duration && (
                            <div className="text-xs text-muted-foreground">
                              {tier.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Tier Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Detalles del Plan</h4>
                <div className="bg-secondary/5 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-xl font-bold">{currentTier.name}</h5>
                      <p className="text-muted-foreground">{currentTier.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-secondary">
                        {formatPrice(currentTier.price)}
                      </div>
                      {currentTier.duration && (
                        <div className="text-sm text-muted-foreground">
                          {currentTier.duration}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold mb-2">Características Incluidas:</h6>
                      <div className="space-y-2">
                        {currentTier.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold mb-2">Incluye:</h6>
                      <div className="space-y-1">
                        {currentTier.included.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Star className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link href="/#contacto" onClick={(e) => {
                e.preventDefault()
                // Guardar datos en localStorage para el formulario
                const serviceData = {
                  service: currentService.title,
                  plan: currentTier.name,
                  price: currentTier.price,
                  description: currentTier.description
                }
                localStorage.setItem('selectedService', JSON.stringify(serviceData))
                
                // Redirigir a inicio y hacer scroll
                window.location.href = '/#contacto'
              }}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden">
                  <span className="relative z-10">Solicitar este Plan</span>
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
