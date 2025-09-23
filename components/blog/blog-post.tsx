import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { renderContent } from "@/lib/content-renderer"
import { ShareButton } from "./share-button"
import type { BlogPost } from "@/lib/sanity"

interface BlogPostProps {
  post: BlogPost
}

export function BlogPost({ post }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button - Solo en desktop */}
      <div className="mb-8 hidden lg:block">
        <Button asChild variant="ghost" className="hover:bg-secondary/10 hover:text-secondary transition-all duration-300 cursor-pointer">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.categories && post.categories.length > 0 ? (
            post.categories.map((category, index) => (
              <span 
                key={index}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium"
              >
                {category.title}
              </span>
            ))
          ) : (
            <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
              Sin categoría
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-xl text-muted-foreground text-pretty mb-3 sm:mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Article Meta */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3 sm:mb-4">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author?.name || 'Autor'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime || '5 min'}</span>
            </div>
          </div>
          
          {/* Share Button - Solo en desktop, a la derecha */}
          <div className="hidden lg:block">
            <ShareButton 
              title={post.title}
              url={`https://astraconsulting.cl/blog/${post.slug.current}`}
            />
          </div>
        </div>

        {/* Share Button - Solo en móvil */}
        <div className="flex justify-between items-center mt-2 mb-3 sm:mt-3 sm:mb-4 lg:hidden">
          <ShareButton 
            title={post.title}
            url={`https://astraconsulting.cl/blog/${post.slug.current}`}
          />
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8 sm:mb-12">
         <div className="relative overflow-hidden rounded-xl">
           <Image
             src={post.mainImage ? urlFor(post.mainImage).width(800).height(400).url() : "/placeholder.jpg"}
             alt={post.title}
             width={800}
             height={400}
             className="w-full h-64 md:h-96 object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
         </div>
      </div>

       {/* Article Content */}
       <div className="text-foreground leading-relaxed">
         {renderContent(post.body)}
       </div>

      {/* Author Bio */}
      <Card className="mt-12 bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
             <div className="relative">
               <Image
                 src={post.author?.image ? urlFor(post.author.image).width(80).height(80).url() : "/placeholder.jpg"}
                 alt={post.author?.name || "Autor"}
                 width={80}
                 height={80}
                 className="w-20 h-20 rounded-full object-cover"
               />
             </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">
                {post.author?.name || "Autor"}
              </h3>
              <p className="text-muted-foreground mb-4">
                Equipo de consultoría informática especializado en transformación digital, SEO y desarrollo de soluciones tecnológicas para empresas chilenas.
              </p>
              <div className="flex gap-3">
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <Link href="/sobre-nosotros">
                    <span className="relative z-10">Conocer más</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <Link href="/#contacto">
                    <span className="relative z-10">Contactar</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-balance mb-4">
          ¿Necesitas ayuda con tu <span className="text-secondary">transformación digital</span>?
        </h3>
        <p className="text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
          En Astra Consulting ayudamos a empresas chilenas a implementar estrategias de SEO, desarrollo web y automatización de procesos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover-scale hover-glow transition-all duration-300 cursor-pointer group relative overflow-hidden">
            <Link href="/#contacto">
              <span className="relative z-10">Consulta Gratuita</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="hover-scale hover-glow transition-all duration-300 cursor-pointer">
            <Link href="/servicios">Ver Servicios</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
