"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, Download, Share2, Sparkles, User, Shirt } from "lucide-react"
import Image from "next/image"

interface SavedImage {
  id: string
  url: string
  timestamp: number
  personImage: string
  clothingImage: string
}

interface GenerationSectionProps {
  onGenerationComplete: (newImage: SavedImage) => void;
}

export function GenerationSection({ onGenerationComplete }: GenerationSectionProps) {
  const [personImage, setPersonImage] = useState<File | null>(null)
  const [clothingImage, setClothingImage] = useState<File | null>(null)
  const prompt = 'Take the first image of the person and the second image of the clothes. Blend them realistically so that the person is wearing the clothes from the second image. Keep the person’s body, face, and natural proportions unchanged, but fit the clothing accurately onto them. Adjust the perspective, lighting, and shadows to make the result look natural and seamless, as if the person is truly wearing those clothes.'
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const personInputRef = useRef<HTMLInputElement>(null)
  const clothingInputRef = useRef<HTMLInputElement>(null)

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
    setGeneratedImage(null);

    const formData = new FormData();
    formData.append("image1", personImage);
    formData.append("image2", clothingImage);
    formData.append("promptText", prompt);

    const res = await fetch("/api/google-genai", {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }


    const data = await res.json();
    setIsGenerating(false);

    if (data?.data?.[0]?.url) {
      const imageUrl = data.data[0].url;
      setGeneratedImage(imageUrl);

      const newSaved: SavedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        timestamp: Date.now(),
        personImage: URL.createObjectURL(personImage),
        clothingImage: URL.createObjectURL(clothingImage),
      };
      onGenerationComplete(newSaved);
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

  return (
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
              className="relative aspect-[3/4] border-2 border-dashed border-border/50 rounded-lg hover:border-accent/50 transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => personInputRef.current?.click()}
            >
              {personImage ? (
                <Image
                  src={URL.createObjectURL(personImage)}
                  alt="Your photo"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
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
              className="relative aspect-[3/4] border-2 border-dashed border-border/50 rounded-lg hover:border-accent/50 transition-colors cursor-pointer flex items-center justify-center"
              onClick={() => clothingInputRef.current?.click()}
              >
              {clothingImage ? (
                <Image
                  src={URL.createObjectURL(clothingImage)}
                  alt="Clothing item"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
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

        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 mt-4">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Generate Section</h3>

          {/* AI Generation Area */}
          <div className="relative bg-secondary/20 rounded-lg overflow-hidden mb-4 mx-auto max-w-sm"
            style={{ aspectRatio: "3/4" }}
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
                    fill
                    className="object-cover"
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
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
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
  )
}
