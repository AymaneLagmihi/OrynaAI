"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Trash2, RotateCcw, Save, Share2, ArrowLeft, Wand2, Shuffle } from "lucide-react"
import Link from "next/link"

export default function CreateOutfitPage() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }>({})
  const [isGenerating, setIsGenerating] = useState(false)

  const categories = [
    {
      id: "tops",
      name: "Tops",
      items: [
        { id: 1, name: "White T-Shirt", image: "/placeholder.svg?height=120&width=120&text=Top1", color: "White" },
        { id: 2, name: "Black Blazer", image: "/placeholder.svg?height=120&width=120&text=Top2", color: "Black" },
        { id: 3, name: "Floral Blouse", image: "/placeholder.svg?height=120&width=120&text=Top3", color: "Floral" },
        { id: 4, name: "Denim Jacket", image: "/placeholder.svg?height=120&width=120&text=Top4", color: "Blue" },
      ],
    },
    {
      id: "bottoms",
      name: "Bottoms",
      items: [
        { id: 5, name: "Black Jeans", image: "/placeholder.svg?height=120&width=120&text=Bot1", color: "Black" },
        { id: 6, name: "Pencil Skirt", image: "/placeholder.svg?height=120&width=120&text=Bot2", color: "Navy" },
        { id: 7, name: "Cargo Pants", image: "/placeholder.svg?height=120&width=120&text=Bot3", color: "Khaki" },
        { id: 8, name: "Floral Dress", image: "/placeholder.svg?height=120&width=120&text=Bot4", color: "Floral" },
      ],
    },
    {
      id: "shoes",
      name: "Shoes",
      items: [
        { id: 9, name: "White Sneakers", image: "/placeholder.svg?height=120&width=120&text=Shoe1", color: "White" },
        { id: 10, name: "Black Heels", image: "/placeholder.svg?height=120&width=120&text=Shoe2", color: "Black" },
        { id: 11, name: "Brown Boots", image: "/placeholder.svg?height=120&width=120&text=Shoe3", color: "Brown" },
        { id: 12, name: "Canvas Shoes", image: "/placeholder.svg?height=120&width=120&text=Shoe4", color: "Blue" },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      items: [
        { id: 13, name: "Gold Necklace", image: "/placeholder.svg?height=120&width=120&text=Acc1", color: "Gold" },
        { id: 14, name: "Leather Bag", image: "/placeholder.svg?height=120&width=120&text=Acc2", color: "Brown" },
        { id: 15, name: "Sunglasses", image: "/placeholder.svg?height=120&width=120&text=Acc3", color: "Black" },
        { id: 16, name: "Silk Scarf", image: "/placeholder.svg?height=120&width=120&text=Acc4", color: "Red" },
      ],
    },
  ]

  const handleItemSelect = (category: string, item: any) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: item,
    }))
  }

  const handleRemoveItem = (category: string) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev }
      delete newItems[category]
      return newItems
    })
  }

  const handleGenerateOutfit = () => {
    setIsGenerating(true)
    setTimeout(() => {
      // Simulate AI outfit generation
      const randomOutfit = {
        tops: categories[0].items[Math.floor(Math.random() * categories[0].items.length)],
        bottoms: categories[1].items[Math.floor(Math.random() * categories[1].items.length)],
        shoes: categories[2].items[Math.floor(Math.random() * categories[2].items.length)],
        accessories: categories[3].items[Math.floor(Math.random() * categories[3].items.length)],
      }
      setSelectedItems(randomOutfit)
      setIsGenerating(false)
    }, 2000)
  }

  const handleShuffle = () => {
    const randomOutfit = {
      tops: categories[0].items[Math.floor(Math.random() * categories[0].items.length)],
      bottoms: categories[1].items[Math.floor(Math.random() * categories[1].items.length)],
      shoes: categories[2].items[Math.floor(Math.random() * categories[2].items.length)],
      accessories: categories[3].items[Math.floor(Math.random() * categories[3].items.length)],
    }
    setSelectedItems(randomOutfit)
  }

  const clearOutfit = () => {
    setSelectedItems({})
  }

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <Navigation />

      <main className="max-w-7xl mx-auto py-30 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Outfit</h1>
              <p className="text-muted-foreground">Mix and match to create your perfect look</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Outfit Preview */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Your Outfit</h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {Object.keys(selectedItems).length} items
                </Badge>
              </div>

              {/* Outfit Display */}
              <div className="space-y-4 mb-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 border border-border/50"
                  >
                    <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden">
                      {selectedItems[category.id] ? (
                        <img
                          src={selectedItems[category.id].image || "/placeholder.svg"}
                          alt={selectedItems[category.id].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{category.name}</p>
                      {selectedItems[category.id] ? (
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">{selectedItems[category.id].name}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveItem(category.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Select an item</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Actions */}
              <div className="space-y-3">
                <Button onClick={handleGenerateOutfit} disabled={isGenerating} className="w-full" size="lg">
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      AI Generate Outfit
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleShuffle}>
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle
                  </Button>
                  <Button variant="outline" onClick={clearOutfit}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Item Selection */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {categories.map((category) => (
                <Card key={category.id} className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedItems[category.id]?.id === item.id
                            ? "ring-2 ring-primary shadow-lg"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => handleItemSelect(category.id, item)}
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-white text-xs font-medium truncate">{item.name}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.color}
                          </Badge>
                        </div>
                        {selectedItems[category.id]?.id === item.id && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <Card className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Style Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="text-foreground font-medium mb-2">Color Harmony</h4>
              <p>Try pairing warm tones with neutral colors for a balanced look that complements your skin tone.</p>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Occasion Match</h4>
              <p>
                Consider the event type - casual pieces work great for everyday, while structured items suit formal
                occasions.
              </p>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Seasonal Style</h4>
              <p>Layer lighter pieces for spring, or add texture and depth for a cozy autumn aesthetic.</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
