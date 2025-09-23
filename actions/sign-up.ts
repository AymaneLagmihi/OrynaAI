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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL} `,
      data: {
        name,
        email,
      }
    }
  });
  
  if (error) throw error;
  // After successful sign-up, create a profile entry
  
  if (data.user) {
    await upsertProfile(data.user.id, { fullName: name });
  }
  return data;
}
