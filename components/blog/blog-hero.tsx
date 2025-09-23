import { AnimatedSection } from "@/components/animated-section"
import { Search, TrendingUp, BookOpen } from "lucide-react"

export function BlogHero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10 opacity-50" />
        
        {/* Geometric shapes */}
        <div className="absolute w-32 h-32 bg-secondary/20 rounded-full animate-morphing" 
             style={{ top: '10%', left: '15%', animationDelay: '0s' }} />
        <div className="absolute w-24 h-24 bg-accent/15 animate-morphing" 
             style={{ top: '20%', right: '20%', animationDelay: '2s' }} />
        
        {/* Floating elements */}
        <div className="absolute text-lg font-mono text-secondary/50 dark:text-secondary/40 font-bold animate-floating-card" 
             style={{ top: '15%', left: '25%', animationDelay: '3s' }}>
          &lt;/&gt;
        </div>
        
        <div className="absolute text-lg font-mono text-accent/60 dark:text-accent/50 font-bold animate-floating-card" 
             style={{ top: '25%', right: '30%', animationDelay: '5s' }}>
          { }
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6 leading-tight">
              Blog de <span className="text-secondary animate-pulse-glow relative">Consultoría Informática</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto leading-relaxed">
              Consejos expertos, casos de éxito y las últimas tendencias en tecnología, SEO y transformación digital para empresas chilenas.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <Search className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    SEO & Marketing
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Estrategias digitales</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>

              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    Transformación Digital
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Innovación empresarial</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>

              <div className="group flex items-center justify-center space-x-4 bg-card/80 backdrop-blur-sm p-6 rounded-xl hover-lift transition-all duration-500 ease-out border border-border/50 hover:border-secondary/30 relative overflow-hidden cursor-pointer">
                <div className="bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-all duration-500 ease-out flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-secondary group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out">
                    Casos de Éxito
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out">Experiencias reales</div>
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
