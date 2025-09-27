import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { revalidatePath, revalidateTag } from 'next/cache'

// Función para mapear categorías de OpenAI a IDs de Sanity
function getCategoryId(category: unknown): string {
  if (typeof category !== 'string') {
    return '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto si no es string
  }
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

// Función para validar y sanitizar datos de entrada
function validateAndSanitizeData(body: any) {
  const errors: string[] = []
  
  // Validar campos requeridos
  if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
    errors.push('Title is required and must be a non-empty string')
  }
  
  // Manejar slug que puede venir como objeto o string
  let slugValue = ''
  if (typeof body.slug === 'string') {
    slugValue = body.slug
  } else if (body.slug && typeof body.slug === 'object' && body.slug.current) {
    slugValue = body.slug.current
  }
  
  if (!slugValue || slugValue.trim() === '') {
    errors.push('Slug is required and must be a non-empty string')
  }
  
  if (!body.body || typeof body.body !== 'string' || body.body.trim() === '') {
    errors.push('Body is required and must be a non-empty string')
  }
  
  // Sanitizar datos
  const sanitizedData = {
    title: body.title?.trim() || '',
    slug: slugValue ? slugValue.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') : '',
    body: body.body?.trim() || '',
    excerpt: body.excerpt?.trim() || '',
    publishedAt: body.publishedAt || new Date().toISOString(),
    readTime: body.readTime || '5 min',
    imageUrl: body.imageUrl || null,
    imageAlt: body.imageAlt || null,
    categories: body.categories || body.category || [],
    tags: body.tags || [],
    // Campos adicionales para SEO
    metaDescription: body.meta_description || body.excerpt?.trim() || '',
    keywords: body.keywordsArray || body.keywords || [],
    schemaType: body.schema_type || 'BlogPosting',
    difficultyLevel: body.difficulty_level || 'Intermedio'
  }
  
  return { sanitizedData, errors }
}

// Función para verificar si ya existe un post con el mismo slug
async function checkDuplicateSlug(slug: string): Promise<boolean> {
  try {
    const existingPost = await sanityClient.fetch(
      `*[_type == "post" && slug.current == "${slug}"][0] { _id }`
    )
    return !!existingPost
  } catch (error) {
    console.error('Error checking duplicate slug:', error)
    return false
  }
}

