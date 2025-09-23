"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { sharePost } from "@/lib/share-utils"

interface ShareButtonProps {
  title: string
  url: string
  className?: string
}

export function ShareButton({ title, url, className = "" }: ShareButtonProps) {
  const handleShare = async () => {
    await sharePost(title, url)
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className={`hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 cursor-pointer ${className}`}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Compartir
    </Button>
  )
}
