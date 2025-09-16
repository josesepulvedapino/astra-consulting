import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Code, Smartphone, BarChart3, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"

const services = [
  {
    icon: Search,
    title: "SEO y Marketing Digital",
    description:
      "Posicionamiento web efectivo para empresas chilenas. Aumentamos tu visibilidad en Google y generamos más leads calificados.",
    features: ["Auditoría SEO completa", "Optimización on-page", "Link building local", "Análisis de competencia"],
  },
  {
    icon: Code,
    title: "Desarrollo Web Avanzado",
    description:
      "Sitios web modernos, rápidos y optimizados para conversión. Tecnologías de última generación adaptadas a tu negocio.",
    features: ["React y Next.js", "E-commerce personalizado", "Aplicaciones web", "Integración de APIs"],
  },
  {
    icon: Smartphone,
    title: "Aplicaciones Móviles",
    description:
      "Apps nativas e híbridas que conectan con tus clientes. Experiencias móviles que impulsan el engagement y las ventas.",
    features: ["iOS y Android", "Apps híbridas", "UX/UI optimizado", "Integración backend"],
  },
  {
    icon: BarChart3,
    title: "Análisis de Datos",
    description:
      "Transformamos datos en insights accionables. Business Intelligence y analytics para decisiones estratégicas informadas.",
    features: ["Dashboards interactivos", "Reportes automatizados", "KPIs personalizados", "Predicción de tendencias"],
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description:
      "Protección integral para tu infraestructura digital. Auditorías de seguridad y implementación de mejores prácticas.",
    features: ["Auditorías de seguridad", "Protección de datos", "Backup automático", "Monitoreo 24/7"],
  },
  {
    icon: Zap,
    title: "Automatización",
    description:
      "Optimizamos procesos empresariales con automatización inteligente. Reducimos costos y aumentamos la eficiencia operacional.",
    features: ["Workflows automatizados", "Integración de sistemas", "Chatbots inteligentes", "RPA personalizado"],
  },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Servicios de <span className="text-secondary">Consultoría Informática</span> en Chile
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Soluciones tecnológicas integrales diseñadas para impulsar el crecimiento y la competitividad de empresas
              chilenas en la era digital.
            </p>
            <h3 className="text-lg font-semibold text-muted-foreground mt-6 mb-8">
              Especialidades Tecnológicas
            </h3>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="group hover-lift transition-all duration-500 ease-out border-border hover:border-secondary/50 h-full flex flex-col relative overflow-hidden bg-card/80 backdrop-blur-sm cursor-pointer">
                <CardHeader className="flex-shrink-0">
                  <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-500 ease-out relative">
                    <service.icon className="h-6 w-6 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out rounded-lg" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    <h3>{service.title}</h3>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out" />
                        <h4 className="text-sm font-medium">{feature}</h4>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
