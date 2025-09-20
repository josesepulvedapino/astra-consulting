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
  title: "Sobre Nosotros - Astra Consulting | Equipo Especializado",
  description: "Conoce a Astra Consulting, líderes en transformación digital y consultoría informática. Más de 15 empresas transformadas con 98% de satisfacción.",
  keywords: "equipo técnico, experiencia profesional, certificaciones, trayectoria empresa, consultores especializados, sobre nosotros",
  openGraph: {
    title: "Sobre Nosotros - Astra Consulting",
    description: "Conoce a Astra Consulting, líderes en transformación digital y consultoría informática.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros - Astra Consulting",
    description: "Conoce a Astra Consulting, líderes en transformación digital y consultoría informática.",
    images: ["https://astraconsulting.cl/og-image.png"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl/sobre-nosotros",
  },
}

const teamMembers = [
  {
    name: "José Sepúlveda",
    role: "Fundador & Desarrollador Full-Stack",
    experience: "5+ años",
    description: "Ingeniero en Informática y Analista Programador titulado, certificado en desarrollo Full-Stack y aplicaciones móviles. Especialista en Next.js y desarrollo de páginas web y aplicaciones a medida para empresas chilenas."
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
    title: "Certificación Scrum Foundational",
    description: "Metodologías ágiles y gestión de proyectos"
  },
  {
    icon: Star,
    title: "Certificación Full-Stack",
    description: "Desarrollo completo de aplicaciones web y móviles"
  },
  {
    icon: Code,
    title: "Certificación Apps Móviles",
    description: "Desarrollo de aplicaciones móviles nativas e híbridas"
  },
  {
    icon: Shield,
    title: "Títulos Profesionales",
    description: "Ingeniero en Informática y Analista Programador"
  }
]

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
        {/* Subtle floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Geometric shapes with morphing animation - SOBRE NOSOTROS layout */}
          <div className="absolute w-22 h-22 bg-secondary/15 rounded-full animate-morphing" 
               style={{ top: '12%', left: '5%', animationDelay: '0s' }} />
          <div className="absolute w-18 h-18 bg-accent/12 animate-morphing" 
               style={{ top: '30%', right: '15%', animationDelay: '2s' }} />
          <div className="absolute w-16 h-16 bg-secondary/18 rounded-full animate-morphing" 
               style={{ top: '58%', left: '10%', animationDelay: '4s' }} />
          
          {/* ASTRA branding elements - SOBRE NOSOTROS unique positions */}
          <div className="absolute text-xs font-mono text-secondary/20 dark:text-secondary/15 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '10%', right: '12%', animationDelay: '1s' }}>
            ASTRA
          </div>
          
          <div className="absolute text-xs font-mono text-secondary/25 dark:text-secondary/20 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '48%', left: '2%', animationDelay: '3s' }}>
            TEAM
          </div>
          
          <div className="absolute text-xs font-mono text-accent/20 dark:text-accent/15 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '78%', right: '10%', animationDelay: '5s' }}>
            LEADERS
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Users className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">15+</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Empresas y Proyectos</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Calendar className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">3+</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Años de Experiencia</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.3}>
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Star className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">98%</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Satisfacción Cliente</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4}>
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Shield className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">24/7</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Soporte Técnico</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
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
              <Card className="group h-full hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out">
                      <Target className="h-6 w-6 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors duration-500 ease-out">Nuestra Misión</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground transition-colors duration-500 ease-out">
                    Democratizar la tecnología de vanguardia para empresas chilenas, proporcionando soluciones 
                    digitales accesibles, escalables y rentables que impulsen el crecimiento y la competitividad 
                    en el mercado global.
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </Card>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <Card className="group h-full hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out">
                      <TrendingUp className="h-6 w-6 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors duration-500 ease-out">Nuestra Visión</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground transition-colors duration-500 ease-out">
                    Ser el referente en transformación digital en Chile, reconocidos por nuestra innovación, 
                    excelencia técnica y compromiso con el éxito de nuestros clientes, contribuyendo al 
                    desarrollo tecnológico del país.
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
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
                <Card className="group h-full text-center hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="bg-secondary/10 p-4 rounded-lg w-fit mx-auto mb-4 group-hover:bg-secondary/20 transition-all duration-500 ease-out">
                      <value.icon className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-secondary transition-colors duration-500 ease-out">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">{value.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
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
          
          <div className="max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="bg-secondary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">{member.name}</CardTitle>
                    <CardDescription className="text-secondary font-semibold text-lg">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="outline" className="mb-3 text-xs font-medium">
                      Consultoría & Desarrollo
                    </Badge>
                    <p className="text-base text-muted-foreground mb-3">{member.experience} de experiencia</p>
                    <p className="text-base text-muted-foreground leading-relaxed">{member.description}</p>
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
                Certificaciones profesionales y títulos que respaldan la experiencia y calidad en cada proyecto
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={index} delay={0.1 + index * 0.1}>
                <Card className="group h-full text-center hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="bg-secondary/10 p-4 rounded-lg w-fit mx-auto mb-4 group-hover:bg-secondary/20 transition-all duration-500 ease-out">
                      <achievement.icon className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors duration-500 ease-out">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-500 ease-out">{achievement.description}</p>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary via-accent to-primary relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Static gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-accent/15 to-primary/20 opacity-60" />
          
          {/* Geometric shapes with morphing animation */}
          <div className="absolute w-32 h-32 bg-white/10 rounded-full animate-morphing" 
               style={{ top: '5%', left: '10%', animationDelay: '0s' }} />
          <div className="absolute w-24 h-24 bg-white/8 animate-morphing" 
               style={{ top: '15%', right: '15%', animationDelay: '2s' }} />
          <div className="absolute w-20 h-20 bg-white/12 rounded-full animate-morphing" 
               style={{ top: '60%', left: '5%', animationDelay: '4s' }} />
          <div className="absolute w-28 h-28 bg-white/6 animate-morphing" 
               style={{ top: '70%', right: '20%', animationDelay: '6s' }} />
          
          {/* Floating particles */}
          <div className="absolute w-3 h-3 bg-white/40 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
          <div className="absolute w-4 h-4 bg-white/50 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '20%', right: '20%', animationDelay: '1s' }} />
          <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '30%', left: '25%', animationDelay: '2s' }} />
          <div className="absolute w-3 h-3 bg-white/45 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '40%', right: '30%', animationDelay: '3s' }} />
          <div className="absolute w-2.5 h-2.5 bg-white/35 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '50%', left: '50%', animationDelay: '4s' }} />
          <div className="absolute w-2 h-2 bg-white/25 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '60%', right: '15%', animationDelay: '5s' }} />
          <div className="absolute w-4 h-4 bg-white/40 rounded-full animate-particle-float gpu-accelerated" 
               style={{ top: '80%', left: '70%', animationDelay: '6s' }} />
          
          {/* Code elements */}
          <div className="absolute text-lg font-mono text-white/30 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '12%', left: '12%', animationDelay: '2s' }}>
            &lt;/&gt;
          </div>
          
          <div className="absolute text-lg font-mono text-white/35 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '25%', right: '18%', animationDelay: '4s' }}>
            { }
          </div>
          
          <div className="absolute text-sm font-mono text-white/25 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '45%', left: '8%', animationDelay: '6s' }}>
            TEAM
          </div>
          
          <div className="absolute text-sm font-mono text-white/30 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '75%', right: '8%', animationDelay: '8s' }}>
            ASTRA
          </div>
          
          {/* ASTRA branding elements */}
          <div className="absolute text-xs font-mono text-white/20 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '8%', right: '8%', animationDelay: '1s' }}>
            ASTRA
          </div>
          
          <div className="absolute text-xs font-mono text-white/25 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '35%', left: '3%', animationDelay: '3s' }}>
            ASTRA
          </div>
          
          <div className="absolute text-xs font-mono text-white/20 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '55%', right: '5%', animationDelay: '5s' }}>
            ASTRA
          </div>
          
          <div className="absolute text-xs font-mono text-white/25 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '85%', left: '15%', animationDelay: '7s' }}>
            ASTRA
          </div>
          
          <div className="absolute text-xs font-mono text-white/20 font-bold animate-floating-card hover-glow cursor-pointer" 
               style={{ top: '18%', left: '50%', animationDelay: '9s' }}>
            ASTRA
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

