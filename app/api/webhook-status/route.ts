import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    // Verificar conexión con Sanity
    let sanityStatus = 'unknown'
    let recentPosts = []
    let error = null
    
    try {
      const posts = await sanityClient.fetch(
        `*[_type == "post"] | order(publishedAt desc) [0...5] {
          _id,
          title,
          slug,
          publishedAt,
          author->{name}
        }`
      )
      recentPosts = posts
      sanityStatus = 'connected'
    } catch (sanityError: any) {
      sanityStatus = 'error'
      error = sanityError.message
    }
    
    // Verificar variables de entorno
    const envCheck = {
      SANITY_PROJECT_ID: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      SANITY_DATASET: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
      SANITY_API_TOKEN: !!process.env.SANITY_API_TOKEN,
    }
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      sanity: {
        status: sanityStatus,
        error,
        recentPosts: recentPosts.map(post => ({
          id: post._id,
          title: post.title,
          slug: post.slug?.current,
          publishedAt: post.publishedAt,
          author: post.author?.name
        }))
      },
      environment: envCheck,
      endpoints: {
        webhook: '/api/webhooks/sanity',
        clearCache: '/api/clear-cache',
        status: '/api/webhook-status'
      }
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Error checking webhook status',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { action } = body
    
    if (action === 'test-webhook') {
      // Simular una petición de prueba
      const testData = {
        title: 'Test Post - ' + new Date().toISOString(),
        slug: 'test-post-' + Date.now(),
        body: 'This is a test post created by the webhook status endpoint.',
        excerpt: 'Test excerpt',
        categories: ['SEO'],
        tags: ['test', 'webhook'],
        readTime: '1 min'
      }
      
      // Intentar crear un post de prueba
      try {
        const result = await sanityClient.create({
          _type: 'post',
          title: testData.title,
          slug: {
            _type: 'slug',
            current: testData.slug
          },
          excerpt: testData.excerpt,
          body: testData.body,
          publishedAt: new Date().toISOString(),
          author: {
            _type: 'reference',
            _ref: '9a11d6a2-7a3f-44ad-bd1d-82a81a45ff8a'
          },
          categories: [{
            _type: 'reference',
            _ref: '84977b7e-fc3e-4607-99e3-4eed7433189a',
            _key: `category-${Date.now()}`
          }],
          tags: testData.tags,
          readTime: testData.readTime
        })
        
        return NextResponse.json({
          message: 'Test post created successfully',
          postId: result._id,
          testData,
          success: true
        })
      } catch (createError: any) {
        return NextResponse.json({
          message: 'Test post creation failed',
          error: createError.message,
          testData,
          success: false
        }, { status: 500 })
      }
    }
    
    return NextResponse.json({
      message: 'Invalid action',
      availableActions: ['test-webhook'],
      success: false
    }, { status: 400 })
  } catch (error) {
    console.error('Status POST error:', error)
    return NextResponse.json({ 
      message: 'Error processing status request',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 })
  }
}
