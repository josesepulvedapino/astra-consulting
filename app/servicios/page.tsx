import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Search, 
  Code, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"

export const metadata = {
  title: "Servicios - Astra Consulting | Consultoría Informática y Transformación Digital",
  description: "Descubre todos nuestros servicios: SEO, desarrollo web, apps móviles, análisis de datos, ciberseguridad y automatización. Soluciones tecnológicas para empresas chilenas.",
  keywords: "servicios tecnológicos, SEO Chile, desarrollo web, aplicaciones móviles, análisis de datos, ciberseguridad, automatización, consultoría informática",
  openGraph: {
    title: "Servicios - Astra Consulting",
    description: "Soluciones tecnológicas completas para transformar tu empresa digitalmente.",
    type: "website",
  },
}

const services = [
  {
    id: 1,
    icon: Search,
    title: "SEO y Marketing Digital",
    subtitle: "Posicionamiento Web Efectivo",
    description: "Transformamos tu presencia digital con estrategias SEO avanzadas y marketing digital integral. Aumentamos tu visibilidad en Google y generamos más leads calificados para tu negocio.",
    detailedDescription: "Nuestro enfoque integral combina técnicas SEO técnicas y de contenido, marketing digital estratégico y análisis de datos para maximizar tu ROI. Trabajamos con las últimas herramientas y metodologías para posicionar tu empresa en los primeros resultados de búsqueda.",
    features: [
      "Auditoría SEO completa y análisis técnico",
      "Optimización on-page y off-page",
      "Link building local y nacional",
      "Análisis de competencia y keywords",
      "Marketing de contenidos estratégico",
      "Google Ads y Facebook Ads optimizados",
      "Analytics y reportes detallados",
      "Estrategia de redes sociales"
    ],
    technologies: ["Google Analytics", "Search Console", "SEMrush", "Ahrefs", "WordPress", "Yoast SEO"],
    benefits: [
      "Aumento del 300% en tráfico orgánico",
      "Mejora en posicionamiento de keywords",
      "Generación de leads calificados",
      "ROI medible y reportes transparentes"
    ],
    pricing: "Desde $500.000/mes",
    duration: "3-6 meses para resultados visibles",
    industry: "Todas las industrias",
    color: "bg-blue-500"
  },
  {
    id: 2,
    icon: Code,
    title: "Desarrollo Web Avanzado",
    subtitle: "Sitios Web Modernos y Escalables",
    description: "Desarrollamos sitios web modernos, rápidos y optimizados para conversión. Utilizamos tecnologías de última generación adaptadas específicamente a las necesidades de tu negocio.",
    detailedDescription: "Creamos experiencias web excepcionales que no solo se ven increíbles, sino que también funcionan perfectamente. Desde sitios corporativos hasta e-commerce complejos, utilizamos las mejores prácticas de desarrollo y diseño UX/UI.",
    features: [
      "Desarrollo con React y Next.js",
      "E-commerce personalizado y escalable",
      "Aplicaciones web progresivas (PWA)",
      "Integración de APIs y sistemas",
      "Optimización de rendimiento",
      "Diseño responsive y accesible",
      "SEO técnico integrado",
      "Mantenimiento y soporte continuo"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Vercel"],
    benefits: [
      "Sitios web 3x más rápidos",
      "Mejor experiencia de usuario",
      "Conversión optimizada",
      "Escalabilidad garantizada"
    ],
    pricing: "Desde $1.500.000",
    duration: "4-8 semanas",
    industry: "E-commerce, Corporativo, SaaS",
    color: "bg-green-500"
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    subtitle: "Apps que Conectan con tus Clientes",
    description: "Desarrollamos aplicaciones móviles nativas e híbridas que conectan directamente con tus clientes. Creamos experiencias móviles que impulsan el engagement y aumentan las ventas.",
    detailedDescription: "En un mundo móvil, tu aplicación es la puerta de entrada a tus clientes. Desarrollamos apps que no solo funcionan perfectamente, sino que también generan valor real para tu negocio y tus usuarios.",
    features: [
      "Desarrollo nativo iOS y Android",
      "Apps híbridas con React Native",
      "Diseño UX/UI optimizado",
      "Integración con sistemas backend",
      "Notificaciones push personalizadas",
      "Analytics y métricas de uso",
      "Actualizaciones y mantenimiento",
      "Publicación en App Store y Google Play"
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Expo", "Stripe", "OneSignal"],
    benefits: [
      "Mayor engagement con clientes",
      "Acceso directo a usuarios",
      "Aumento en ventas móviles",
      "Branding y presencia digital"
    ],
    pricing: "Desde $2.000.000",
    duration: "6-12 semanas",
    industry: "Retail, Salud, Fintech, Servicios",
    color: "bg-purple-500"
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Análisis de Datos",
    subtitle: "Business Intelligence y Analytics",
    description: "Transformamos tus datos en insights accionables. Implementamos soluciones de Business Intelligence y analytics avanzados para decisiones estratégicas informadas.",
    detailedDescription: "Los datos son el activo más valioso de tu empresa. Convertimos información compleja en dashboards claros y reportes automatizados que impulsan la toma de decisiones estratégicas.",
    features: [
      "Dashboards interactivos personalizados",
      "Reportes automatizados y programados",
      "KPIs y métricas personalizadas",
      "Predicción de tendencias con IA",
      "Integración de múltiples fuentes de datos",
      "Visualizaciones avanzadas",
      "Alertas y notificaciones inteligentes",
      "Capacitación y soporte técnico"
    ],
    technologies: ["Power BI", "Tableau", "Python", "SQL Server", "Azure", "Google Analytics", "Machine Learning"],
    benefits: [
      "Decisiones basadas en datos",
      "Identificación de oportunidades",
      "Optimización de procesos",
      "ROI medible y transparente"
    ],
    pricing: "Desde $800.000/mes",
    duration: "2-4 meses",
    industry: "Manufactura, Retail, Servicios, Salud",
    color: "bg-orange-500"
  },
  {
    id: 5,
    icon: Shield,
    title: "Ciberseguridad",
    subtitle: "Protección Integral Digital",
    description: "Protegemos tu infraestructura digital con auditorías de seguridad completas e implementación de mejores prácticas. Garantizamos la seguridad de tus datos y sistemas.",
    detailedDescription: "En un mundo digital, la seguridad no es opcional. Implementamos medidas de protección integrales que protegen tu empresa, tus clientes y tu reputación contra amenazas cibernéticas.",
    features: [
      "Auditorías de seguridad completas",
      "Protección de datos y privacidad",
      "Backup automático y recuperación",
      "Monitoreo 24/7 de amenazas",
      "Cumplimiento normativo (Ley de Protección de Datos)",
      "Capacitación en seguridad",
      "Plan de respuesta a incidentes",
      "Certificaciones de seguridad"
    ],
    technologies: ["ISO 27001", "GDPR", "Firewall", "Antivirus", "Encryption", "VPN", "SIEM"],
    benefits: [
      "Protección contra amenazas",
      "Cumplimiento normativo",
      "Confianza de clientes",
      "Reducción de riesgos"
    ],
    pricing: "Desde $600.000/mes",
    duration: "1-3 meses",
    industry: "Todas las industrias",
    color: "bg-red-500"
  },
  {
    id: 6,
    icon: Zap,
    title: "Automatización",
    subtitle: "Optimización de Procesos Empresariales",
    description: "Optimizamos tus procesos empresariales con automatización inteligente. Reducimos costos operacionales y aumentamos la eficiencia con soluciones RPA y workflows automatizados.",
    detailedDescription: "La automatización es la clave para escalar tu negocio eficientemente. Implementamos soluciones que eliminan tareas repetitivas, reducen errores y liberan tiempo para actividades estratégicas.",
    features: [
      "Workflows automatizados personalizados",
      "Integración de sistemas y APIs",
      "Chatbots inteligentes y asistencia virtual",
      "RPA (Robotic Process Automation)",
      "Automatización de marketing",
      "Gestión documental automatizada",
      "Reportes y alertas automáticas",
      "Capacitación y soporte continuo"
    ],
    technologies: ["Zapier", "Microsoft Power Automate", "UiPath", "Chatbots", "CRM", "Email Marketing"],
    benefits: [
      "Reducción de costos operacionales",
      "Aumento de eficiencia",
      "Eliminación de errores manuales",
      "Escalabilidad mejorada"
    ],
    pricing: "Desde $700.000/mes",
    duration: "2-4 meses",
    industry: "Servicios, Manufactura, Retail, Fintech",
    color: "bg-yellow-500"
  }
]


export default function ServiciosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0.1}>
              <Badge variant="secondary" className="mb-6">
                Nuestros Servicios
              </Badge>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Soluciones Tecnológicas <span className="text-secondary">Completas</span> para tu Empresa
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto">
                Desde SEO y desarrollo web hasta ciberseguridad y automatización. Ofrecemos un ecosistema completo 
                de servicios tecnológicos diseñados para transformar y hacer crecer tu negocio en el mundo digital.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Soluciones tecnológicas especializadas para cada necesidad de tu empresa
              </p>
            </div>
          </AnimatedSection>
          
          <div className="space-y-16">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={0.1 + index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Side - Content */}
                    <div className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-secondary/10 p-4 rounded-lg">
                          <service.icon className="h-8 w-8 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{service.title}</h3>
                          <p className="text-secondary font-semibold">{service.subtitle}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {service.description}
                        </p>
                        
                        <p className="text-muted-foreground">
                          {service.detailedDescription}
                        </p>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Características Principales:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {service.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Tecnologías:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side - Benefits & Info */}
                    <div className="bg-card p-8 border-l border-border">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Beneficios Clave:</h4>
                          <div className="space-y-2">
                            {service.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-start space-x-2">
                                <Star className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-secondary/5 rounded-lg">
                            <div className="text-sm font-semibold text-secondary mb-1">Inversión</div>
                            <div className="text-sm text-muted-foreground">{service.pricing}</div>
                          </div>
                          <div className="p-4 bg-secondary/5 rounded-lg">
                            <div className="text-sm font-semibold text-secondary mb-1">Duración</div>
                            <div className="text-sm text-muted-foreground">{service.duration}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-secondary/5 rounded-lg">
                          <div className="text-sm font-semibold text-secondary mb-1">Industrias</div>
                          <div className="text-sm text-muted-foreground">{service.industry}</div>
                        </div>
                        
                        <Link href="#contacto">
                          <Button 
                            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                          >
                            <span className="relative z-10">Solicitar Información</span>
                            <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </Button>
                        </Link>
                      </div>
                    </div>
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
                ¿Listo para Transformar tu Empresa?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Descubre cómo nuestros servicios pueden impulsar el crecimiento de tu negocio. 
                Agenda una consulta gratuita y recibe un análisis personalizado.
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
                <Link href="/casos-exito">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-secondary hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    <span className="relative z-10">Ver Casos de Éxito</span>
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
