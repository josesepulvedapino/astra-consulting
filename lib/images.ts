// Utilidades para generación de imágenes gratuitas
// Estas funciones se usarán desde Make.com, no directamente en la app

export interface ImageConfig {
  width: number
  height: number
  text: string
  backgroundColor: string
  textColor: string
  fontSize?: number
  fontFamily?: string
}

// Configuración de colores de marca Astra Consulting
export const BRAND_COLORS = {
  primary: '#3B82F6',
  secondary: '#1E40AF', 
  accent: '#EFF6FF',
  white: '#FFFFFF',
  dark: '#1F2937'
}

// Templates de imágenes para diferentes tipos de contenido
export const IMAGE_TEMPLATES = {
  blog: {
    width: 1200,
    height: 630, // Formato Open Graph
    backgroundColor: BRAND_COLORS.primary,
    textColor: BRAND_COLORS.white,
    fontSize: 48
  },
  linkedin: {
    width: 1200,
    height: 627, // Formato LinkedIn
    backgroundColor: BRAND_COLORS.secondary,
    textColor: BRAND_COLORS.white,
    fontSize: 42
  },
  instagram: {
    width: 1080,
    height: 1080, // Formato cuadrado Instagram
    backgroundColor: BRAND_COLORS.accent,
    textColor: BRAND_COLORS.dark,
    fontSize: 36
  }
}

// URLs de APIs gratuitas para imágenes
export const FREE_IMAGE_APIS = {
  unsplash: {
    baseUrl: 'https://api.unsplash.com',
    categories: ['technology', 'business', 'office', 'computer', 'data']
  },
  pexels: {
    baseUrl: 'https://api.pexels.com/v1',
    categories: ['technology', 'business', 'office', 'computer', 'data']
  },
  placeholder: {
    baseUrl: 'https://via.placeholder.com',
    // Ejemplo: https://via.placeholder.com/1200x630/3B82F6/FFFFFF?text=SEO+Chile
  }
}

// Función para generar URL de imagen placeholder con texto
export function generatePlaceholderImage(config: ImageConfig): string {
  const { width, height, text, backgroundColor, textColor, fontSize = 48 } = config
  
  const encodedText = encodeURIComponent(text)
  const encodedBgColor = backgroundColor.replace('#', '')
  const encodedTextColor = textColor.replace('#', '')
  
  return `${FREE_IMAGE_APIS.placeholder.baseUrl}/${width}x${height}/${encodedBgColor}/${encodedTextColor}?text=${encodedText}&size=${fontSize}`
}

// Función para generar imagen de blog
export function generateBlogImage(title: string): string {
  return generatePlaceholderImage({
    ...IMAGE_TEMPLATES.blog,
    text: title
  })
}

// Función para generar imagen de LinkedIn
export function generateLinkedInImage(title: string): string {
  return generatePlaceholderImage({
    ...IMAGE_TEMPLATES.linkedin,
    text: title
  })
}

// Función para generar imagen de Instagram
export function generateInstagramImage(title: string): string {
  return generatePlaceholderImage({
    ...IMAGE_TEMPLATES.instagram,
    text: title
  })
}

// Configuración para Make.com
export const MAKE_IMAGE_CONFIG = {
  // Estas configuraciones se usarán en Make.com para generar imágenes
  brandColors: BRAND_COLORS,
  templates: IMAGE_TEMPLATES,
  freeApis: FREE_IMAGE_APIS,
  
  // Prompts para Make.com
  imagePrompts: {
    blog: "Create a professional blog header image for Astra Consulting about: {topic}",
    linkedin: "Create a LinkedIn post image for Astra Consulting about: {topic}",
    instagram: "Create an Instagram post image for Astra Consulting about: {topic}"
  }
}
