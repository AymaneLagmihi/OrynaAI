'use server';

import { createClient } from "@/lib/supabase/server";

// Logout function
export async function logout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    window.location.href = "/";
}