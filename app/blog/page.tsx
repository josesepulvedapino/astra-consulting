import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPage as BlogPageComponent } from "@/components/blog/blog-page"
import { getAllBlogPosts } from "@/lib/sanity"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Astra Consulting | Consejos de Tecnología y SEO Chile",
  description: "Blog especializado en consultoría informática, SEO, desarrollo web y transformación digital para empresas chilenas. Consejos prácticos y casos de éxito.",
  keywords: "blog consultoría informática Chile, consejos SEO Chile, desarrollo web Chile, transformación digital, tecnología empresarial Chile",
  authors: [{ name: "Astra Consulting" }],
  creator: "Astra Consulting",
  publisher: "Astra Consulting",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://astraconsulting.cl/blog",
    title: "Blog - Astra Consulting | Consejos de Tecnología y SEO Chile",
    description: "Blog especializado en consultoría informática, SEO, desarrollo web y transformación digital para empresas chilenas.",
    siteName: "Astra Consulting",
    images: [
      {
        url: "https://astraconsulting.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Astra Consulting - Consejos de Tecnología y SEO Chile"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Astra Consulting | Consejos de Tecnología y SEO Chile",
    description: "Blog especializado en consultoría informática, SEO, desarrollo web y transformación digital para empresas chilenas.",
    images: ["https://astraconsulting.cl/og-image.png"]
  },
  alternates: {
    canonical: "https://astraconsulting.cl/blog",
  },
  category: "technology",
  classification: "Business Blog"
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <Header />
      <BlogPageComponent posts={posts} />
      <Footer />
    </>
  )
}
