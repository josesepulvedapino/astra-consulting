"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { useAnalytics } from "@/hooks/use-analytics"

// Tipos para el formulario
interface FormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  phone?: string
  service?: string
  message?: string
}

// Función de validación simple
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {}

  // Validar nombre
  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio'
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres'
  } else if (data.name.trim().length > 50) {
    errors.name = 'El nombre no puede exceder 50 caracteres'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.name.trim())) {
    errors.name = 'El nombre solo puede contener letras y espacios'
  }

  // Validar email
  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Por favor ingresa un email válido'
  } else if (data.email.trim().length < 5) {
    errors.email = 'El email debe tener al menos 5 caracteres'
  }

  // Validar empresa
  if (!data.company.trim()) {
    errors.company = 'El nombre de la empresa es obligatorio'
  } else if (data.company.trim().length < 2) {
    errors.company = 'El nombre de la empresa debe tener al menos 2 caracteres'
  } else if (data.company.trim().length > 100) {
    errors.company = 'El nombre de la empresa no puede exceder 100 caracteres'
  }

  // Validar teléfono (opcional)
  if (data.phone.trim()) {
    // Verificar que tenga el formato correcto: +56 9 1234 5678
    const phoneRegex = /^\+56\s9\s\d{4}\s\d{4}$/
    if (!phoneRegex.test(data.phone.trim())) {
      errors.phone = 'Formato de teléfono chileno inválido (ej: +56 9 1234 5678)'
    }
  }

  // Validar servicio
  if (!data.service) {
    errors.service = 'Por favor selecciona un servicio de interés'
  }

  // Validar mensaje
  if (!data.message.trim()) {
    errors.message = 'El mensaje es obligatorio'
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
  } else if (data.message.trim().length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres'
  }

  return errors
}

