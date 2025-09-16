import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Astra Consulting - Consultoría Informática y SEO | Transformación Digital",
  description:
    "Consultoría informática líder en Chile. Especialistas en SEO, transformación digital, desarrollo web y soluciones tecnológicas innovadoras para empresas chilenas.",
  keywords:
    "consultoría informática Chile, SEO Chile, transformación digital, desarrollo web Chile, tecnología empresarial, marketing digital Chile",
  authors: [{ name: "Astra Consulting" }],
  creator: "Astra Consulting",
  publisher: "Astra Consulting",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://astraconsulting.cl",
    title: "Astra Consulting - Consultoría Informática y SEO",
    description: "Transformamos empresas chilenas con tecnología de vanguardia y estrategias SEO efectivas.",
    siteName: "Astra Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra Consulting - Consultoría Informática y SEO",
    description: "Transformamos empresas chilenas con tecnología de vanguardia y estrategias SEO efectivas.",
  },
  alternates: {
    canonical: "https://astraconsulting.cl",
  },
  generator: "Astra Consulting",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Astra Consulting",
    "description": "Consultoría informática líder en Chile. Especialistas en SEO, transformación digital, desarrollo web y soluciones tecnológicas innovadoras para empresas chilenas.",
    "url": "https://astraconsulting.cl",
    "logo": "https://astraconsulting.cl/logo.png",
    "image": "https://astraconsulting.cl/og-image.jpg",
    "telephone": "+56-9-2687-3545",
    "email": "contacto@astraconsulting.cl",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chillán",
      "addressRegion": "Región de Ñuble",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-36.6067",
      "longitude": "-72.1034"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Chile"
    },
    "serviceType": [
      "Consultoría Informática",
      "SEO y Marketing Digital",
      "Desarrollo Web",
      "Aplicaciones Móviles",
      "Ciberseguridad",
      "Automatización de Procesos"
    ],
    "foundingDate": "2015",
    "numberOfEmployees": "10-50",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/company/astra-consulting",
      "https://twitter.com/astraconsulting",
      "https://www.facebook.com/astraconsulting"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56-9-2687-3545",
      "contactType": "customer service",
      "areaServed": "CL",
      "availableLanguage": ["Spanish", "English"]
    }
  }

  return (
    <html lang="es-CL" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
