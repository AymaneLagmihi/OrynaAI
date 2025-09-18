'use server';

import { createClient } from "@/lib/supabase/server";

// Login with email & password
export async function login(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error("Supabase login error:", error);
    throw error;
  }

  // Return the data for the component to handle navigation
  return data; 
}

// Login with Google
export async function loginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { 
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      queryParams: {
        prompt: 'consent',
        access_type: 'offline'
      }
    }
  });
  
  if (error) {
    console.error("Supabase Google OAuth error:", error);
    throw error;
  }
  
  // No need to check for data.session, as the returned data does not have a session property for OAuth login
  return data;
}