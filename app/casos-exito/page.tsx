import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Target, 
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Search,
  Code,
  Smartphone,
  BarChart3,
  Shield,
  Zap
} from "lucide-react"

export const metadata = {
  title: "Casos de Éxito - Astra Consulting | Proyectos Exitosos",
  description: "Descubre cómo Astra Consulting ha transformado más de 15 empresas. Casos de éxito reales con métricas verificables y testimonios de clientes.",
  keywords: "portfolio proyectos, casos de éxito, resultados verificables, testimonios clientes, transformación digital exitosa, proyectos exitosos",
  openGraph: {
    title: "Casos de Éxito - Astra Consulting",
    description: "Descubre cómo Astra Consulting ha transformado más de 15 empresas con resultados medibles.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casos de Éxito - Astra Consulting",
    description: "Descubre cómo Astra Consulting ha transformado más de 15 empresas con resultados medibles.",
    images: ["https://astraconsulting.cl/og-image.png"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl/casos-exito",
  },
}

const successCases = [
  {
    id: 1,
    company: "Psicología Online Chillán",
    industry: "Salud Mental",
    service: "Desarrollo Web y SEO",
    icon: Search,
    challenge: "Necesidad de una presencia digital profesional para servicios de psicología online en Chillán",
    solution: "Desarrollamos una página web moderna, responsive y optimizada para SEO, con sistema de agendamiento de citas y diseño centrado en la confianza del paciente",
    results: {
      traffic: 200,
      leads: 45,
      revenue: 120,
      timeframe: "3 meses"
    },
    testimonial: {
      text: "Astra Consulting desarrolló mi página web profesional para psicología online. El resultado superó mis expectativas: diseño moderno, fácil navegación y excelente posicionamiento en Google. Ahora mis pacientes pueden encontrarme fácilmente y agendar citas online.",
      author: "Liliana Sepúlveda",
      position: "Psicóloga Clínica",
      company: "Psicología Online Chillán"
    },
    technologies: ["WordPress", "SEO Local", "Responsive Design", "Sistema de Citas"],
    website: "psicologiachillan.cl"
  }
]

const overallStats = [
  {
    icon: TrendingUp,
    value: "300%",
    label: "Aumento promedio en tráfico web",
    description: "Nuestros clientes experimentan un crecimiento significativo en visibilidad online"
  },
  {
    icon: Users,
    value: "15+",
    label: "Empresas y proyectos exitosos",
    description: "Desde startups hasta corporaciones, confiamos en resultados medibles"
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfacción del cliente",
    description: "Excelencia en servicio y resultados que superan expectativas"
  },
  {
    icon: Clock,
    value: "3+",
    label: "Años de experiencia",
    description: "Experiencia sólida en transformación digital y consultoría informática"
  }
]

export default function CasosExitoPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0.1}>
              <Badge variant="secondary" className="mb-6">
                Casos de Éxito Reales
              </Badge>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Resultados que <span className="text-secondary">Hablan por Sí Solos</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto">
                 Descubre cómo hemos transformado más de 15 empresas en Chile con soluciones tecnológicas
                innovadoras y resultados medibles que superan las expectativas.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Resultados Generales</h2>
              <p className="text-xl text-muted-foreground">
                Métricas consolidadas de todos nuestros proyectos exitosos
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {overallStats.map((stat, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="bg-secondary/10 p-4 rounded-lg w-fit mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-bold text-secondary">
                      <AnimatedCounter value={parseFloat(stat.value.replace('%', '').replace('+', ''))} suffix={stat.value.includes('%') ? '%' : stat.value.includes('+') ? '+' : ''} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="font-semibold mb-2">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de Éxito Detallados</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Proyectos reales con resultados verificables y testimonios de nuestros clientes
              </p>
            </div>
          </AnimatedSection>
          
          <div className="space-y-16">
            {successCases.map((case_, index) => (
              <AnimatedSection key={case_.id} delay={0.1 + index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Left Side - Content Simplified */}
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                        <div className="bg-secondary/10 p-3 rounded-lg w-fit">
                          <case_.icon className="h-6 w-6 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold">{case_.company}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-1">
                            <Badge variant="outline" className="w-fit">{case_.industry}</Badge>
                            <Badge variant="secondary" className="w-fit">{case_.service}</Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Challenge & Solution - Simplified */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Desafío:</h4>
                          <p className="text-muted-foreground text-sm">{case_.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Solución:</h4>
                          <p className="text-muted-foreground text-sm">{case_.solution}</p>
                        </div>
                      </div>

                      {/* Key Results - Only 2 most important */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Resultados Clave:</h4>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4">
                          <div className="text-center p-3 sm:p-4 bg-secondary/5 rounded-lg">
                            <div className="text-lg sm:text-2xl font-bold text-secondary">+{case_.results.traffic}%</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">Tráfico Web</div>
                          </div>
                          <div className="text-center p-3 sm:p-4 bg-secondary/5 rounded-lg">
                            <div className="text-lg sm:text-2xl font-bold text-secondary">+{case_.results.leads}%</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">Leads</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial - Simplified */}
                      <div className="border-t border-border pt-4">
                        <div className="flex items-start space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <CheckCircle key={i} className="h-3 w-3 text-secondary fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-muted-foreground italic text-xs sm:text-sm mb-3">
                          "{case_.testimonial.text.length > 120 ? case_.testimonial.text.substring(0, 120) + '...' : case_.testimonial.text}"
                        </blockquote>
                        <div className="text-xs">
                          <div className="font-semibold text-foreground">{case_.testimonial.author}</div>
                          <div className="text-muted-foreground">{case_.testimonial.position}</div>
                          {case_.website && (
                            <div className="mt-1">
                              <a 
                                href={`https://${case_.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-secondary/80 transition-colors underline break-all sm:break-normal"
                              >
                                {case_.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Website Showcase */}
                    {case_.website && (
                      <div className="bg-gradient-to-br from-card to-background p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border">
                        <div className="text-center mb-4 sm:mb-6">
                          <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">Sitio Web Desarrollado</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">Diseño moderno y responsive</p>
                        </div>
                        
                        {/* Imágenes Centradas con Animación Interactiva */}
                        <a 
                          href={`https://${case_.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative h-48 sm:h-64 lg:h-80 flex items-center justify-center mb-4 sm:mb-6 group cursor-pointer block"
                        >
                          {/* Desktop - Imagen principal más alta */}
                          <div className="relative w-4/5 h-32 sm:h-40 lg:h-60 bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl z-10 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-3xl group-hover:-translate-y-2">
                            <Image
                              src="/portafolio-1.png"
                              alt={`Vista desktop de ${case_.website}`}
                              fill
                              className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                            />
                          </div>
                          
                          {/* Mobile - Imagen centrada superpuesta */}
                          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 right-2 sm:right-4 lg:right-8 w-16 sm:w-20 lg:w-24 h-32 sm:h-40 lg:h-48 bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-4 border-white z-20 transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:rotate-2">
                            <Image
                              src="/portafolio-full-1.png"
                              alt={`Vista mobile de ${case_.website}`}
                              fill
                              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                            />
                          </div>
                          
                          {/* Efecto de fondo decorativo */}
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 rounded-2xl sm:rounded-3xl -z-10 transition-all duration-300 ease-out group-hover:from-secondary/20 group-hover:to-accent/20"></div>
                          
                          {/* Overlay de hover con efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 -z-5"></div>
                          
                          {/* Indicador de click */}
                          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/90 text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium opacity-0 transform translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-30">
                            Ver sitio web
                          </div>
                        </a>

                        {/* Información del sitio */}
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Haz clic en las imágenes para visitar: <span className="font-medium text-foreground break-all sm:break-normal">{case_.website}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Quieres Ser Nuestro Próximo Caso de Éxito?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Únete a las más de 15 empresas que ya han transformado su negocio con Astra Consulting
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contacto">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    <span className="relative z-10">Consulta Gratuita</span>
                    <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-secondary hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    <span className="relative z-10">Ver Todos los Servicios</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
