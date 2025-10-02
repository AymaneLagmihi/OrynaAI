'use server';

import { createClient } from "@/lib/supabase/server";
import { upsertProfile } from "@/lib/profile-utils";
import { redirect } from "next/navigation";

export async function loginFormAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error("Supabase login error:", error);
    throw error;
  }
  
  // After successful login, upsert the user profile
  if (data.user) {
    try {
      await upsertProfile(data.user.id, {
        fullName: data.user.user_metadata.name || data.user.user_metadata.full_name,
        avatarUrl: data.user.user_metadata.avatar_url
      });
    } catch (profileError) {
      // Log error but don't fail the login
      console.error("Error upserting profile during login:", profileError);
    }
  }
  
  // Redirect to dashboard on successful login
  redirect('/dashboard');
}