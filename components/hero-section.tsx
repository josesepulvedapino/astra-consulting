import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCounter } from "@/components/animated-counter"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-24 pb-20 md:pb-32 lg:pb-40 bg-gradient-to-br from-background via-background to-card relative overflow-hidden min-h-[80vh] md:min-h-[90vh] lg:min-h-[95vh]">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10 opacity-50" />
        
        {/* Geometric shapes with morphing animation */}
        <div className="absolute w-32 h-32 bg-secondary/20 rounded-full animate-morphing" 
             style={{ top: '5%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-24 h-24 bg-accent/15 animate-morphing" 
             style={{ top: '15%', right: '15%', animationDelay: '2s' }} />
        <div className="absolute w-20 h-20 bg-secondary/25 rounded-full animate-morphing" 
             style={{ top: '60%', left: '5%', animationDelay: '4s' }} />
        
        {/* Enhanced floating particles */}
        <div className="absolute w-3 h-3 bg-secondary/60 dark:bg-secondary/40 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className="absolute w-4 h-4 bg-accent/70 dark:bg-accent/50 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '20%', right: '20%', animationDelay: '1s' }} />
        <div className="absolute w-2 h-2 bg-secondary/50 dark:bg-secondary/30 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '30%', left: '25%', animationDelay: '2s' }} />
        <div className="absolute w-3 h-3 bg-accent/60 dark:bg-accent/40 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '40%', right: '30%', animationDelay: '3s' }} />
        <div className="absolute w-2.5 h-2.5 bg-secondary/70 dark:bg-secondary/50 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '50%', left: '50%', animationDelay: '4s' }} />
        <div className="absolute w-2 h-2 bg-accent/50 dark:bg-accent/30 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '60%', right: '15%', animationDelay: '5s' }} />
        <div className="absolute w-4 h-4 bg-secondary/60 dark:bg-secondary/40 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '70%', left: '70%', animationDelay: '6s' }} />
        <div className="absolute w-3 h-3 bg-accent/70 dark:bg-accent/50 rounded-full animate-particle-float gpu-accelerated" 
             style={{ top: '80%', right: '50%', animationDelay: '7s' }} />
        
        {/* Enhanced code elements with better animations */}
        <div className="absolute text-lg font-mono text-secondary/50 dark:text-secondary/40 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '12%', left: '12%', animationDelay: '2s' }}>
          &lt;/&gt;
        </div>
        
        <div className="absolute text-lg font-mono text-accent/60 dark:text-accent/50 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '25%', right: '18%', animationDelay: '4s' }}>
          { }
        </div>
        
        <div className="absolute text-lg font-mono text-secondary/50 dark:text-secondary/40 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '38%', left: '65%', animationDelay: '6s' }}>
          [ ]
        </div>
        
        <div className="absolute text-lg font-mono text-accent/60 dark:text-accent/50 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '52%', right: '35%', animationDelay: '8s' }}>
          &lt;/&gt;
        </div>
        
        <div className="absolute text-lg font-mono text-secondary/50 dark:text-secondary/40 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '65%', left: '45%', animationDelay: '10s' }}>
          { }
        </div>
        
        <div className="absolute text-lg font-mono text-accent/60 dark:text-accent/50 font-bold animate-floating-card hover-glow cursor-pointer" 
             style={{ top: '78%', right: '25%', animationDelay: '12s' }}>
          [ ]
        </div>
        
        
        {/* Enhanced wave pattern */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-secondary/40 to-transparent animate-wave" />
        <div className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-wave" 
             style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 leading-tight">
              Transformamos tu empresa con <span className="text-secondary animate-pulse-glow relative">tecnología de vanguardia</span> y SEO efectivo
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto leading-relaxed">
              Consultoría informática especializada en Chile. Aumentamos tu visibilidad online, optimizamos procesos y
              aceleramos el crecimiento de tu negocio con soluciones innovadoras.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="#contacto">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden">
                  <span className="relative z-10">Análisis Gratuito</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </Button>
              </Link>
              <Link href="/casos-exito">
                <Button size="lg" variant="outline" className="hover-scale hover-glow transition-all duration-300 cursor-pointer">
                  Ver Casos de Éxito
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    <AnimatedCounter value={300} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Crecimiento SEO</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>

              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Shield className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    <AnimatedCounter value={15} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Empresas y Proyectos</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>

              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer min-h-[100px]">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Zap className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out animate-heartbeat" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">24/7</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Soporte Técnico</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
