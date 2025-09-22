import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Términos de Servicio - Astra Consulting | Condiciones de Uso",
  description: "Términos y condiciones de servicio de Astra Consulting. Conoce las condiciones de uso de nuestros servicios de consultoría informática.",
  keywords: "términos de servicio, condiciones de uso, Astra Consulting, consultoría informática, términos legales",
  openGraph: {
    title: "Términos de Servicio - Astra Consulting",
    description: "Conoce las condiciones de uso de nuestros servicios de consultoría informática.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos de Servicio - Astra Consulting",
    description: "Conoce las condiciones de uso de nuestros servicios de consultoría informática.",
    images: ["https://astraconsulting.cl/og-image.png"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl/terminos-servicio",
  },
}

export default function TerminosServicioPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Scale className="h-4 w-4 mr-2" />
                Términos Legales
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
                Términos de <span className="text-secondary">Servicio</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Estos términos y condiciones rigen el uso de nuestros servicios de consultoría informática y transformación digital.
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
            
            {/* Aceptación de Términos */}
            <AnimatedSection delay={0.1}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-secondary" />
                    Aceptación de Términos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Al utilizar nuestros servicios, aceptas estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
                  </p>
                  <div className="p-4 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-2">Servicios Incluidos</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Consultoría informática y transformación digital</li>
                      <li>• Desarrollo web y aplicaciones móviles</li>
                      <li>• SEO y marketing digital</li>
                      <li>• Análisis de datos y automatización</li>
                      <li>• Ciberseguridad y soporte técnico</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Obligaciones del Cliente */}
            <AnimatedSection delay={0.2}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-secondary" />
                    Obligaciones del Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Como cliente de nuestros servicios, te comprometes a:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Información Veraz</h4>
                        <p className="text-sm text-muted-foreground">Proporcionar información precisa y actualizada</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Colaboración</h4>
                        <p className="text-sm text-muted-foreground">Colaborar activamente en los proyectos</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Pagos Oportunos</h4>
                        <p className="text-sm text-muted-foreground">Realizar pagos según lo acordado</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Uso Responsable</h4>
                        <p className="text-sm text-muted-foreground">Utilizar los servicios de manera responsable</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Nuestros Compromisos */}
            <AnimatedSection delay={0.3}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-secondary" />
                    Nuestros Compromisos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Astra Consulting se compromete a:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Calidad del Servicio</h4>
                        <p className="text-sm text-muted-foreground">Brindar servicios de alta calidad y profesionalismo</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Confidencialidad</h4>
                        <p className="text-sm text-muted-foreground">Mantener la confidencialidad de la información</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Soporte Técnico</h4>
                        <p className="text-sm text-muted-foreground">Proporcionar soporte técnico continuo</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Cumplimiento</h4>
                        <p className="text-sm text-muted-foreground">Cumplir con los plazos y acuerdos establecidos</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Limitaciones de Responsabilidad */}
            <AnimatedSection delay={0.4}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-secondary" />
                    Limitaciones de Responsabilidad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Nuestra responsabilidad está limitada de la siguiente manera:
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Servicios "Tal Como Están"</h4>
                      <p className="text-sm text-muted-foreground">
                        Los servicios se proporcionan "tal como están" sin garantías expresas o implícitas.
                      </p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Daños Indirectos</h4>
                      <p className="text-sm text-muted-foreground">
                        No seremos responsables por daños indirectos, incidentales o consecuenciales.
                      </p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Limitación de Monto</h4>
                      <p className="text-sm text-muted-foreground">
                        Nuestra responsabilidad total no excederá el monto pagado por los servicios.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Propiedad Intelectual */}
            <AnimatedSection delay={0.5}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-secondary" />
                    Propiedad Intelectual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Respecto a la propiedad intelectual:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Código Desarrollado</h4>
                        <p className="text-sm text-muted-foreground">El cliente obtiene derechos sobre el código desarrollado</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Herramientas Propias</h4>
                        <p className="text-sm text-muted-foreground">Mantenemos derechos sobre nuestras herramientas</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Contenido del Cliente</h4>
                        <p className="text-sm text-muted-foreground">El cliente mantiene derechos sobre su contenido</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Terceros</h4>
                        <p className="text-sm text-muted-foreground">Respetamos los derechos de propiedad de terceros</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Modificaciones */}
            <AnimatedSection delay={0.6}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Modificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
                  </p>
                  <div className="p-4 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-2">Notificación de Cambios</h4>
                    <p className="text-sm text-muted-foreground">
                      Te notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.
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
                    Para consultas sobre estos términos de servicio, puedes contactarnos:
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

      </main>
      <Footer />
    </>
  )
}
