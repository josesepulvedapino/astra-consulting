"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "¿Qué servicios de consultoría informática ofrecen en Chile?",
    answer: "Ofrecemos un ecosistema completo de servicios tecnológicos: SEO y marketing digital, desarrollo web avanzado, aplicaciones móviles, análisis de datos, ciberseguridad y automatización de procesos. Todos nuestros servicios están diseñados específicamente para empresas chilenas y sus necesidades del mercado local."
  },
  {
    id: 2,
    question: "¿Cuánto tiempo toma ver resultados en SEO?",
    answer: "Los resultados de SEO son progresivos. Generalmente comenzamos a ver mejoras en tráfico orgánico entre 3-6 meses, con resultados significativos entre 6-12 meses. Nuestros clientes han experimentado un aumento promedio del 300% en tráfico web. La velocidad depende de factores como la competencia del sector y el estado actual del sitio web."
  },
  {
    id: 3,
    question: "¿Trabajan con empresas de todos los tamaños?",
    answer: "Sí, trabajamos desde startups hasta grandes corporaciones. Hemos transformado más de 15 empresas chilenas de diversos sectores. Nuestras soluciones se adaptan al tamaño y presupuesto de cada cliente, desde consultorías básicas hasta transformaciones digitales completas."
  },
  {
    id: 4,
    question: "¿Ofrecen soporte técnico continuo?",
    answer: "Absolutamente. Ofrecemos soporte técnico 24/7 para garantizar el funcionamiento óptimo de todas nuestras soluciones. Nuestro equipo está disponible para resolver cualquier incidencia y mantener tus sistemas funcionando sin interrupciones."
  },
  {
    id: 5,
    question: "¿Qué tecnologías utilizan para el desarrollo web?",
    answer: "Utilizamos tecnologías de última generación como React, Next.js, Node.js, y bases de datos modernas. Nuestros sitios web son rápidos, seguros, optimizados para SEO y completamente responsivos. También ofrecemos e-commerce personalizado e integración con APIs externas."
  },
  {
    id: 6,
    question: "¿Cómo garantizan la seguridad de nuestros datos?",
    answer: "Implementamos múltiples capas de seguridad incluyendo certificados SSL, encriptación de datos, backups automáticos y monitoreo 24/7. Somos certificados en ISO 27001 y seguimos las mejores prácticas de ciberseguridad para proteger la información de nuestros clientes."
  },
  {
    id: 7,
    question: "¿Cuál es el proceso de trabajo con Astra Consulting?",
    answer: "Nuestro proceso incluye: 1) Consulta inicial gratuita para entender tus necesidades, 2) Auditoría y análisis de tu situación actual, 3) Propuesta personalizada con timeline y presupuesto, 4) Implementación con comunicación constante, 5) Seguimiento y optimización continua."
  },
  {
    id: 8,
    question: "¿Ofrecen garantías en sus servicios?",
    answer: "Sí, ofrecemos garantías específicas según el servicio. Para SEO, garantizamos mejoras medibles en tráfico orgánico. Para desarrollo web, garantizamos funcionamiento sin errores por 6 meses. Nuestro 98% de satisfacción del cliente respalda la calidad de nuestros servicios."
  }
]

interface FAQItemProps {
  faq: {
    id: number
    question: string
    answer: string
  }
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <Card className="border-border hover:border-secondary/50 transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <button
          onClick={onToggle}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:bg-secondary/5"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
          aria-label={`Pregunta: ${faq.question}`}
        >
          <h3 className="text-md font-semibold text-foreground pr-4 leading-tight">
            {faq.question}
          </h3>
          <ChevronDown 
            className={`h-5 w-5 text-secondary transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        <div 
          id={`faq-answer-${faq.id}`}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="px-6 pb-4">
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(prev => prev === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="h-8 w-8 text-secondary mr-3" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-balance">
                Preguntas <span className="text-secondary">Frecuentes</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros servicios de consultoría informática 
              y transformación digital para empresas chilenas.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.id} delay={index * 0.1}>
              <FAQItem
                faq={faq}
                isOpen={openItem === faq.id}
                onToggle={() => toggleItem(faq.id)}
              />
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={0.8}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              ¿No encuentras la respuesta que buscas?
            </p>
            <a 
              href="/#contacto" 
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
              aria-label="Ir a la sección de contacto para hacer una consulta personalizada"
            >
              Hacer una Consulta Personalizada
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

