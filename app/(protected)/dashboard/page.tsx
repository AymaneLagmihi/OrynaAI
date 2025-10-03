"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Upload, Download, Share2, Sparkles, User, Shirt, Trash2, History } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Image from "next/image"

interface SavedImage {
  id: string
  url: string
  timestamp: number
  personImage: string
  clothingImage: string
}

export default function AIVirtualTryOnPage() {
  const [personImage, setPersonImage] = useState<File | null>(null)
  const [clothingImage, setClothingImage] = useState<File | null>(null)
  const prompt = 'Take the first image of the person and the second image of the clothes. Blend them realistically so that the person is wearing the clothes from the second image. Keep the person’s body, face, and natural proportions unchanged, but fit the clothing accurately onto them. Adjust the perspective, lighting, and shadows to make the result look natural and seamless, as if the person is truly wearing those clothes.'
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedImages, setSavedImages] = useState<SavedImage[]>([])

  const personInputRef = useRef<HTMLInputElement>(null)
  const clothingInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("virtualTryOnGallery")
    if (saved) {
      setSavedImages(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (savedImages.length > 0) {
      localStorage.setItem("virtualTryOnGallery", JSON.stringify(savedImages))
    }
  }, [savedImages])

  const handlePersonImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPersonImage(e.target.files[0]);
    }
  };

  const handleClothingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setClothingImage(e.target.files[0]);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personImage || !clothingImage) return;

    setIsGenerating(true);

    const formData = new FormData();
    formData.append("image1", personImage);
    formData.append("image2", clothingImage);
    formData.append("prompt", prompt);

    const res = await fetch("/api/blend", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setIsGenerating(false);

    // Expect OpenRouter response: { data: [{ url: "..." }] }
    if (data?.data?.[0]?.url) {
      setGeneratedImage(data.data[0].url);

      // Save to localStorage
      const newSaved: SavedImage = {
        id: crypto.randomUUID(),
        url: data.data[0].url,
        timestamp: Date.now(),
        personImage: URL.createObjectURL(personImage),
        clothingImage: URL.createObjectURL(clothingImage),
      };
      setSavedImages((prev) => [...prev, newSaved]);
    } else {
      console.error("Unexpected response:", data);
    }
  };

  const handleSaveImage = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = "virtual-tryon-result.png"
      link.click()
    }
  }

  const handleShare = () => {
    if (generatedImage && navigator.share) {
      navigator.share({
        title: "My Virtual Try-On Result",
        text: "Check out my AI-generated outfit!",
        url: window.location.href,
      })
    }
  }

  const handleDeleteSavedImage = (id: string) => {
    setSavedImages((prev) => {
      const updated = prev.filter((Image) => Image.id !== id)
      localStorage.setItem("virtualTryOnGallery", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-background gradient-bg">
      {/* Header */}
      <Navigation />
      <main className="max-w-[1800px] mx-auto px-4 py-25 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          {/* Left Sidebar - Saved Gallery */}
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
                              className="w-full h-full object-cover rounded-lg"
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
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteSavedImage(saved.id)}>
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

          {/* Right Side - Generate Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload Your Photo */}
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">Upload Your Photo</h3>
                  </div>

                  <div
                    className="relative border-2 border-dashed border-border/50 rounded-lg p-4 hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => personInputRef.current?.click()}
                  >
                    {personImage ? (
                      <Image
                        src={URL.createObjectURL(personImage)}
                        alt="Your photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Click to upload</p>
                      </div>
                    )}
                    <input
                        ref={personInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePersonImageUpload}
                        className="hidden"
                    />
                  </div>
                </Card>

                {/* Upload Clothing */}
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Shirt className="h-4 w-4 text-accent" />
                    <h3 className="text-sm font-semibold text-foreground">Upload Clothing</h3>
                  </div>

                  <div
                    className="relative border-2 border-dashed border-border/50 rounded-lg p-4 hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => clothingInputRef.current?.click()}
                    >
                    {clothingImage ? (
                      <Image
                        src={URL.createObjectURL(clothingImage)}
                        alt="Clothing item"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Click to upload</p>
                      </div>
                    )}

                    <input
                        ref={clothingInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleClothingImageUpload}
                        className="hidden"
                    />
                  </div>
                </Card>
              </div>
              
              {/* Generate & Result Section */}

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Generate Section</h3>

                {/* AI Generation Area - Smaller */}
                <div className="relative bg-secondary/20 rounded-lg overflow-hidden mb-4"
                  style={{ aspectRatio: "3/4", maxHeight: "400px" }}
                >
                  {isGenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-3"></div>
                          <p className="text-foreground font-medium">AI is blending...</p>
                        </div>
                      </div>
                      ) : generatedImage ? (
                      <Image
                          src={generatedImage || "/placeholder.svg"} 
                          alt="Blended result" 
                          className="w-full h-full object-cover"
                      />
                      ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-4">
                          <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground text-sm">Your result will appear here</p>
                        </div>
                      </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={!personImage || !clothingImage || isGenerating}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                  <Button variant="outline" onClick={handleSaveImage} disabled={!generatedImage}>
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleShare} disabled={!generatedImage}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </Card>
                  
            </form>

                {/* Virtual Try-On Tips */}
                <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Tips for Best Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Photo Quality</h4>
                      <p>Use high-resolution images with good lighting for best results.</p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Person Pose</h4>
                      <p>Stand straight facing the camera with arms slightly away from body.</p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">Clothing Images</h4>
                      <p>Use clear product photos or flat lay images of clothing items.</p>
                    </div>
                  </div>
              </Card>
              </div>
            </div>
        </main>
    </div>
  )
}
