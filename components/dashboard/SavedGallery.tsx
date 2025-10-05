"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, History } from "lucide-react"
import Image from "next/image"

interface SavedImage {
  id: string
  url: string
  timestamp: number
  personImage: string
  clothingImage: string
}

interface SavedGalleryProps {
  savedImages: SavedImage[]
  onDelete: (id: string) => void
}

export function SavedGallery({ savedImages, onDelete }: SavedGalleryProps) {
  return (
    <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-120px)] lg:overflow-y-auto">
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Saved Gallery</h2>
          </div>
          <span className="text-xs text-muted-foreground">{savedImages.length}</span>
        </div>

        {savedImages.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">No saved images yet</p>
            <p className="text-xs text-muted-foreground mt-1">Generate to see results here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedImages.map((saved) => (
              <div key={saved.id} className="group relative">
                <Card className="overflow-hidden bg-secondary/20 border-border/50 hover:border-primary/50 transition-all">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={saved.url || "/placeholder.svg"}
                      alt="Saved virtual try-on"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = saved.url
                          link.download = `virtual-tryon-${saved.id}.png`
                          link.click()
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(saved.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground">
                      {new Date(saved.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}