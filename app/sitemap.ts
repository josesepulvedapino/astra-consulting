import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://astraconsulting.cl'
  const currentDate = new Date()
  
  // Obtener posts del blog desde Sanity
  let blogPosts: any[] = []
  try {
    blogPosts = await getAllBlogPosts()
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }
  
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/casos-exito`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily', // Blog principal se actualiza frecuentemente
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-servicio`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
  
  // Posts individuales del blog
  const blogPostPages: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug && (post.slug.current || typeof post.slug === 'string'))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current || post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  
  return [...staticPages, ...blogPostPages]
}
