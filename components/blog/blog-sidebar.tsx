import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Link2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { NewsletterForm } from "@/components/newsletter-form"
import type { BlogPost } from "@/lib/sanity"

interface BlogSidebarProps {
  currentPost: BlogPost
  allPosts: BlogPost[]
}

export function BlogSidebar({ currentPost, allPosts }: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', {
      month: 'short',
      day: 'numeric'
    })
  }

  // Obtener posts relacionados basados en etiquetas comunes
  const getRelatedPosts = () => {
    if (!currentPost.tags || currentPost.tags.length === 0) {
      return allPosts.filter(post => post._id !== currentPost._id).slice(0, 4)
    }

    const relatedPosts = allPosts
      .filter(post => post._id !== currentPost._id)
      .map(post => {
        const commonTags = post.tags?.filter(tag => 
          currentPost.tags?.includes(tag)
        ) || []
        return {
          ...post,
          commonTagsCount: commonTags.length
        }
      })
      .filter(post => post.commonTagsCount > 0)
      .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
      .slice(0, 4)

    // Si no hay suficientes posts con etiquetas comunes, completar con posts de la misma categoría
    if (relatedPosts.length < 4) {
      const categoryPosts = allPosts
        .filter(post => 
          post._id !== currentPost._id &&
          !relatedPosts.find(rp => rp._id === post._id) &&
          post.categories?.some(cat => 
            currentPost.categories?.some(currentCat => currentCat.title === cat.title)
          )
        )
        .map(post => ({
          ...post,
          commonTagsCount: 0
        }))
        .slice(0, 4 - relatedPosts.length)
      
      relatedPosts.push(...categoryPosts)
    }

    return relatedPosts
  }

  const relatedPosts = getRelatedPosts()

  // Obtener categorías reales con conteos
  const categoryCounts = allPosts.reduce((acc: Record<string, { count: number, slug: string }>, post) => {
    post.categories?.forEach(category => {
      if (!acc[category.title]) {
        acc[category.title] = { count: 0, slug: category.slug?.current || category.title.toLowerCase().replace(/\s+/g, '-') }
      }
      acc[category.title].count += 1
    })
    return acc
  }, {})

  const categories = Object.entries(categoryCounts)
    .map(([name, data]) => ({ name, count: data.count, slug: data.slug }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5 categorías

  return (
    <div className="space-y-8">
      {/* Related Posts */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Link2 className="h-5 w-5 text-secondary" />
            Artículos Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {relatedPosts.map((post, index) => (
            <div key={index} className="group hover-lift transition-all duration-300 ease-out">
              <Link href={`/blog/${post.slug.current}`} className="block">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={post.mainImage ? urlFor(post.mainImage).width(160).height(160).quality(80).url() : "/placeholder.jpg"}
                      alt={post.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors duration-300 line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime || '5 min'}</span>
                      <span>•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Categorías
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/blog?category=${category.slug}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/10 hover:text-secondary transition-all duration-300 cursor-pointer group"
            >
              <span className="font-medium text-secondary group-hover:text-secondary">{category.name}</span>
              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-sm font-medium group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300">
                {category.count}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-secondary/10 via-accent/5 to-secondary/10 border-secondary/20">
        <CardContent className="p-6 text-center">
          <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="font-bold text-foreground mb-2">
            Mantente Actualizado
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Recibe nuestros artículos más recientes sobre tecnología y consultoría.
          </p>
          <NewsletterForm 
            showName={false}
            buttonText="Suscribirse"
            placeholder="Tu email"
          />
        </CardContent>
      </Card>

    </div>
  )
}