export function ContactSection() {
  const { trackEvent, trackConversion } = useAnalytics()
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPreFilled, setIsPreFilled] = useState(false)

  // Función para detectar datos del servicio seleccionado y pre-llenar formulario
  useEffect(() => {
    const handlePreFill = () => {
      try {
        const selectedService = localStorage.getItem('selectedService')
        
        if (selectedService) {
          const serviceData = JSON.parse(selectedService)
          
          const formattedPrice = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(parseInt(serviceData.price))

          // Mapeo de nombres completos a valores del select
          const serviceMapping: { [key: string]: string } = {
            'SEO y Marketing Digital': 'seo',
            'Desarrollo Web': 'desarrollo',
            'Aplicaciones': 'mobile',
            'Análisis de Datos': 'analytics',
            'Ciberseguridad': 'seguridad',
            'Automatización': 'automatizacion'
          }

          const serviceValue = serviceMapping[serviceData.service] || 'consultoria'

          const messageText = `Hola, me interesa el servicio de ${serviceData.service} - Plan ${serviceData.plan} (${formattedPrice}).

${serviceData.description}

Por favor, contáctenme para más información sobre este plan.`

          setFormData(prev => ({
            ...prev,
            service: serviceValue,
            message: messageText
          }))
          
          setIsPreFilled(true)

          // Trackear interés en servicio específico
          trackEvent('service_interest_from_pricing', {
            service: serviceData.service,
            plan: serviceData.plan,
            price: serviceData.price,
            event_category: 'lead_generation'
          })

          // Limpiar localStorage después de usar
          localStorage.removeItem('selectedService')

          // Scroll al formulario
          setTimeout(() => {
            const contactSection = document.getElementById('contacto')
            if (contactSection) {
              contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              })
            }
          }, 500)
        }
      } catch (error) {
        console.error('Error al procesar datos del servicio:', error)
      }
    }

    // Ejecutar cuando el componente se monte
    handlePreFill()
  }, [trackEvent])

  // Función para convertir valores del select a nombres en español
  const getServiceName = (serviceValue: string): string => {
    const serviceNames: { [key: string]: string } = {
      'seo': 'SEO y Marketing Digital',
      'desarrollo': 'Desarrollo Web',
      'mobile': 'Aplicaciones',
      'analytics': 'Análisis de Datos',
      'seguridad': 'Ciberseguridad',
      'automatizacion': 'Automatización',
      'consultoria': 'Consultoría General'
    }
    return serviceNames[serviceValue] || 'Consultoría General'
  }

  const formatPhoneNumber = (value: string): string => {
    // Remover todo excepto números
    const numbers = value.replace(/\D/g, '')
    
    // Si está vacío, retornar vacío
    if (!numbers) return ''
    
    // Si empieza con 56, mantener el +56
    if (numbers.startsWith('56')) {
      const remaining = numbers.slice(2)
      if (remaining.length === 0) return '+56'
      if (remaining.length <= 1) return `+56 ${remaining}`
      if (remaining.length <= 5) return `+56 ${remaining.slice(0, 1)} ${remaining.slice(1)}`
      return `+56 ${remaining.slice(0, 1)} ${remaining.slice(1, 5)} ${remaining.slice(5, 9)}`
    }
    
    // Si empieza con 9 (móvil chileno)
    if (numbers.startsWith('9')) {
      if (numbers.length <= 1) return '+56 9'
      if (numbers.length <= 5) return `+56 9 ${numbers.slice(1)}`
      return `+56 9 ${numbers.slice(1, 5)} ${numbers.slice(5, 9)}`
    }
    
    // Para otros casos, agregar +56 automáticamente
    if (numbers.length <= 1) return `+56 9 ${numbers}`
    if (numbers.length <= 5) return `+56 9 ${numbers}`
    return `+56 9 ${numbers.slice(0, 4)} ${numbers.slice(4, 8)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Validación especial para teléfono
    if (name === 'phone') {
      // Formatear el número automáticamente
      const formattedPhone = formatPhoneNumber(value)
      
      // Limitar a máximo 15 caracteres (longitud de +56 9 1234 5678)
      const limitedPhone = formattedPhone.length > 15 ? formattedPhone.slice(0, 15) : formattedPhone
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedPhone
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario
    const validationErrors = validateForm(formData)
    setErrors(validationErrors)
    
    // Si hay errores, no enviar
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Enviar con Web3Forms usando JSON
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '8641d8dc-4b9a-4e7b-b3a6-f76eb68ee209',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          subject: `Nueva consulta de ${formData.name} de ${formData.company} para ${getServiceName(formData.service)}`,
          to: 'contacto@astraconsulting.cl',
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitStatus('success')
        
        // Trackear conversión exitosa
        trackConversion('contact_form_submit', 1)
        trackEvent('contact_form_success', {
          service: formData.service,
          company: formData.company,
          event_category: 'conversion'
        })
        
        // Limpiar formulario
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          message: "",
        })
        setErrors({})
      } else {
        // Manejar error de Web3Forms
        const errorMessage = result.message || 'Error al enviar el formulario'
        
        console.error('Web3Forms Error:', {
          success: result.success,
          message: result.message,
          result: result
        })
        
        setErrorMessage(errorMessage)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrorMessage('Error de conexión. Por favor, inténtalo de nuevo.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
                  {isPreFilled && (
                    <div className="mt-2 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                      <p className="text-sm text-secondary font-medium">
                        Formulario pre-llenado con tu solicitud de servicio
                      </p>
                    </div>
                  )}
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
                          value={formData.name}
                          onChange={handleChange}
                          className={`border-border focus:ring-secondary focus:border-secondary ${
                            errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
                          placeholder="Tu nombre completo"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Corporativo *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`border-border focus:ring-secondary focus:border-secondary ${
                            errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
                          placeholder="tu@empresa.cl"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
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
                          value={formData.company}
                          onChange={handleChange}
                          className={`border-border focus:ring-secondary focus:border-secondary ${
                            errors.company ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
                          placeholder="Nombre de tu empresa"
                        />
                        {errors.company && (
                          <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                        )}
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
                          className={`border-border focus:ring-secondary focus:border-secondary ${
                            errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
                          placeholder="+56 9 1234 5678"
                          maxLength={15}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
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
                          value={formData.service}
                          onChange={handleChange}
                          className={`custom-select custom-select-arrow ${
                            errors.service ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
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
                      {errors.service && (
                        <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Cuéntanos sobre tu proyecto *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`border-border focus:ring-secondary focus:border-secondary ${
                          errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                        placeholder="Describe brevemente tu proyecto, objetivos y cómo podemos ayudarte..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formData.message.length}/1000 caracteres
                        </span>
                      </div>
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
                      <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-medium">¡Mensaje enviado exitosamente! Te contactaremos pronto.</span>
                        </div>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span className="font-medium">{errorMessage || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.'}</span>
                        </div>
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