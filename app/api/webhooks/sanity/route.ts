import { NextRequest, NextResponse } from 'next/server'

// Webhook para recibir notificaciones de Sanity cuando se publique contenido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verificar que es una publicación de post
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
