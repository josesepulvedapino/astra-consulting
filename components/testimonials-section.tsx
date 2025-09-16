"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Liliana Sepúlveda",
    position: "Psicóloga Clínica",
    company: "Psicología Online Chillán",
    content:
      "Astra Consulting desarrolló mi página web profesional para psicología online. El resultado superó mis expectativas: diseño moderno, fácil navegación y excelente posicionamiento en Google. Ahora mis pacientes pueden encontrarme fácilmente y agendar citas online. La experiencia fue muy profesional y los resultados son visibles.",
    rating: 5,
    location: "Chillán, Chile",
    website: "psicologiachillan.cl",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Como solo tenemos un testimonial, no necesitamos navegación
  const showNavigation = testimonials.length > 1

  return (
    <section id="testimonios" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Lo que Dicen Nuestros <span className="text-secondary">Clientes</span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Testimonios reales de empresas chilenas que han transformado su negocio con nuestras soluciones tecnológicas
            y estrategias digitales.
          </p>
          <h3 className="text-lg font-semibold text-muted-foreground mt-6 mb-8">
            Casos de Éxito Verificables
          </h3>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border hover-lift transition-all duration-500 ease-out relative overflow-hidden bg-card/80 backdrop-blur-sm cursor-pointer">
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <Quote className="h-12 w-12 text-secondary/30" />
                <div className="flex space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg md:text-xl text-foreground text-pretty mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{testimonials[currentIndex].name}</h3>
                  <h4 className="text-muted-foreground">{testimonials[currentIndex].position}</h4>
                  <div className="text-sm text-secondary font-medium">
                    {testimonials[currentIndex].company} • {testimonials[currentIndex].location}
                    {testimonials[currentIndex].website && (
                      <div className="mt-1">
                        <a 
                          href={`https://${testimonials[currentIndex].website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary/80 transition-colors underline"
                        >
                          {testimonials[currentIndex].website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {showNavigation && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
                      className="hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
                      className="hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 ease-out" />
          </Card>

          {showNavigation && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentIndex ? "bg-secondary scale-125" : "bg-border hover:bg-secondary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
