import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { FAQSection } from "@/components/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Astra Consulting - Consultoría Informática y SEO | Transformación Digital",
  description: "Consultoría informática líder en Chile. Especialistas en SEO, transformación digital, desarrollo web y soluciones tecnológicas innovadoras para empresas chilenas. Más de 15 empresas transformadas.",
  keywords: "consultoría informática Chile, SEO Chile, transformación digital, desarrollo web Chile, tecnología empresarial, marketing digital Chile, automatización procesos, ciberseguridad Chile",
  authors: [{ name: "Astra Consulting" }],
  creator: "Astra Consulting",
  publisher: "Astra Consulting",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://astraconsulting.cl",
    title: "Astra Consulting - Consultoría Informática y SEO",
    description: "Transformamos empresas chilenas con tecnología de vanguardia y estrategias SEO efectivas. Más de 150 empresas transformadas.",
    siteName: "Astra Consulting",
    images: [
      {
        url: "https://astraconsulting.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Astra Consulting - Consultoría Informática y SEO"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra Consulting - Consultoría Informática y SEO",
    description: "Transformamos empresas chilenas con tecnología de vanguardia y estrategias SEO efectivas.",
    images: ["https://astraconsulting.cl/og-image.jpg"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl",
  },
  category: "technology",
  classification: "Business",
  other: {
    "geo.region": "CL",
    "geo.country": "Chile",
    "geo.placename": "Chillán, Chile",
    "ICBM": "-36.6067, -72.1034"
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
