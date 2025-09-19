'use server';

import { createClient } from "@/lib/supabase/server";


// Signup with email & password
export async function signup(email: string, password: string, name: string) {
  const supabase = await createClient();
  const redirectTo = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/verification"
    : `${process.env.NEXT_PUBLIC_APP_URL}/auth/verification`;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: {
        name,
        email,
      }
    }
  });
  
  if (error) throw error;
  return data;
}
