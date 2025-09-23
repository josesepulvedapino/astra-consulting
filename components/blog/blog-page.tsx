"use client"

import { Suspense } from "react"
import { BlogList } from "./blog-list"
import { BlogHero } from "./blog-hero"
import type { BlogPost } from "@/lib/sanity"

interface BlogPageProps {
  posts: BlogPost[]
}

function BlogContent({ posts }: BlogPageProps) {
  return (
    <>
      <BlogHero />
      <BlogList posts={posts} allPosts={posts} />
    </>
  )
}

export function BlogPage({ posts }: BlogPageProps) {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <Suspense fallback={<div>Cargando...</div>}>
        <BlogContent posts={posts} />
      </Suspense>
    </main>
  )
}