// Función para limpiar cache de manera más robusta
async function clearCache(slug?: string) {
  try {
    // Limpiar cache general
    await revalidatePath('/blog')
    await revalidatePath('/blog/[slug]', 'page')
    await revalidatePath('/sitemap.xml')
    await revalidatePath('/')
    await revalidateTag('blog-posts')
    await revalidateTag('sanity-data')
    
    // Limpiar cache específico del post si se proporciona slug
    if (slug) {
      await revalidatePath(`/blog/${slug}`)
    }
    
    console.log('Cache cleared successfully')
  } catch (error) {
    console.error('Error clearing cache:', error)
  }
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
        error: parseError.message,
        success: false
      }, { status: 400 })
    }
    
    // 1) Ignorar eventos de activos de imagen de Sanity
    if (body._type === 'sanity.imageAsset' || (typeof body._type === 'string' && body._type.includes('sanity.image'))) {
      console.log('Ignoring Sanity image asset webhook')
      return NextResponse.json({ message: 'Ignored image asset event', success: true })
    }

    // 2) Notificación de Sanity Studio (documento post creado/actualizado)
    const isSanityPostEvent = body._type === 'post' || (body.document && body.document._type === 'post')
    if (isSanityPostEvent) {
      console.log('Sanity Studio notification - revalidating cache')
      await clearCache(body.slug?.current || undefined)
      return NextResponse.json({ 
        message: 'Cache revalidated from Sanity Studio',
        success: true
      })
    }

    // 3) Evento proveniente de Make.com (marcadores únicos del payload)
    const isMakePayload = (
      !!body.webUrl &&
      (!!body.postId || !!body.timestamp) &&
      (typeof body.bodyType === 'string')
    )

    if (isMakePayload) {
      // Validar secreto opcional si está configurado
      const makeSecret = process.env.MAKE_WEBHOOK_SECRET
      const providedSecret = request.headers.get('x-webhook-secret') || request.headers.get('x-make-secret')
      if (makeSecret && providedSecret !== makeSecret) {
        console.warn('Unauthorized Make.com request: invalid secret')
        return NextResponse.json({ message: 'Unauthorized', success: false }, { status: 401 })
      }

      console.log('Creating post from Make.com:', body.title)
      
      // Validar y sanitizar datos
      const { sanitizedData, errors } = validateAndSanitizeData(body)
      
      if (errors.length > 0) {
        console.error('Validation errors:', errors)
        return NextResponse.json({ 
          message: 'Validation failed',
          errors,
          success: false
        }, { status: 400 })
      }
      
      // Verificar si ya existe un post con el mismo slug
      const isDuplicate = await checkDuplicateSlug(sanitizedData.slug)
      if (isDuplicate) {
        console.log('Duplicate slug detected:', sanitizedData.slug)
        return NextResponse.json({ 
          message: 'Post with this slug already exists',
          slug: sanitizedData.slug,
          success: false
        }, { status: 409 }) // Conflict status
      }
      
      // Manejar categorías
      let categoryId = '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto
      if (sanitizedData.categories && sanitizedData.categories.length > 0) {
        const categoryCandidate = Array.isArray(sanitizedData.categories) 
          ? sanitizedData.categories[0] 
          : sanitizedData.categories
        if (typeof categoryCandidate === 'string' && categoryCandidate.trim() !== "") {
          categoryId = getCategoryId(categoryCandidate)
        }
      }
      
      // Manejar tags
      let tagsArray: string[] = []
      if (Array.isArray(sanitizedData.tags)) {
        tagsArray = sanitizedData.tags.filter((tag: any) => typeof tag === 'string' && tag.trim() !== "")
      } else if (typeof sanitizedData.tags === 'string' && sanitizedData.tags.trim() !== "") {
        tagsArray = sanitizedData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== "")
      }
      
      // Procesar imagen si viene en el request
      let mainImageData = null
      if (sanitizedData.imageUrl) {
        try {
          console.log('Uploading image from URL:', sanitizedData.imageUrl)
          
          // Descargar imagen desde URL
          const imageResponse = await fetch(sanitizedData.imageUrl)
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
          }
          
          const imageBuffer = await imageResponse.arrayBuffer()
          const imageType = imageResponse.headers.get('content-type') || 'image/jpeg'
          
          // Subir imagen a Sanity
          const imageAsset = await sanityClient.assets.upload('image', Buffer.from(imageBuffer), {
            filename: `blog-image-${Date.now()}.jpg`,
            contentType: imageType
          })
          
          console.log('Image uploaded successfully:', imageAsset._id)
          
          mainImageData = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id
            },
            alt: sanitizedData.imageAlt || 'Blog post image'
          }
        } catch (imageError: any) {
          console.error('Error uploading image:', imageError.message)
          // Continuar sin imagen si falla la subida
        }
      }

      // Crear post en Sanity desde Make.com
      const postData = {
        _type: 'post',
        title: sanitizedData.title,
        slug: {
          _type: 'slug',
          current: sanitizedData.slug
        },
        excerpt: sanitizedData.excerpt,
        body: sanitizedData.body,
        publishedAt: sanitizedData.publishedAt,
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
        readTime: sanitizedData.readTime,
        ...(mainImageData && { mainImage: mainImageData })
      }

      console.log('Creating post with data:', JSON.stringify(postData, null, 2))

      try {
        // Crear el post en Sanity
        const result = await sanityClient.create(postData)
        
        console.log('Post created successfully:', result._id)
        
        // Limpiar cache de manera robusta
        await clearCache(sanitizedData.slug)
        
        return NextResponse.json({ 
          message: 'Post created successfully from Make.com',
          postId: result._id,
          title: sanitizedData.title,
          slug: sanitizedData.slug,
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
          details: sanityError.response || sanityError.body,
          success: false
        }, { status: 500 })
      }
    }
    
    // 4) Verificar si es una notificación de eliminación de post
    if (body._type === 'post' && body._deleted) {
      console.log('Post deleted notification - clearing cache')
      
      // Limpiar cache de manera robusta
      await clearCache()
      
      return NextResponse.json({ 
        message: 'Cache cleared after post deletion',
        success: true
      })
    }
    
    // 5) Si llegamos aquí, no es un evento relevante. Devolver 204 para evitar reintentos.
    console.log('Ignoring unrelated webhook event')
    return new NextResponse(null, { status: 204 })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
}

// Verificar que el webhook funciona
export async function GET() {
  return NextResponse.json({ 
    message: 'Sanity webhook endpoint is working',
    timestamp: new Date().toISOString()
  })
}
