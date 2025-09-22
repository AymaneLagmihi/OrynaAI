"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { Palette, Upload, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ColorAnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const colorPalettes = [
    {
      name: "Warm & Bright",
      colors: ["#FF6B6B", "#FFD93D", "#6BCF7F", "#4ECDC4", "#FF8E53", "#A8E6CF"],
    },
    {
      name: "Cool & Soft",
      colors: ["#74B9FF", "#A29BFE", "#FD79A8", "#FDCB6E", "#6C5CE7", "#00B894"],
    },
    {
      name: "Deep & Rich",
      colors: ["#2D3436", "#636E72", "#B2BEC3", "#DDD", "#0984E3", "#00B894"],
    },
    {
      name: "Classic & Neutral",
      colors: ["#2C3E50", "#34495E", "#95A5A6", "#BDC3C7", "#E74C3C", "#3498DB"],
    },
  ]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-30 sm:px-6 lg:px-8 ">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-chart-4/10">
              <Palette className="h-6 w-6 text-chart-4" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Color Analysis</h1>
              <p className="text-muted-foreground">Find your perfect color palette</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Upload Your Photo</h2>

              <div className="border-2 border-dashed border-border rounded-lg p-12 hover:border-chart-4/50 transition-colors cursor-pointer">
                <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">Drop your photo here or click to browse</p>
                <p className="text-sm text-muted-foreground">
                  Best results with natural lighting and clear face visibility
                </p>
              </div>

              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full max-w-sm" size="lg">
                {isAnalyzing ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Your Colors...
                  </>
                ) : (
                  <>
                    <Palette className="h-4 w-4 mr-2" />
                    Analyze My Colors
                  </>
                )}
              </Button>
            </div>
          </Card>

          {showResults && (
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Your Perfect Palette</h2>
                <p className="text-muted-foreground">Based on your features, these colors will look amazing on you!</p>

                <div className="space-y-6">
                  {colorPalettes.map((palette, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">{palette.name}</h3>
                      <div className="flex justify-center gap-2">
                        {palette.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-12 h-12 rounded-lg border-2 border-border/50"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="mr-4 bg-transparent">
                    Save Palette
                  </Button>
                  <Button variant="outline">Try Again</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
