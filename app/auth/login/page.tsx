"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login , loginWithGoogle } from "@/actions/login"
import { toast, Toaster } from "sonner"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
        toast.error('Error',{
        description: "Please fill in all fields",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const user = await login(email, password)
      console.log("Logged in:", user)
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err)
      toast.error('Google Signin Failed',{
        description: err.message || "Login failed. Please check your credentials..",
      });
    } finally {
      setIsLoading(false);
    }
  }
  

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await loginWithGoogle()
      // The user will be redirected to the OAuth provider's page
    } catch (error) {
      console.error("Google login error:", error)
      toast.error("Failed to login with Google. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration/Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center text-center space-y-6 p-8">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-card-foreground">{"Welcome Back"}</h1>
            <p className="text-lg text-muted-foreground max-w-md">
              {
                "Secure authentication with multiple options. Sign in with your email, use a magic link, or continue with Google."
              }
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-card-foreground">{"Sign In"}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {"Enter your credentials to access your account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    {"Email"}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-input border-border focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                {!useMagicLink && (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      {"Password"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-input border-border focus:ring-ring"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="magic-link"
                    checked={useMagicLink}
                    onCheckedChange={(checked) => setUseMagicLink(checked as boolean)}
                  />
                  <Label htmlFor="magic-link" className="text-sm text-muted-foreground cursor-pointer">
                    {"Use passwordless magic link instead"}
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : useMagicLink ? "Send Magic Link" : "Sign In"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{"Or continue with"}</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-muted bg-transparent"
                onClick={handleGoogleLogin}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {"Continue with Google"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
                  {"Sign up"}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
