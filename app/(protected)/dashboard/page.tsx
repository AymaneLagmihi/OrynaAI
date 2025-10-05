"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/Navigation"
import { SavedGallery } from "@/components/dashboard/SavedGallery"
import { GenerationSection } from "@/components/dashboard/GenerationSection"

interface SavedImage {
  id: string
  url: string
  timestamp: number
  personImage: string
  clothingImage: string
}

export default function AIVirtualTryOnPage() {
  const [savedImages, setSavedImages] = useState<SavedImage[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("virtualTryOnGallery")
    if (saved) {
      setSavedImages(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
        localStorage.setItem("virtualTryOnGallery", JSON.stringify(savedImages))
    }
  }, [savedImages])

  const handleGenerationComplete = (newImage: SavedImage) => {
    setSavedImages((prev) => [newImage, ...prev]);
  };

  const handleDeleteSavedImage = (id: string) => {
    setSavedImages((prev) => {
      const updated = prev.filter((image) => image.id !== id)
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Navigation />
      <main className="max-w-[1800px] mx-auto px-4 py-25 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          <SavedGallery savedImages={savedImages} onDelete={handleDeleteSavedImage} />
          <GenerationSection onGenerationComplete={handleGenerationComplete} />
        </div>
      </main>
    </div>
  )
}