import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuración de Sanity
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Token con permisos de escritura
})

// Builder para URLs de imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Tipos para TypeScript
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  body: any[] // Portable Text
  mainImage: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  publishedAt: string
  author: {
    name: string
    image?: {
      asset: {
        _ref: string
      }
    }
  }
  categories: {
    title: string
    slug: {
      current: string
    }
  }[]
  tags: string[]
  readTime?: number
  seo?: {
    metaDescription?: string
    keywords?: string[]
  }
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

// Queries para Sanity
export const blogQueries = {
  // Obtener todos los posts del blog
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    },
    tags,
    readTime,
    seo
  }`,

  // Obtener un post específico por slug
  postBySlug: (slug: string) => `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    },
    tags,
    readTime,
    seo
  }`,

  // Obtener posts relacionados
  relatedPosts: (currentId: string, categories: string[], limit: number = 3) => `*[_type == "post" && _id != "${currentId}" && count(categories[@._ref in [${categories.map(cat => `"${cat}"`).join(',')}]]) > 0] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    },
    tags,
    readTime
  }`,

  // Obtener todas las categorías
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`,

  // Obtener posts por categoría
  postsByCategory: (categorySlug: string) => `*[_type == "post" && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug
    },
    tags,
    readTime
  }`
}

// Funciones helper
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return await sanityClient.fetch(blogQueries.allPosts, {}, {
    next: { tags: ['blog-posts'] }
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return await sanityClient.fetch(blogQueries.postBySlug(slug), {}, {
    next: { tags: ['blog-posts'] }
  })
}

export async function getRelatedPosts(currentId: string, categories: string[], limit: number = 3): Promise<BlogPost[]> {
  return await sanityClient.fetch(blogQueries.relatedPosts(currentId, categories, limit))
}

export async function getAllCategories(): Promise<Category[]> {
  return await sanityClient.fetch(blogQueries.allCategories)
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return await sanityClient.fetch(blogQueries.postsByCategory(categorySlug))
}
