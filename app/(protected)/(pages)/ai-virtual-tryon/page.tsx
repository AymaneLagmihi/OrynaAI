"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import { Navigation } from "@/components/navigation"
import { ArrowLeft, Upload, Download, Share2, Sparkles, User, Shirt } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"

export default function AIVirtualTryOnPage() {
  const [personImage, setPersonImage] = useState<string | null>(null)
  const [clothingImage, setClothingImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const personInputRef = useRef<HTMLInputElement>(null)
  const clothingInputRef = useRef<HTMLInputElement>(null)

  const handlePersonImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPersonImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClothingImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setClothingImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!personImage || !clothingImage) return

    setIsGenerating(true)

    setTimeout(() => {
      // For demo purposes, we'll show a placeholder result
      setGeneratedImage("/person-wearing-stylish-outfit-virtual-try-on-resul.jpg")
      setIsGenerating(false)
    }, 3000)
  }

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

  return (
    <div className="min-h-screen bg-background gradient-bg">
        <Navigation />

        <main className="max-w-7xl mx-auto py-30 px-4 sm:px-6 lg:px-8 ">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
                </Button>
            </Link>
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                <h1 className="text-3xl font-bold text-foreground">AI Virtual Try-On</h1>
                <p className="text-muted-foreground">Upload your photo and clothing to see AI magic</p>
                </div>
            </div>
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Upload Your Photo */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <User className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold text-foreground">Upload Your Photo</h2>
                </div>

                <div
                    className="relative border-2 border-dashed border-border/50 rounded-lg p-8 hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => personInputRef.current?.click()}
                >
                    {personImage ? (
                    <img
                        src={personImage || "/placeholder.svg"}
                        alt="Your photo"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    ) : (
                    <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Click to upload your photo</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
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
                </div>
            </Card>

            {/* Upload Clothing */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Shirt className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold text-foreground">Upload What You Want to Wear</h2>
                </div>

                <div
                    className="relative border-2 border-dashed border-border/50 rounded-lg p-8 hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => clothingInputRef.current?.click()}
                >
                    {clothingImage ? (
                    <img
                        src={clothingImage || "/placeholder.svg"}
                        alt="Clothing item"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    ) : (
                    <div className="text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">Click to upload clothing</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
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
                </div>
            </Card>
            </div>

            {/* Generate Section */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-6">Generate Section</h2>

                {/* AI Generation Area */}
                <div
                className="relative bg-secondary/20 rounded-lg overflow-hidden mb-6"
                style={{ aspectRatio: "3/4", minHeight: "500px" }}
                >
                {isGenerating ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
                        <p className="text-foreground text-lg font-medium">AI is blending your images...</p>
                        <p className="text-muted-foreground text-sm mt-2">This may take a few moments</p>
                    </div>
                    </div>
                ) : generatedImage ? (
                    <img
                    src={generatedImage || "/placeholder.svg"}
                    alt="AI Generated Result"
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">Your AI-generated result will appear here</p>
                        <p className="text-sm text-muted-foreground mt-2">Upload both images and click Generate</p>
                    </div>
                    </div>
                )}
                </div>

                {/* Generate Button */}
                <Button
                onClick={handleGenerate}
                disabled={!personImage || !clothingImage || isGenerating}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium mb-6"
                >
                <Sparkles className="h-5 w-5 mr-2" />
                {isGenerating ? "Generating..." : "Generate AI Try-On"}
                </Button>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleSaveImage} disabled={!generatedImage}>
                    <Download className="h-4 w-4 mr-2" />
                    Save Image
                </Button>
                <Button variant="outline" onClick={handleShare} disabled={!generatedImage}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                </Button>
                </div>
            </div>
            </Card>

            {/* Virtual Try-On Tips */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Virtual Try-On Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                <h4 className="text-foreground font-medium mb-2">Photo Quality</h4>
                <p>Use high-resolution images with good lighting for best AI results. Avoid blurry or dark photos.</p>
                </div>
                <div>
                <h4 className="text-foreground font-medium mb-2">Person Pose</h4>
                <p>Stand straight facing the camera with arms slightly away from your body for optimal fitting.</p>
                </div>
                <div>
                <h4 className="text-foreground font-medium mb-2">Clothing Images</h4>
                <p>Use clear product photos or flat lay images of clothing items for the most accurate blending.</p>
                </div>
            </div>
            </Card>
        </main>
    </div>
  )
}
