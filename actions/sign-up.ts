'use server';

import { createClient } from "@/lib/supabase/server";

// Signup with email & password
export async function signup(email: string, password: string, name: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      data: {
        name,
        email,
      }
    }
  });
  
  if (error) throw error;
  return data;
}

// Signup with Google
export async function signupWithGoogle() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { 
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        prompt: 'select_account'
      }
    }
  });
  if (error) throw error;
}