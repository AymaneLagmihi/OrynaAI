"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {

  async function handleSignInWithGoogle(response: any) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })
  }

  return (
    <>
      {/* Google Sign In */}
      
        <Button 
            variant="outline" 
            id="login"
            className="w-full h-12 border-2 hover:bg-accent/50 transition-all duration-300"
            onClick={handleSignInWithGoogle}
            type="button"
        > 
            <Chrome className="mr-2 h-4 w-4" />
            Sign in with Google

        </Button>
    </>
  );
}
