'use server';

import { createClient } from "@/lib/supabase/server";

export async function addCoins(userId: string, amount: number) {
    const supabase = await createClient();

    // Fetch the current coin balance
    const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('coins')
        .eq('id', userId)
        .single();

    if (fetchError || !profile) {
        console.error("Error fetching profile to add coins:", fetchError);
        throw fetchError;
    }

    const newBalance = profile.coins + amount;

    // Update the coin balance in an atomic operation
    const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ coins: newBalance })
        .eq('id', userId);

    if (updateError) {
        console.error("Error updating profile with new coins:", updateError);
        throw updateError;
    }
    
    return data;
}