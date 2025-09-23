import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()
    
    // Validar email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    
    // Enviar a Mailchimp
    const response = await fetch(`https://us2.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name || ''
        }
      })
    })
    
    if (response.ok) {
        return NextResponse.json({ 
          success: true,
          message: 'Suscripción exitosa. Te has unido a nuestro newsletter.' 
        })
    } else {
      const error = await response.json()
      
      // Manejar errores específicos de Mailchimp
      if (error.title === 'Member Exists') {
        return NextResponse.json({ 
          success: false,
          message: 'Este email ya está suscrito a nuestro newsletter.' 
        })
      }
      
      return NextResponse.json({ 
        success: false,
        message: error.detail || 'Error al suscribirse. Inténtalo de nuevo.' 
      })
    }
    
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ 
      success: false,
      message: 'Error interno del servidor. Inténtalo más tarde.' 
    })
  }
}
