'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Navigation} from "@/components/Navigation";
import {logout} from "@/actions/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  ChevronDown,
  Menu
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { handleAuthError } from "@/lib/auth-utils";
import Link from "next/link";

export const dynamic = 'force-dynamic'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const supabase = createClient();

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
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    const handled = await handleAuthError(error);
                    if (!handled) {
                        console.error('User fetch error:', error);
                    }
                } else {
                    setUser(user);
                }
            } catch (error) {
                await handleAuthError(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                setUser(null);
            } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setUser(session.user);
            }
        });
        
        return () => subscription.unsubscribe();
    }, [supabase]);

  // Render the dashboard
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        {/* Header */}
        <Navigation />
        {/* Main Content */}
        <main className=" flex justify-center min-h-screen py-8 mt-24">
          <div className="container space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.user_metadata?.name || "friend"}!</h1>
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

                      <Button className="w-full justify-start rounded-xl" variant="ghost" asChild>
                        <Link href="/ai-virtual-tryon">
                            <Camera className="mr-3 h-5 w-5" />
                            Virtual Try-On
                        </Link>
                      </Button>

                      <Button className="w-full justify-start rounded-xl" variant="ghost" asChild>
                        <Link href="/color-analysis">
                          <Palette className="mr-3 h-5 w-5" />
                          Color Analysis
                        </Link>
                      </Button>

                      <Button className="w-full justify-start rounded-xl" variant="ghost">
                        <Users className="mr-3 h-5 w-5" />
                        Style Community
                      </Button>
                      <Separator />
                      <Button className="w-full rounded-xl" asChild >
                        <Link href="/create-outfit">
                          <Wand2 className="mr-2 h-4 w-4" />
                          Create New Outfit
                        </Link>
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