"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleAuthButton() {
  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Optional custom callback page
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    } else {
      console.log("Redirecting to Google...");
    }
  };

  return (
    <>
      {/* Google Sign In */}
      
        <Button 
            variant="outline" 
            id="login"
            className="w-full h-12 border-2 hover:bg-accent/50 transition-all duration-300"
            onClick={handleGoogleLogin}
            type="button"
        > 
            <Chrome className="mr-2 h-4 w-4" />
            Sign in with Google

        </Button>
    </>
  );
}
