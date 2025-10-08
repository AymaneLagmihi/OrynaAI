'use client';

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
import { AnimatedThemeToggler } from "./toggle";
import { CoinDisplay } from "./dashboard/CoinDisplay";
import { useNextStep } from 'nextstepjs';
import {HelpButton} from "./dashboard/HelpButton";


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
      <>
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl mx-auto px-4">
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-elegant">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Wand2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  OrynaAI
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div id="coin-display">
                  <CoinDisplay />
                </div>

                <AnimatedThemeToggler />
                

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url} alt="@user"/>
                        <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile?.full_name || user?.user_metadata?.name || "No name set"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{profile?.email || ""}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link href='/settings'>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={async () => await logout()}>
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-2">
                <div id="coin-display">
                  <CoinDisplay />
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 ">
                      {/* Menu Items */}
                      <div className="flex flex-col px-3.5 space-y-2">
                        <div className="flex justify-between items-center p-2">
                            <span>Coins</span>
                            <CoinDisplay />
                        </div>

                        <Button variant="ghost" className="justify-start" asChild>
                          <Link href='/settings'>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Link>
                        </Button>
                        <Button variant="ghost" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                        </Button>
                        <div className="flex justify-between items-center p-2">
                            <span>Theme</span>
                            <AnimatedThemeToggler />
                        </div>
                        
                      </div>
                      

                      <Separator />
                      <div className=" w-full flex justify-center">
                        <Button variant="destructive" className="justify-center w-50 px-3.5" onClick={async () => await logout()}>
                          Sign Out
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className=" flex items-end space-x-4 justify-end fixed bottom-4 right-5 z-50">
                        <HelpButton/>
                      </div>
                    </div>

                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        <div className="hidden md:flex items-end space-x-4 justify-end fixed bottom-4 right-4 z-50">
          <div className="fixed">
            <HelpButton />
          </div>
        </div>
        
      </>
  );
}