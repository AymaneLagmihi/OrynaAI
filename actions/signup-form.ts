'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signupFormAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    throw new Error("All fields are required");
  }

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
  
  // Check if user needs email confirmation
  if (data.user && !data.user.email_confirmed_at) {
    redirect('/auth/verification');
  } else {
    redirect('/dashboard');
  }
}