"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";


export default function GoogleSignup() {
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // redirects back to your app
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
    },
      },
    });

    if (error) {
      console.error("Google signup error:", error.message);
    }
  };

  return (
    <>
      {/* Google Sign In */}
      <script src="https://accounts.google.com/gsi/client" async>
        <Button 
            variant="outline" 
            id="login"
            className="w-full h-12 border-2 hover:bg-accent/50 transition-all duration-300"
            onClick={handleGoogleSignup}
            type="button"
        > 
            <Chrome className="mr-2 h-4 w-4" />
            Sign in with Google

        </Button>
      </script>
    </>
  );
}
