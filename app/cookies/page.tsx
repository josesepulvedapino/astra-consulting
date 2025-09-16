import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cookie, Settings, Shield, Eye, Database, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Política de Cookies - Astra Consulting | Uso de Cookies",
  description: "Política de cookies de Astra Consulting. Conoce cómo utilizamos las cookies para mejorar tu experiencia en nuestro sitio web.",
  keywords: "política de cookies, cookies, Astra Consulting, privacidad, navegación web",
  openGraph: {
    title: "Política de Cookies - Astra Consulting",
    description: "Conoce cómo utilizamos las cookies para mejorar tu experiencia.",
    type: "website",
  },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Cookie className="h-4 w-4 mr-2" />
                Política de Cookies
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
                Política de <span className="text-secondary">Cookies</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso de nuestro sitio web.
              </p>
              <div className="mt-8 text-sm text-muted-foreground">
                <p>Última actualización: 19 de diciembre de 2024</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* ¿Qué son las Cookies? */}
            <AnimatedSection delay={0.1}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Cookie className="h-6 w-6 text-secondary" />
                    ¿Qué son las Cookies?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Nos ayudan a recordar tus preferencias y mejorar tu experiencia de navegación.
                  </p>
                  <div className="p-4 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-2">Tipos de Cookies</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <h5 className="font-medium mb-1">Cookies Técnicas</h5>
                        <p className="text-sm text-muted-foreground">Necesarias para el funcionamiento del sitio</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Cookies de Análisis</h5>
                        <p className="text-sm text-muted-foreground">Nos ayudan a entender cómo usas el sitio</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Cookies que Utilizamos */}
            <AnimatedSection delay={0.2}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-secondary" />
                    Cookies que Utilizamos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Utilizamos los siguientes tipos de cookies en nuestro sitio web:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex items-start gap-3">
                        <Settings className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">Cookies Técnicas (Necesarias)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Preferencias de tema (claro/oscuro)</li>
                            <li>• Configuración de idioma</li>
                            <li>• Estado de sesión</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <div className="flex items-start gap-3">
                        <Eye className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2">Cookies de Análisis</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Google Analytics (tráfico y comportamiento)</li>
                            <li>• Vercel Analytics (rendimiento)</li>
                            <li>• Métricas de uso del sitio</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Finalidad de las Cookies */}
            <AnimatedSection delay={0.3}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-secondary" />
                    Finalidad de las Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Utilizamos las cookies para los siguientes propósitos:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Funcionalidad</h4>
                        <p className="text-sm text-muted-foreground">Recordar tus preferencias y configuraciones</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Rendimiento</h4>
                        <p className="text-sm text-muted-foreground">Optimizar la velocidad y funcionamiento del sitio</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Análisis</h4>
                        <p className="text-sm text-muted-foreground">Entender cómo se usa nuestro sitio web</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Mejora</h4>
                        <p className="text-sm text-muted-foreground">Mejorar continuamente nuestros servicios</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Gestión de Cookies */}
            <AnimatedSection delay={0.4}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-secondary" />
                    Gestión de Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Puedes controlar y gestionar las cookies de varias maneras:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Configuración del Navegador</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        La mayoría de navegadores te permiten controlar las cookies a través de su configuración:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies</li>
                        <li>• <strong>Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies</li>
                        <li>• <strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies</li>
                        <li>• <strong>Edge:</strong> Configuración &gt; Cookies y permisos del sitio</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Herramientas de Terceros</h4>
                      <p className="text-sm text-muted-foreground">
                        Puedes usar herramientas como Google Analytics Opt-out Browser Add-on para desactivar el seguimiento de Google Analytics.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Cookies de Terceros */}
            <AnimatedSection delay={0.5}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6 text-secondary" />
                    Cookies de Terceros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Nuestro sitio web puede contener cookies de terceros:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Google Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Puedes optar por no participar visitando 
                        <a href="https://tools.google.com/dlpage/gaoptout" className="text-secondary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                          Google Analytics Opt-out
                        </a>.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Vercel Analytics</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilizamos Vercel Analytics para monitorear el rendimiento y la funcionalidad de nuestro sitio web.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Actualizaciones */}
            <AnimatedSection delay={0.6}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Actualizaciones de esta Política</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en nuestras prácticas o por otras razones operativas, legales o regulatorias.
                  </p>
                  <div className="p-4 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-2">Notificación de Cambios</h4>
                    <p className="text-sm text-muted-foreground">
                      Te recomendamos revisar esta página periódicamente para estar informado sobre cómo utilizamos las cookies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contacto */}
            <AnimatedSection delay={0.7}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Si tienes preguntas sobre nuestra política de cookies, puedes contactarnos:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p className="text-sm text-muted-foreground">contacto@astraconsulting.cl</p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Teléfono</h4>
                      <p className="text-sm text-muted-foreground">+56 9 2687 3545</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
