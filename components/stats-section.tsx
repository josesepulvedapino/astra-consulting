import { TrendingUp, Users, Award, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCounter } from "@/components/animated-counter"
import Link from "next/link"

const stats = [
  {
    icon: TrendingUp,
    value: "300%",
    label: "Aumento promedio en tráfico web",
    description: "Nuestros clientes experimentan un crecimiento significativo en visibilidad online",
  },
  {
    icon: Users,
    value: "15+",
    label: "Empresas y proyectos exitosos",
    description: "Desde startups hasta corporaciones, confiamos en resultados medibles",
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfacción del cliente",
    description: "Excelencia en servicio y resultados que superan expectativas",
  },
  {
    icon: Clock,
    value: "3+",
    label: "Años de experiencia",
    description: "Experiencia sólida en transformación digital y consultoría informática",
  },
]

export function StatsSection() {
  return (
    <section id="resultados" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Resultados que <span className="text-secondary">Hablan por Sí Solos</span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Más de 5 años transformando empresas chilenas con tecnología de vanguardia y estrategias digitales
              efectivas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="text-center group hover-lift transition-all duration-500 ease-out cursor-pointer h-full min-h-[200px] flex flex-col justify-between p-4">
                <div>
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 group-hover:scale-105 transition-all duration-500 ease-out relative overflow-hidden">
                    <stat.icon className="h-8 w-8 text-secondary group-hover:rotate-6 transition-transform duration-500 ease-out relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out rounded-full" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-500 ease-out">
                    {stat.value === "300%" ? (
                      <AnimatedCounter value={300} suffix="%" />
                    ) : stat.value === "15+" ? (
                      <AnimatedCounter value={15} suffix="+" />
                    ) : stat.value === "98%" ? (
                      <AnimatedCounter value={98} suffix="%" />
                    ) : stat.value === "3+" ? (
                      <AnimatedCounter value={3} suffix="+" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors duration-500 ease-out">{stat.label}</div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty group-hover:text-foreground transition-colors duration-500 ease-out">{stat.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-16 bg-background rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-balance mb-4">
                ¿Listo para <span className="text-secondary">transformar</span> tu empresa?
              </h3>
              <p className="text-muted-foreground text-pretty mb-6">
                Únete a más de 15 empresas chilenas que ya han revolucionado su presencia digital y multiplicado sus
                resultados con nuestras soluciones tecnológicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contacto" className="flex-1">
                  <button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden min-h-[48px]"
                    aria-label="Solicitar una consulta gratuita para transformar tu empresa"
                  >
                    <span className="relative z-10">Solicitar Consulta Gratuita</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
                <Link href="/casos-exito" className="flex-1">
                  <button 
                    className="w-full border border-border hover:bg-accent hover:text-accent-foreground text-foreground px-8 py-4 rounded-lg font-semibold hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden min-h-[48px]"
                    aria-label="Ver casos de éxito y proyectos realizados por Astra Consulting"
                  >
                    <span className="relative z-10">Ver Casos de Éxito</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-8 text-center">
                <div className="text-6xl font-bold text-secondary mb-2">5+</div>
                <div className="text-lg font-semibold text-foreground mb-2">Años de Experiencia</div>
                <p className="text-sm text-muted-foreground">
                  Especializados en el mercado chileno y sus necesidades específicas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
