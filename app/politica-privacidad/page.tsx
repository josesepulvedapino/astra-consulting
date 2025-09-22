import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, UserCheck, FileText } from "lucide-react"

export const metadata = {
  title: "Política de Privacidad - Astra Consulting",
  description: "Política de privacidad de Astra Consulting. Conoce cómo protegemos y manejamos tus datos personales de acuerdo con la legislación chilena.",
  keywords: "política de privacidad, protección de datos, privacidad, Astra Consulting, datos personales",
  openGraph: {
    title: "Política de Privacidad - Astra Consulting",
    description: "Conoce cómo protegemos y manejamos tus datos personales.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad - Astra Consulting",
    description: "Conoce cómo protegemos y manejamos tus datos personales.",
    images: ["https://astraconsulting.cl/og-image.png"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl/politica-privacidad",
  },
}

export default function PoliticaPrivacidadPage() {
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
                <Shield className="h-4 w-4 mr-2" />
                Protección de Datos
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
                Política de <span className="text-secondary">Privacidad</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                En Astra Consulting nos comprometemos a proteger tu privacidad y manejar tus datos personales con la máxima seguridad y transparencia.
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
            
            {/* Información General */}
            <AnimatedSection delay={0.1}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-secondary" />
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Astra Consulting, con domicilio en Chillán, Chile, es responsable del tratamiento de los datos personales que nos proporciones a través de nuestro sitio web y servicios.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Razón Social</h4>
                      <p className="text-sm text-muted-foreground">Astra Consulting</p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border">
                      <h4 className="font-semibold mb-2">Ubicación</h4>
                      <p className="text-sm text-muted-foreground">Chillán, Chile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Datos que Recopilamos */}
            <AnimatedSection delay={0.2}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-secondary" />
                    Datos que Recopilamos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Recopilamos únicamente los datos necesarios para brindarte nuestros servicios de consultoría informática:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Datos de Contacto</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Nombre completo</li>
                        <li>• Correo electrónico</li>
                        <li>• Número de teléfono</li>
                        <li>• Empresa u organización</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Datos Técnicos</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Dirección IP</li>
                        <li>• Navegador web</li>
                        <li>• Sistema operativo</li>
                        <li>• Páginas visitadas</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Uso de los Datos */}
            <AnimatedSection delay={0.3}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-secondary" />
                    Uso de los Datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Utilizamos tus datos personales para los siguientes propósitos:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Servicios</h4>
                        <p className="text-sm text-muted-foreground">Brindar consultoría informática y servicios tecnológicos</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Comunicación</h4>
                        <p className="text-sm text-muted-foreground">Responder a consultas y mantener comunicación</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Mejora del Servicio</h4>
                        <p className="text-sm text-muted-foreground">Analizar y mejorar nuestros servicios</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Cumplimiento Legal</h4>
                        <p className="text-sm text-muted-foreground">Cumplir con obligaciones legales aplicables</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Protección de Datos */}
            <AnimatedSection delay={0.4}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-secondary" />
                    Protección de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-card rounded-lg border text-center">
                      <Lock className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Encriptación</h4>
                      <p className="text-sm text-muted-foreground">Datos encriptados en tránsito y reposo</p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border text-center">
                      <Shield className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Acceso Limitado</h4>
                      <p className="text-sm text-muted-foreground">Solo personal autorizado accede a los datos</p>
                    </div>
                    <div className="p-4 bg-card rounded-lg border text-center">
                      <Database className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <h4 className="font-semibold mb-2">Backups Seguros</h4>
                      <p className="text-sm text-muted-foreground">Copias de seguridad regulares y seguras</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Tus Derechos */}
            <AnimatedSection delay={0.5}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-secondary" />
                    Tus Derechos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Tienes los siguientes derechos respecto a tus datos personales:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Acceso</h4>
                        <p className="text-sm text-muted-foreground">Solicitar información sobre tus datos</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Rectificación</h4>
                        <p className="text-sm text-muted-foreground">Corregir datos inexactos o incompletos</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Eliminación</h4>
                        <p className="text-sm text-muted-foreground">Solicitar la eliminación de tus datos</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border">
                        <h4 className="font-semibold mb-2">Portabilidad</h4>
                        <p className="text-sm text-muted-foreground">Recibir tus datos en formato estructurado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contacto */}
            <AnimatedSection delay={0.6}>
              <Card className="border-border hover:border-secondary/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Para ejercer tus derechos o resolver dudas sobre esta política de privacidad, puedes contactarnos:
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
