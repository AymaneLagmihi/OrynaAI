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
