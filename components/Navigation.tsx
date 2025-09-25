'use Client';

import React from "react";
import Link from "next/link";
import { Wand2, Search, Bell, User, Settings, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserRound } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { logout } from "@/actions/logout";
import { getProfile } from "@/actions/get-profile";

export function Navigation() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchUserAndProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // Fetch the profile data for the logged-in user
                const userProfile = await getProfile(user.id);
                setProfile(userProfile);
            }
        };
        fetchUserAndProfile();
    }, [supabase]);

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl mx-auto px-4">
          <nav className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-hero bg-clip-text">Clothy AI</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
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
                <ModeToggle/>
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
                        <ModeToggle/>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </header>
  );
}