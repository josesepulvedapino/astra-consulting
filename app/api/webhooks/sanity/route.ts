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
    const body = await request.json()
    
    // Verificar si es un post desde Make.com
    if (body.postId && body.title) {
      console.log('Creating post from Make.com:', body.title)
      
      // Crear post en Sanity desde Make.com
      const postData = {
        _type: 'post',
        title: body.title,
        slug: {
          _type: 'slug',
          current: body.slug
        },
        excerpt: body.excerpt,
        body: body.body,
        publishedAt: body.publishedAt || new Date().toISOString(),
        author: {
          _type: 'reference',
          _ref: '9a11d6a2-7a3f-44ad-bd1d-82a81a45ff8a' // ID del autor en Sanity
        },
        categories: [
          {
            _type: 'reference',
            _ref: getCategoryId(body.category) || '84977b7e-fc3e-4607-99e3-4eed7433189a' // SEO por defecto
          }
        ],
        tags: Array.isArray(body.tags) ? body.tags : [body.tags],
        readTime: body.readTime || '5 min',
        // mainImage: {
        //   _type: 'image',
        //   asset: {
        //     _type: 'reference',
        //     _ref: 'image-default-blog'
        //   }
        // }
      }

      // Crear el post en Sanity
      const result = await sanityClient.create(postData)
      
      console.log('Post created successfully:', result._id)
      
      return NextResponse.json({ 
        message: 'Post created successfully from Make.com',
        postId: result._id,
        title: body.title,
        slug: body.slug
      })
    }
    
    // Verificar que es una publicación de post desde Sanity
    if (body._type !== 'post' || body._rev) {
      return NextResponse.json({ message: 'Not a new post publication' }, { status: 200 })
    }

    // Preparar datos para Make.com usando los datos del webhook
     const makePayload = {
       postId: body._id,
       title: body.title,
       slug: body.slug?.current || 'sin-slug',
       excerpt: body.excerpt,
       body: body.body, // Portable Text desde Sanity
       bodyType: 'portable-text', // Indicar el tipo de contenido
       publishedAt: body.publishedAt,
       author: body.author?.name || 'Autor',
       categories: body.categories?.map((cat: any) => cat.title) || [],
       tags: body.tags || [],
       readTime: body.readTime,
       webUrl: `https://astraconsulting.cl/blog/${body.slug?.current || 'sin-slug'}`,
       timestamp: new Date().toISOString()
     }

    // Enviar a Make.com (esto se configurará en Make.com)
    const makeResponse = await fetch(process.env.MAKE_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAKE_API_KEY}`
      },
      body: JSON.stringify(makePayload)
    })

    if (!makeResponse.ok) {
      console.error('Error sending to Make.com:', await makeResponse.text())
      return NextResponse.json({ message: 'Error sending to Make.com' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Post sent to Make.com successfully',
      postId: body._id,
      title: body.title
    })

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
