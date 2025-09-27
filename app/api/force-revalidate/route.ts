import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    console.log('Force revalidation requested')
    
    // Limpiar TODOS los caches posibles
    await revalidatePath('/blog')
    await revalidatePath('/blog/[slug]', 'page')
    await revalidatePath('/sitemap.xml')
    await revalidatePath('/')
    await revalidateTag('blog-posts')
    await revalidateTag('sanity-data')
    
    // Limpiar cache de todas las rutas dinámicas del blog
    try {
      // Esto fuerza la regeneración de todas las páginas del blog
      await revalidatePath('/blog', 'layout')
    } catch (error) {
      console.log('Layout revalidation failed, continuing...')
    }
    
    console.log('Force revalidation completed')
    
    return NextResponse.json({ 
      message: 'Force revalidation completed successfully',
      clearedPaths: [
        '/blog',
        '/blog/[slug]',
        '/sitemap.xml',
        '/',
        'blog-posts tag',
        'sanity-data tag'
      ],
      success: true
    })
  } catch (error) {
    console.error('Error in force revalidation:', error)
    return NextResponse.json({ 
      message: 'Error during force revalidation',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Force revalidation endpoint is working',
    usage: 'POST to this endpoint to force revalidation of all blog content',
    timestamp: new Date().toISOString()
  })
}
