import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, User, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import type { BlogPost } from "@/lib/sanity"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/blog/${post.slug.current}`} className="block h-full">
      <Card className="group hover-lift transition-all duration-500 ease-out border-border hover:border-secondary/50 h-full flex flex-col relative overflow-hidden bg-card/80 backdrop-blur-sm cursor-pointer">
        <div className="relative overflow-hidden">
          <Image
            src={post.mainImage ? urlFor(post.mainImage).width(400).height(250).url() : "/placeholder.jpg"}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.categories && post.categories.length > 0 ? (
              post.categories.map((category, index) => (
                <span 
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                >
                  {category.title}
                </span>
              ))
            ) : (
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Sin categoría
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
        </div>

        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 ease-out line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors duration-500 ease-out line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime || '5'} min</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author?.name || 'Autor'}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs font-medium group-hover:bg-secondary/20 transition-colors duration-500 ease-out"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <Button variant="outline" className="w-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 cursor-pointer group/btn relative overflow-hidden">
              <span className="relative z-10">Leer más</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </CardContent>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />
      </Card>
    </Link>
  )
}
