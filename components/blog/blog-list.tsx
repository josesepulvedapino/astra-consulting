"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AnimatedSection } from "@/components/animated-section"
import { BlogCard } from "@/components/blog/blog-card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, Filter } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import { NewsletterForm } from "@/components/newsletter-form"
import type { BlogPost } from "@/lib/sanity"

interface BlogListProps {
  posts: BlogPost[]
  allPosts?: BlogPost[]
}

export function BlogList({ posts, allPosts = [] }: BlogListProps) {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  
  // Leer categoría desde URL al cargar
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      // Convertir slug a título con manejo especial para SEO
      let categoryTitle = categoryFromUrl
        .split('-')
        .map(word => {
          // Casos especiales
          if (word.toLowerCase() === 'seo') return 'SEO'
          if (word.toLowerCase() === 'ai') return 'AI'
          if (word.toLowerCase() === 'ui') return 'UI'
          if (word.toLowerCase() === 'ux') return 'UX'
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
      setSelectedCategory(categoryTitle)
    }
  }, [searchParams])
  
  // Extraer categorías únicas de los posts (usar todos los posts si están disponibles)
  const postsForCategories = allPosts.length > 0 ? allPosts : posts
  const allCategories = ["Todos", ...Array.from(new Set(
    postsForCategories.flatMap(post => 
      post.categories?.map(cat => cat.title) || []
    )
  ))]

  // Filtrar posts por categoría
  const filteredPosts = selectedCategory === "Todos" 
    ? posts 
    : posts.filter(post => 
        post.categories?.some(cat => cat.title === selectedCategory)
      )
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Últimos <span className="text-secondary">Artículos</span>
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Mantente actualizado con las últimas tendencias en tecnología y consultoría informática
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Categories Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-3 mb-12">
            {allCategories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 cursor-pointer ${
                  selectedCategory === category 
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" 
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                 {filteredPosts.length > 0 ? (
                   filteredPosts.map((post, index) => (
                     <AnimatedSection key={post._id} delay={index * 0.1}>
                       <BlogCard post={post} />
                     </AnimatedSection>
                   ))
                 ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                {selectedCategory === "Todos" 
                  ? "No hay posts disponibles aún. ¡Crea tu primer post en Sanity Studio!"
                  : `No hay posts disponibles en la categoría "${selectedCategory}".`
                }
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <AnimatedSection delay={0.4}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-balance mb-4">
                Mantente al día con nuestras <span className="text-secondary">publicaciones</span>
              </h3>
              <p className="text-muted-foreground text-pretty mb-8">
                Recibe nuestros artículos más recientes sobre tecnología, SEO y transformación digital directamente en tu correo.
              </p>
              <NewsletterForm 
                showName={false}
                buttonText="Suscribirse"
                placeholder="Tu email"
                className="max-w-md mx-auto"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
