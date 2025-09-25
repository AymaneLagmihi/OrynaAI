"use client"

import { useState } from "react"
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { logout } from "@/actions/logout"
import { ModeToggle } from "@/components/mode-toggle"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    styleUpdates: true,
    communityActivity: false,
    aiRecommendations: true,
    weeklyDigest: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    shareAnalytics: false,
    personalizedAds: true,
  })

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Shield className="h-4 w-4" />
                    Privacy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Palette className="h-4 w-4" />
                    Appearance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Globe className="h-4 w-4" />
                    Language
                  </Button>
                  <Separator className="my-4" />
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and style preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Tell us about your style..." />
                </div>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Style Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new style recommendations</p>
                  </div>
                  <Switch
                    checked={notifications.styleUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, styleUpdates: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Community Activity</Label>
                    <p className="text-sm text-muted-foreground">Updates from the style community</p>
                  </div>
                  <Switch
                    checked={notifications.communityActivity}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, communityActivity: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Personalized outfit suggestions</p>
                  </div>
                  <Switch
                    checked={notifications.aiRecommendations}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, aiRecommendations: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of your style activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyDigest: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Share Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve our AI with anonymous usage data</p>
                  </div>
                  <Switch
                    checked={privacy.shareAnalytics}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, shareAnalytics: checked }))}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Personalized Ads</Label>
                    <p className="text-sm text-muted-foreground">Show ads based on your style preferences</p>
                  </div>
                  <Switch
                    checked={privacy.personalizedAds}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, personalizedAds: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the app looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <ModeToggle />
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
