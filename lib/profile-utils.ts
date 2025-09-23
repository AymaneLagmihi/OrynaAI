// lib/profile-utils.ts
'use server';

import { createClient } from "@/lib/supabase/server";
import { email } from "zod";

export async function upsertProfile(userId: string, data: { fullName?: string, avatarUrl?: string, email?: string }) {
  const supabase = await createClient();

  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .single();

  const profileData = {
    id: userId,
    full_name: data.fullName,
    email: data.email,
    avatar_url: data.avatarUrl,
    updated_at: new Date().toISOString(),
  };

  let result;
  if (existingProfile) {
    // Update existing profile
    result = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
  } else {
    // Insert new profile
    result = await supabase
      .from('profiles')
      .insert(profileData);
  }

  if (result.error) {
    console.error("Error upserting profile:", result.error);
    throw result.error;
  }
}
