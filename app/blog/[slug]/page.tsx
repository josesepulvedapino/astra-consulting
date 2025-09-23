import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPost } from "@/components/blog/blog-post"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Obtener post desde Sanity
async function getBlogPost(slug: string) {
  const { getBlogPostBySlug } = await import('@/lib/sanity')
  return await getBlogPostBySlug(slug)
}

async function getRelatedPosts(currentSlug: string) {
  const { getRelatedPosts } = await import('@/lib/sanity')
  const post = await getBlogPost(currentSlug)
  if (!post) return []
  
  const categoryIds = post.categories?.map(cat => cat.title) || []
  return await getRelatedPosts(post._id, categoryIds, 2)
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: "Post no encontrado - Astra Consulting",
      description: "El post que buscas no existe o ha sido movido."
    }
  }

    return {
      title: `${post.title} | Blog Astra Consulting`,
      description: post.excerpt,
      keywords: post.tags?.join(", ") || "",
      authors: [{ name: post.author?.name || "Astra Consulting" }],
      creator: "Astra Consulting",
      publisher: "Astra Consulting",
      robots: "index, follow",
      openGraph: {
        type: "article",
        locale: "es_CL",
        url: `https://astraconsulting.cl/blog/${post.slug.current}`,
        title: post.title,
        description: post.excerpt,
        siteName: "Astra Consulting",
        publishedTime: post.publishedAt,
        authors: [post.author?.name || "Astra Consulting"],
        images: post.mainImage ? [
          {
            url: `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`,
            width: 1200,
            height: 630,
            alt: post.title
          }
        ] : []
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.mainImage ? [`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`] : []
      },
      alternates: {
        canonical: `https://astraconsulting.cl/blog/${post.slug.current}`,
      }
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  const relatedPosts = await getRelatedPosts(params.slug)
  
  // Obtener todos los posts para mostrar categorías correctamente
  const { getAllBlogPosts } = await import('@/lib/sanity')
  const allPosts = await getAllBlogPosts()

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-20 pb-8 sm:pb-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <BlogPost post={post} />
            </div>
            <aside className="lg:col-span-1 order-last lg:order-last">
              <BlogSidebar relatedPosts={relatedPosts} allPosts={allPosts} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
