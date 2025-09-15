'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Calendar,
  Camera,
  Heart,
  Home,
  PlusCircle,
  Search,
  Settings,
  Shirt,
  ShoppingBag,
  Star,
  TrendingUp,
  User,
  Users,
  Wand2,
  Sparkles,
  Target,
  Palette,
  Clock,
  Award,
  BarChart3,
  Filter,
  ChevronDown
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { createBrowserClient } from "@/lib/supabase/client";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const supabase = createBrowserClient();

  // Sample data for demonstration purposes
  const recentOutfits = [
    { id: 1, name: "Casual Friday", items: 4, likes: 23, date: "2 hours ago" },
    { id: 2, name: "Evening Gala", items: 5, likes: 45, date: "1 day ago" },
    { id: 3, name: "Weekend Brunch", items: 3, likes: 18, date: "3 days ago" },
  ];

  const styleStats = [
    { category: "Casual", percentage: 45, count: 28 },
    { category: "Formal", percentage: 30, count: 18 },
    { category: "Business", percentage: 15, count: 9 },
    { category: "Party", percentage: 10, count: 6 },
  ];

    const [user, setUser] = useState<any>(null);


  async function signOut() {
    const { error } = await supabase.auth.signOut()
  } 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Wand2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Clothy AI
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search outfits, items..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-card/50"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata?.name || "No name set"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back,{user?.user_metadata?.name || "friend"}!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your style journey today.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button className="rounded-xl">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Items
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Camera className="mr-2 h-4 w-4" />
                Try On
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card border-0 shadow-soft hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Shirt className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-soft hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outfits Created</CardTitle>
                <Wand2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +7 this week
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-soft hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Style Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">
                  <Award className="inline h-3 w-3 mr-1" />
                  Fashion Expert level
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-soft hover:shadow-elegant transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +89 this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50 dark:bg-muted/30 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="wardrobe" className="rounded-lg">Wardrobe</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-7">
                {/* Recent Outfits */}
                <Card className="lg:col-span-4 bg-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Recent Outfits
                    </CardTitle>
                    <CardDescription>Your latest style creations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOutfits.map((outfit) => (
                      <div key={outfit.id} className="flex items-center justify-between p-4 bg-muted/30 dark:bg-muted/60 rounded-xl hover:bg-muted/50 dark:hover:bg-muted/70 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Shirt className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{outfit.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {outfit.items} items • {outfit.likes} likes
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            <Clock className="mr-1 h-3 w-3" />
                            {outfit.date}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl">
                      View All Outfits
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="lg:col-span-3 bg-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Style yourself in seconds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start rounded-xl" variant="ghost">
                      <Target className="mr-3 h-5 w-5" />
                      AI Style Match
                    </Button>
                    <Button className="w-full justify-start rounded-xl" variant="ghost">
                      <Camera className="mr-3 h-5 w-5" />
                      Virtual Try-On
                    </Button>
                    <Button className="w-full justify-start rounded-xl" variant="ghost">
                      <Palette className="mr-3 h-5 w-5" />
                      Color Analysis
                    </Button>
                    <Button className="w-full justify-start rounded-xl" variant="ghost">
                      <Users className="mr-3 h-5 w-5" />
                      Style Community
                    </Button>
                    <Separator />
                    <Button className="w-full rounded-xl">
                      <Wand2 className="mr-2 h-4 w-4" />
                      Create New Outfit
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Wardrobe Tab */}
            <TabsContent value="wardrobe" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 bg-card border-0 shadow-elegant">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Wardrobe Overview</CardTitle>
                      <CardDescription>Your digital closet at a glance</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="aspect-square bg-muted/30 dark:bg-muted/60 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center group hover:border-primary/50 hover:bg-muted/50 dark:hover:bg-muted/70 transition-colors cursor-pointer">
                          <Shirt className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>Browse by type</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"].map((category) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/60 rounded-xl hover:bg-muted/50 dark:hover:bg-muted/70 transition-colors">
                        <span className="font-medium">{category}</span>
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 20) + 5}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Style Distribution
                    </CardTitle>
                    <CardDescription>Your fashion preferences breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {styleStats.map((stat) => (
                      <div key={stat.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stat.category}</span>
                          <span className="text-muted-foreground">{stat.count} items</span>
                        </div>
                        <Progress value={stat.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card border-0 shadow-elegant">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Your styling journey this week</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Outfits Created</span>
                        <Badge variant="secondary">7 this week</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Items Added</span>
                        <Badge variant="secondary">12 this week</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Community Interactions</span>
                        <Badge variant="secondary">89 this week</Badge>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Achievement Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Style Streak</span>
                          <span>12/30 days</span>
                        </div>
                        <Progress value={40} className="h-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;