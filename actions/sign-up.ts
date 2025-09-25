'use server';

import { createClient } from "@/lib/supabase/server";
import { upsertProfile } from "@/lib/profile-utils";


// Signup with email & password
export async function signup(email: string, password: string, name: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}`,
      data: {
        full_name: name,
        name,
        email,
      }
    }
  });
  
  if (error) throw error;
  // Profile is automatically created by database trigger
  return data;
}
