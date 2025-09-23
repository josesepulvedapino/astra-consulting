import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

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
  
  return categoryMap[category] || '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto
}

// Webhook para recibir notificaciones de Sanity cuando se publique contenido
export async function POST(request: NextRequest) {
  try {
    // Leer el body como texto y limpiar caracteres problemáticos
    const rawBody = await request.text()
    
    // Limpiar solo los caracteres de control problemáticos
    const cleanedBody = rawBody
      .replace(/\n/g, '\\n')  // Escapar saltos de línea
      .replace(/\r/g, '\\r')  // Escapar retornos de carro
      .replace(/\t/g, '\\t')  // Escapar tabulaciones
    
    // Parsear el JSON limpio con manejo de errores
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
    
    // Verificar si es un post desde Make.com (campos no vacíos)
    if (body.title && body.title !== "" && body.slug && body.slug !== "" && body.body && body.body !== "") {
      console.log('Creating post from Make.com:', body.title)
      
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
            _ref: categoryId
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
    
    // Si llegamos aquí, no es una petición válida de Make.com
    console.log('Invalid request from Make.com - missing required fields')
    console.log('Received fields:', {
      title: body.title,
      slug: body.slug,
      body: body.body ? 'present' : 'missing',
      categories: body.categories,
      tags: body.tags
    })
    
    return NextResponse.json({ 
      message: 'Invalid request - missing required fields (title, slug, body)',
      received: {
        title: body.title,
        slug: body.slug,
        body: body.body ? 'present' : 'missing'
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
