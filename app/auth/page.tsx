import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, Key } from "lucide-react"
import { Suspense } from "react"  

export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-br from-card to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8 mb-16">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-card-foreground text-balance">
                {"Clothy"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                {
                  "Transform your wardrobe with AI-powered insights. Discover perfect combinations, explore new styles, and express your unique fashion identity."
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/auth/login">{"Sign In"}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-muted bg-transparent">
                <Link href="/auth/signup">{"Create Account"}</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{"Traditional Login"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {"Secure email and password authentication with password visibility toggle and form validation."}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-card-foreground">{"Magic Links"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {"Passwordless authentication via secure magic links sent directly to your email inbox."}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <CardTitle className="text-card-foreground">{"Google OAuth"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {"One-click authentication using your existing Google account for maximum convenience."}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
