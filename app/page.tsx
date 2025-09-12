
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Sparkles, 
  Palette, 
  Users, 
  ArrowRight, 
  Camera, 
  Shirt, 
  Star,
  Zap,
  Target,
  Wand2,
  TrendingUp,
  CheckCircle,
  Globe,
  MessageCircle,
  Play
} from "lucide-react";
import Image from "next/image";
import heroImage from "@/public/image.png";
import RotatingText from '@/components/RotatingText';


export default function Home() {
  return (
      <div className="min-h-screen bg-background">
        {/* Floating Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl mx-auto px-4">
          <nav className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text">Clothy AI</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#showcase"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  Showcase
                </Link>
                <Link
                  href="#experience"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  Experience
                </Link>
                
                <Button variant="outline" size="sm" className="rounded-xl">
                  Try Now
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Login
                </Button>
                <Button variant="secondary" size="sm" className="rounded-xl">
                  Sign Up
                </Button>

                <ModeToggle/>
              </div>
            </div>
          </nav>
        </header>

        <section className="relative min-h-screen overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative container mx-auto px-4 pt-32 pb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-6">
                  <Badge variant="outline" className="px-4 py-2 rounded-full border-primary/20 bg-primary/5">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    Next-Gen AI Fashion Assistant
                  </Badge>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-hero bg-clip-text">Style</span>
                    <br/>
                    <RotatingText
                      texts={['Revolution', 'Atelier', 'Prestige', 'Monarch!']}
                      mainClassName=" text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-left rounded-lg "
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="text-foreground overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                  />
                    <br/>
                    <span className="text-muted-foreground text-3xl lg:text-4xl font-medium">Starts Here</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    Transform your wardrobe with AI-powered insights. Discover perfect combinations, explore new styles, and express your unique fashion identity.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group rounded-2xl shadow-glow hover:shadow-elegant"
                  >
                    <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Begin Journey
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    // size="hero"
                    size='sm'
                    className="group rounded-2xl border-2"
                  >
                    <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-sm text-muted-foreground">Outfits Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15K+</div>
                    <div className="text-sm text-muted-foreground">Style Profiles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="lg:col-span-6 relative">
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-3xl shadow-elegant">
                    <Image 
                      src={heroImage}
                      width={700}
                      height={700}
                      alt="AI Fashion Styling" 
                      className="w-full h-[700px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  </div>

                  {/* Floating Cards */}
                  <Card className="absolute -top-4 -left-4 bg-card/90 backdrop-blur-sm border-0 shadow-elegant w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Style Match</div>
                          <div className="text-xs text-muted-foreground">95% Compatible</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm border-0 shadow-elegant w-52">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Trending Now</div>
                          <div className="text-xs text-muted-foreground">Minimalist Chic</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Features Showcase */}
        <section id="features" className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <Badge variant="outline" className="px-4 py-2 rounded-full">
                <Wand2 className="h-4 w-4 mr-2" />
                Powerful Features
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Your Fashion Arsenal
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Cutting-edge AI technology meets fashion expertise to deliver personalized styling solutions.
              </p>
            </div>

            <Tabs defaultValue="wardrobe" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-card border rounded-2xl p-2">
                <TabsTrigger value="wardrobe" className="rounded-xl">Smart Wardrobe</TabsTrigger>
                <TabsTrigger value="ai" className="rounded-xl">AI Styling</TabsTrigger>
                <TabsTrigger value="social" className="rounded-xl">Social Features</TabsTrigger>
              </TabsList>

              <TabsContent value="wardrobe" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-foreground">Digital Closet Management</h3>
                    <p className="text-lg text-muted-foreground">
                      Transform your physical wardrobe into an intelligent digital catalog. Our AI analyzes colors, patterns, and styles to create perfect outfit combinations.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Automatic clothing categorization</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Color and pattern analysis</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Seasonal organization</span>
                      </div>
                    </div>
                    <Button 
                      // variant="hero" 
                      variant="outline" 
                      className="rounded-xl"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Items
                    </Button>
                  </div>
                  <div className="relative bg-secondary/10 rounded-xl dark:bg-secondary/20 transition-colors">
                    <Card className="bg-card border-0 shadow-elegant p-8">
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div
                            key={item}
                            className="aspect-square rounded-xl animate-pulse transition-colors bg-muted/30 dark:bg-muted/60"
                          />
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative order-last lg:order-first">
                    <Card className="bg-card border-0 shadow-elegant p-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">AI Recommendation</div>
                            <div className="text-sm text-muted-foreground">Perfect for: Evening Event</div>
                          </div>
                        </div>
                        <div className="h-40 bg-muted/30 dark:bg-muted/60 rounded-xl animate-pulse" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Confidence: 96%</span>
                          <Badge variant="secondary">Trending</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-foreground">Intelligent Style Engine</h3>
                    <p className="text-lg text-muted-foreground">
                      Our advanced AI analyzes millions of fashion combinations to suggest outfits that match your personal style, occasion, and weather.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Context-aware recommendations</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Weather-based suggestions</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Personal style learning</span>
                      </div>
                    </div>
                    <Button 
                      // variant="hero"
                      variant="outline" 
                      className="rounded-xl"
                    >
                      <Shirt className="h-4 w-4 mr-2" />
                      Get Styled
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-foreground">Fashion Community</h3>
                    <p className="text-lg text-muted-foreground">
                      Connect with fashion enthusiasts worldwide. Share your style, get feedback, and discover trending looks from the community.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Style sharing platform</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Community feedback</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Trending discovery</span>
                      </div>
                    </div>
                    <Button 
                      // variant="hero" 
                      variant="outline" 
                      className="rounded-xl"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Join Community
                    </Button>
                  </div>
                  <div className="relative">
                    <Card className="bg-card border-0 shadow-elegant p-8">
                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex items-center space-x-3 p-3 bg-background/50 dark:bg-card/50 rounded-xl">
                            <div className="h-10 w-10 bg-muted/50 rounded-full animate-pulse dark:bg-muted/60" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-muted/50 rounded animate-pulse" />
                              <div className="h-2 bg-muted/30 rounded animate-pulse w-3/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
  );
}
