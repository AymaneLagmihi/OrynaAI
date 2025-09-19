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
