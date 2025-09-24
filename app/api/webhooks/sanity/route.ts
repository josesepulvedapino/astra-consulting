import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { revalidatePath, revalidateTag } from 'next/cache'

// Función para mapear categorías de OpenAI a IDs de Sanity
function getCategoryId(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'SEO': '84977b7e-fc3e-4607-99e3-4eed7433189a',
    'Marketing Digital': 'a7d53305-0a7e-44ab-ac9e-add304bd7566',
    'Desarrollo Web': '745c3a7f-9689-41a5-9f2f-573e0ebe9a15',
    'Ciberseguridad': '1ee7df5b-9acf-49ee-bb2e-4f7e8da80ff6',
    'Automatización': '5317e964-14d5-4ce0-a010-6793d30cdcc3',
    'Análisis de Datos': '5f244bf3-fcb9-4c09-af21-133802672e7b'
  }
  
  // Buscar coincidencia exacta primero
  if (categoryMap[category]) {
    return categoryMap[category]
  }
  
  // Buscar coincidencia parcial para variaciones
  const normalizedCategory = category.toLowerCase().trim()
  for (const [key, id] of Object.entries(categoryMap)) {
    if (normalizedCategory.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedCategory)) {
      return id
    }
  }
  
  // Mapeo específico para variaciones comunes
  if (normalizedCategory.includes('automatiz') || normalizedCategory.includes('proceso')) {
    return '5317e964-14d5-4ce0-a010-6793d30cdcc3' // Automatización
  }
  if (normalizedCategory.includes('desarrollo') || normalizedCategory.includes('web') || normalizedCategory.includes('aplicacion')) {
    return '745c3a7f-9689-41a5-9f2f-573e0ebe9a15' // Desarrollo Web
  }
  if (normalizedCategory.includes('marketing') || normalizedCategory.includes('digital')) {
    return 'a7d53305-0a7e-44ab-ac9e-add304bd7566' // Marketing Digital
  }
  if (normalizedCategory.includes('seguridad') || normalizedCategory.includes('ciberseguridad')) {
    return '1ee7df5b-9acf-49ee-bb2e-4f7e8da80ff6' // Ciberseguridad
  }
  if (normalizedCategory.includes('analisis') || normalizedCategory.includes('datos')) {
    return '5f244bf3-fcb9-4c09-af21-133802672e7b' // Análisis de Datos
  }
  
  return '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto
}

