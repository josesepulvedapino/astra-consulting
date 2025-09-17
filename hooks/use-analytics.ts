"use client"

import { useEffect } from 'react'

// Declarar gtag en el objeto window
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Hook para Google Analytics
export const useAnalytics = () => {
  useEffect(() => {
    // Asegurar que gtag esté disponible
    if (typeof window !== 'undefined' && window.gtag) {
      // Configuración inicial
      window.gtag('config', 'G-442GS7YYSG', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      })
    }
  }, [])

  // Función para trackear eventos personalizados
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: parameters?.label || '',
        value: parameters?.value || 0,
        ...parameters
      })
    }
  }

  // Función para trackear conversiones
  const trackConversion = (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'G-442GS7YYSG',
        event_category: 'conversion',
        event_label: conversionType,
        value: value || 0
      })
    }
  }

  // Función para trackear páginas
  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-442GS7YYSG', {
        page_path: pagePath,
        page_title: pageTitle || document.title
      })
    }
  }

  return {
    trackEvent,
    trackConversion,
    trackPageView
  }
}

// Eventos específicos para Astra Consulting
export const analyticsEvents = {
  // Eventos de contacto
  contactFormSubmit: (service: string) => ({
    event_name: 'contact_form_submit',
    service_type: service,
    event_category: 'lead_generation'
  }),

  // Eventos de navegación
  serviceClick: (service: string) => ({
    event_name: 'service_click',
    service_name: service,
    event_category: 'navigation'
  }),

  // Eventos de botones CTA
  ctaClick: (buttonText: string, location: string) => ({
    event_name: 'cta_click',
    button_text: buttonText,
    button_location: location,
    event_category: 'engagement'
  }),

  // Eventos de teléfono
  phoneClick: (phoneNumber: string) => ({
    event_name: 'phone_click',
    phone_number: phoneNumber,
    event_category: 'contact'
  }),

  // Eventos de email
  emailClick: (email: string) => ({
    event_name: 'email_click',
    email_address: email,
    event_category: 'contact'
  }),

  // Eventos de scroll
  scrollDepth: (depth: number) => ({
    event_name: 'scroll_depth',
    scroll_percentage: depth,
    event_category: 'engagement'
  }),

  // Eventos de tiempo en página
  timeOnPage: (seconds: number) => ({
    event_name: 'time_on_page',
    time_seconds: seconds,
    event_category: 'engagement'
  })
}
