import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Users, 
  Target, 
  Award, 
  Shield, 
  TrendingUp, 
  Code, 
  MapPin, 
  Calendar,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react"

export const metadata = {
  title: "Sobre Nosotros - Astra Consulting | Consultoría Informática Especializada",
  description: "Conoce a Astra Consulting, líderes en transformación digital y consultoría informática. Más de 15 empresas transformadas con 98% de satisfacción.",
  keywords: "sobre nosotros, Astra Consulting, consultoría informática, transformación digital, equipo técnico, experiencia",
  openGraph: {
    title: "Sobre Nosotros - Astra Consulting",
    description: "Conoce a Astra Consulting, líderes en transformación digital y consultoría informática.",
    type: "website",
  },
}

const teamMembers = [
  {
    name: "Carlos Mendoza",
    role: "CEO & Fundador",
    expertise: "Estrategia Digital & Liderazgo",
    experience: "3+ años",
    description: "Experto en transformación digital con más de 3 años liderando proyectos tecnológicos en empresas chilenas."
  },
  {
    name: "Ana Rodríguez",
    role: "CTO",
    expertise: "Desarrollo & Arquitectura",
    experience: "12+ años",
    description: "Especialista en tecnologías modernas, React, Next.js y arquitecturas escalables para empresas."
  },
  {
    name: "Miguel Torres",
    role: "SEO Director",
    expertise: "Marketing Digital & SEO",
    experience: "10+ años",
    description: "Experto en posicionamiento web y estrategias de marketing digital para el mercado chileno."
  },
  {
    name: "Sofia Herrera",
    role: "Data Analyst",
    expertise: "Analytics & BI",
    experience: "8+ años",
    description: "Especialista en análisis de datos, business intelligence y optimización de procesos empresariales."
  }
]

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada proyecto se mide por su impacto real en el negocio y la satisfacción del cliente."
  },
  {
    icon: Shield,
    title: "Seguridad y Confianza",
    description: "Implementamos las mejores prácticas de seguridad y mantenemos la confidencialidad absoluta."
  },
  {
    icon: TrendingUp,
    title: "Innovación Constante",
    description: "Siempre a la vanguardia de las últimas tecnologías y tendencias del mercado digital."
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos como un equipo integrado con nuestros clientes para lograr objetivos comunes."
  }
]

const achievements = [
  {
    icon: Award,
    title: "Certificación ISO 27001",
    description: "Gestión de Seguridad de la Información"
  },
  {
    icon: Star,
    title: "Google Partner",
    description: "Certificación oficial de Google para marketing digital"
  },
  {
    icon: Code,
    title: "Microsoft Partner",
    description: "Especialistas en tecnologías Microsoft"
  },
  {
    icon: Shield,
    title: "Certificación AWS",
    description: "Arquitectos certificados en Amazon Web Services"
  }
]

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0.1}>
              <Badge variant="secondary" className="mb-6">
                Sobre Astra Consulting
              </Badge>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Líderes en <span className="text-secondary">Transformación Digital</span> en Chile
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto">
                Desde 2021, Astra Consulting ha sido el socio tecnológico de confianza para más de 15 empresas, 
                ayudándolas a crecer y competir en el mundo digital con soluciones innovadoras y resultados medibles.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Trayectoria</h2>
              <p className="text-xl text-muted-foreground">
                Números que reflejan nuestro compromiso y experiencia en transformación digital
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Empresas y Proyectos</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">3+</div>
                <div className="text-sm text-muted-foreground">Años de Experiencia</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción Cliente</div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte Técnico</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={0.1}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Nuestra Misión</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Democratizar la tecnología de vanguardia para empresas chilenas, proporcionando soluciones 
                    digitales accesibles, escalables y rentables que impulsen el crecimiento y la competitividad 
                    en el mercado global.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Nuestra Visión</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Ser el referente en transformación digital en Chile, reconocidos por nuestra innovación, 
                    excelencia técnica y compromiso con el éxito de nuestros clientes, contribuyendo al 
                    desarrollo tecnológico del país.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían cada decisión y proyecto en Astra Consulting
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="bg-secondary/10 p-4 rounded-lg w-fit mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Profesionales expertos con años de experiencia en transformación digital
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="bg-secondary/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-secondary font-semibold">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="outline" className="mb-3">{member.expertise}</Badge>
                    <p className="text-sm text-muted-foreground mb-2">{member.experience} de experiencia</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificaciones y Logros</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Reconocimientos que respaldan nuestra experiencia y compromiso con la excelencia
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="bg-secondary/10 p-4 rounded-lg w-fit mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{achievement.description}</p>
                  </CardContent>
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
                Únete a las más de 15 empresas que ya confían en Astra Consulting para su transformación digital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contacto">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Consulta Gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/casos-exito">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-secondary transition-all duration-200 cursor-pointer"
                  >
                    Ver Casos de Éxito
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