// Webhook para recibir notificaciones de Sanity cuando se publique contenido
export async function POST(request: NextRequest) {
  try {
    // Leer el body como texto
    const rawBody = await request.text()
    
    // Limpiar caracteres de control problemáticos de forma segura
    const cleanedBody = rawBody
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remover caracteres de control
      .replace(/\r\n/g, '\n') // Normalizar saltos de línea
      .replace(/\r/g, '\n') // Normalizar retornos de carro
    
    // Parsear el JSON con manejo de errores
    let body
    try {
      body = JSON.parse(cleanedBody)
      console.log('Webhook received data:', JSON.stringify(body, null, 2))
    } catch (parseError: any) {
      console.error('JSON parse error:', parseError.message)
      console.error('Raw body:', rawBody.substring(0, 1000))
      console.error('Cleaned body:', cleanedBody.substring(0, 1000))
      
      return NextResponse.json({ 
        message: 'Invalid JSON format',
        error: parseError.message
      }, { status: 400 })
    }
    
        // Verificar si es un post desde Make.com (campos no vacíos y slug válido)
        if (body.title && body.title !== "" && body.slug && body.slug !== "" && body.body && body.body !== "" && 
            typeof body.slug === 'string' && !body.slug.includes('[object Object]')) {
      console.log('Creating post from Make.com:', body.title)
      console.log('Body content preview:', body.body ? body.body.substring(0, 200) + '...' : 'No body content')
      
      // Manejar categorías - puede venir como array o string
      let categoryId = '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto
      if (body.categories && body.categories.length > 0 && body.categories[0] !== "") {
        categoryId = getCategoryId(body.categories[0])
      } else if (body.category && body.category !== "") {
        categoryId = getCategoryId(body.category)
      }
      
      // Manejar tags - puede venir como array o string
      let tagsArray: string[] = []
      if (Array.isArray(body.tags)) {
        tagsArray = body.tags.filter((tag: any) => tag && tag !== "")
      } else if (body.tags && body.tags !== "") {
        // Si es string, dividir por comas y limpiar espacios
        tagsArray = body.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== "")
      }
      
      // Crear post en Sanity desde Make.com
      const postData = {
        _type: 'post',
        title: body.title,
        slug: {
          _type: 'slug',
          current: body.slug
        },
        excerpt: body.excerpt || '',
        body: body.body,
        publishedAt: body.publishedAt || new Date().toISOString(),
        author: {
          _type: 'reference',
          _ref: '9a11d6a2-7a3f-44ad-bd1d-82a81a45ff8a' // ID del autor en Sanity
        },
            categories: [
              {
                _type: 'reference',
                _ref: categoryId,
                _key: `category-${Date.now()}`
              }
            ],
        tags: tagsArray,
        readTime: body.readTime || '5 min'
        // mainImage se agrega manualmente en Sanity Studio
      }

      console.log('Creating post with data:', JSON.stringify(postData, null, 2))

      try {
        // Crear el post en Sanity
        const result = await sanityClient.create(postData)
        
            console.log('Post created successfully:', result._id)
            
            // Revalidar cache de Next.js con más cobertura
            try {
              revalidatePath('/blog')
              revalidatePath('/blog/[slug]', 'page')
              revalidatePath('/sitemap.xml')
              revalidatePath('/')
              revalidateTag('blog-posts')
              revalidateTag('sanity-data')
              
              // Revalidar específicamente el slug del post creado
              if (body.slug) {
                revalidatePath(`/blog/${body.slug}`)
              }
              
              console.log('Cache revalidated successfully for all paths')
            } catch (revalidateError) {
              console.error('Error revalidating cache:', revalidateError)
            }
            
            return NextResponse.json({ 
              message: 'Post created successfully from Make.com',
              postId: result._id,
              title: body.title,
              slug: body.slug,
              success: true
            })
      } catch (sanityError: any) {
        console.error('Sanity error details:', {
          message: sanityError.message,
          statusCode: sanityError.statusCode,
          response: sanityError.response,
          body: sanityError.body
        })
        
        return NextResponse.json({ 
          message: 'Error creating post in Sanity',
          error: sanityError.message,
          statusCode: sanityError.statusCode,
          details: sanityError.response || sanityError.body
        }, { status: 500 })
      }
        }
        
        // Verificar si es una notificación de Sanity Studio (cambios en posts)
        if (body._type === 'post' || (body.document && body.document._type === 'post')) {
          console.log('Sanity Studio notification - revalidating cache')
          
          // Revalidar cache de Next.js con más cobertura
          try {
            revalidatePath('/blog')
            revalidatePath('/blog/[slug]', 'page')
            revalidatePath('/sitemap.xml')
            revalidatePath('/')
            revalidateTag('blog-posts')
            revalidateTag('sanity-data')
            console.log('Cache revalidated successfully from Sanity Studio')
          } catch (revalidateError) {
            console.error('Error revalidating cache:', revalidateError)
          }
          
          return NextResponse.json({ 
            message: 'Cache revalidated from Sanity Studio',
            success: true
          })
        }
        
        // Si llegamos aquí, no es una petición válida
        console.log('Invalid request - not from Make.com or Sanity Studio')
        console.log('Received fields:', {
          title: body.title,
          slug: body.slug,
          body: body.body ? 'present' : 'missing',
          _type: body._type,
          document: body.document
        })
        
        return NextResponse.json({ 
          message: 'Invalid request - not recognized',
          received: {
            title: body.title,
            slug: body.slug,
            body: body.body ? 'present' : 'missing',
            _type: body._type
          }
        }, { status: 400 })


  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

// Verificar que el webhook funciona
export async function GET() {
  return NextResponse.json({ 
    message: 'Sanity webhook endpoint is working',
    timestamp: new Date().toISOString()
  })
}
