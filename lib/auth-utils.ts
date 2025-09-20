'use client';

import { createClient } from './supabase/client';

export async function clearAuthTokens() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    
    // Clear localStorage tokens
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const projectRef = supabaseUrl.split('//')[1].split('.')[0];
    
    // Clear various possible token storage keys
    const possibleKeys = [
      `sb-${projectRef}-auth-token`,
      `supabase.auth.token`,
      `sb-auth-token`,
    ];
    
    possibleKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear all supabase related items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
    
    console.log('Auth tokens cleared successfully');
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
}

export async function handleAuthError(error: any) {
  if (
    error?.message?.includes('refresh_token_not_found') ||
    error?.message?.includes('Invalid Refresh Token') ||
    error?.code === 'refresh_token_not_found'
  ) {
    console.log('Refresh token error detected, clearing tokens and redirecting to login');
    await clearAuthTokens();
    window.location.href = '/auth/login';
    return true;
  }
  return false;
}