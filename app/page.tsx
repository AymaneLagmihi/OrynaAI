"use client";

import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/toggle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { handleAuthError } from "@/lib/auth-utils";
import { Wand2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LightRays } from "@/components/ui/light-rays";



export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          await handleAuthError(error);
        } else {
          setUser(user);
        }
      } catch (error) {
        await handleAuthError(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-background text-foreground gradient-bg">
      <LightRays />
      {/* Floating Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl mx-auto px-4">
          <nav className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text">OrynaAI</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                  Features
                </Link>
                
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Get started
                    </Button>
                  </Link>
                )}
                <AnimatedThemeToggler />
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="flex px-6 pt-6">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-4">
                      <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                        Features
                      </Link>
                      <Link href="#showcase" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                        Showcase
                      </Link>
                      <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                        Experience
                      </Link>
                      {user ? (
                        <Link href="/dashboard">
                          <Button variant="outline" className="w-full rounded-xl">
                            Dashboard
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/auth">
                          <Button variant="outline" className="w-full rounded-xl">
                            Sign In
                          </Button>
                        </Link>
                      )}
                      <div className="flex justify-between items-center pt-4 px-7">
                        <span>Theme</span>
                        <AnimatedThemeToggler />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </header>


      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-primary">AI-Powered Fashion Technology</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Try On Clothes Before You Buy
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Transform your wardrobe with AI-powered insights. Upload your photo and clothing images, and watch our AI
            blend them perfectly to show you exactly how you'll look.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-transparent">
                  View Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button size="lg" className="rounded-full px-8 h-12 text-base">
                  Start Virtual Try-On
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            
          </div>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur p-8">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">AI Virtual Try-On Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for the perfect virtual try-on experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Image Blending</h3>
              <p className="text-muted-foreground">
                Our advanced AI seamlessly blends your photo with clothing images to create realistic try-on results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-muted-foreground">
                Get your virtual try-on results in seconds. No waiting, no complicated processes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Save & Share</h3>
              <p className="text-muted-foreground">
                Save all your generated images to your gallery and share them with friends instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LumeCoin Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 rounded-full">
              <span className="text-sm font-bold text-primary">LumeCoins</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Earn & Spend LumeCoins</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Each virtual try-on generation costs 10 LumeCoins. Start with free credits and earn more as you explore
              our platform.
            </p>
            <Link href="/ai-virtual-tryon">
              <Button size="lg" className="rounded-full px-8">
                Start Generating
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users discovering perfect outfit combinations with AI.
          </p>
          <Link href="/ai-virtual-tryon">
            <Button size="lg" className="rounded-full px-8 h-12 text-base">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">StyleAI</h3>
              <p className="text-sm text-muted-foreground">Transform your wardrobe with AI-powered insights.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/ai-virtual-tryon" className="hover:text-foreground transition">
                    Virtual Try-On
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 StyleAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
