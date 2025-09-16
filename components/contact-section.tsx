"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Comienza tu <span className="text-secondary">Transformación Digital</span> Hoy
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Conversemos sobre cómo podemos impulsar el crecimiento de tu empresa con tecnología de vanguardia y
              estrategias digitales efectivas.
            </p>
            <h3 className="text-lg font-semibold text-muted-foreground mt-6 mb-8">
              Consulta Gratuita y Personalizada
            </h3>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <AnimatedSection delay={0.1}>
            <div>
              <Card className="border-border h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Teléfono</div>
                      <a href="https://wa.me/56926873545" className="text-muted-foreground hover:text-secondary transition-colors">+56 9 2687 3545</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <a href="mailto:contacto@astraconsulting.cl" className="text-muted-foreground hover:text-secondary transition-colors">contacto@astraconsulting.cl</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <MapPin className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Ubicación</div>
                      <div className="text-muted-foreground">
                        Chillán, Chile
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Horario</div>
                      <div className="text-muted-foreground">
                        Lun - Vie: 9:00 - 18:00
                        <br />
                        Sáb: 10:00 - 14:00
                      </div>
                    </div>
                  </div>

                <div className="pt-6 border-t border-border mt-auto">
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <div className="font-semibold text-secondary mb-2">Consulta Gratuita</div>
                    <p className="text-sm text-muted-foreground">
                      Agenda una consulta gratuita de 30 minutos para analizar las necesidades específicas de tu
                      empresa.
                    </p>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <div>
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">Solicita tu Consulta Gratuita</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nombre Completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-border focus:ring-secondary focus:border-secondary"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Corporativo *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-border focus:ring-secondary focus:border-secondary"
                          placeholder="tu@empresa.cl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                          Empresa *
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="border-border focus:ring-secondary focus:border-secondary"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Teléfono
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-border focus:ring-secondary focus:border-secondary"
                          placeholder="+56 9 2687 3545"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Servicio de Interés *
                      </label>
                      <div className="relative group">
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="custom-select custom-select-arrow"
                        >
                          <option value="">Selecciona un servicio</option>
                          <option value="seo">SEO y Marketing Digital</option>
                          <option value="desarrollo">Desarrollo Web</option>
                          <option value="mobile">Aplicaciones Móviles</option>
                          <option value="analytics">Análisis de Datos</option>
                          <option value="seguridad">Ciberseguridad</option>
                          <option value="automatizacion">Automatización</option>
                          <option value="consultoria">Consultoría General</option>
                        </select>
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Cuéntanos sobre tu proyecto *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-border focus:ring-secondary focus:border-secondary"
                        placeholder="Describe brevemente tu proyecto, objetivos y cómo podemos ayudarte..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                      </span>
                      <Send className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                        ✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                        ❌ Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground text-center">
                      Al enviar este formulario, aceptas que nos contactemos contigo para discutir tu proyecto. Respetamos
                      tu privacidad y no compartimos tu información.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}