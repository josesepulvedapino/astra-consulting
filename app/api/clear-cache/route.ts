import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json().catch(() => ({}))
    
    console.log('Manual cache clear requested', { slug })
    
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
    
    return NextResponse.json({ 
      message: 'Cache cleared successfully',
      clearedPaths: [
        '/blog',
        '/blog/[slug]',
        '/sitemap.xml',
        '/',
        'blog-posts tag',
        'sanity-data tag',
        ...(slug ? [`/blog/${slug}`] : [])
      ],
      success: true
    })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json({ 
      message: 'Error clearing cache',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Cache clear endpoint is working',
    usage: 'POST to this endpoint with optional { "slug": "post-slug" } to clear cache',
    timestamp: new Date().toISOString()
  })
}
