// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { upsertProfile } from '@/lib/profile-utils'; // Import the new function

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  console.log('[CALLBACK ROUTE] Received params:', { 
    code: code ? 'present' : 'null', 
    error, 
    error_description,
    searchParams: Object.fromEntries(searchParams.entries()),
    origin 
  });

  // Handle OAuth errors
  if (error) {
    console.log('[CALLBACK ROUTE] OAuth error received:', { error, error_description });
    return NextResponse.redirect(`${origin}/auth/error?error_code=${error}&error_description=${error_description}`);
  }

  // Handle missing code
  if (!code) {
    console.log('[CALLBACK ROUTE] No code provided in the callback URL!', {
      searchParams: Object.fromEntries(searchParams.entries()),
      origin,
      code
    });
    return NextResponse.redirect(`${origin}/auth/error?error_code=missing_code&error_description=No authorization code provided`);
  }

  try {
    const supabase = await createClient();
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.log('[CALLBACK ROUTE] Error exchanging code for session: ', exchangeError);
      return NextResponse.redirect(`${origin}/auth/error?error_code=${exchangeError.message}&status=${exchangeError.status}&error_description=${exchangeError.message}`);
    }

    if (data.user) {
      // Upsert the profile after a successful OAuth login
      try {
        await upsertProfile(data.user.id, {
          fullName: data.user.user_metadata.full_name || data.user.user_metadata.name,
          avatarUrl: data.user.user_metadata.avatar_url
        });
      } catch (profileError) {
        console.error('[CALLBACK ROUTE] Profile upsert error (non-blocking):', profileError);
      }
      
      console.log('[CALLBACK ROUTE] Successful authentication, redirecting to dashboard');
      return NextResponse.redirect(`${origin}/dashboard`);
    } else {
      console.log('[CALLBACK ROUTE] No user data returned from exchange');
      return NextResponse.redirect(`${origin}/auth/error?error_code=no_user&error_description=No user data received`);
    }
  } catch (err) {
    console.error('[CALLBACK ROUTE] Unexpected error:', err);
    return NextResponse.redirect(`${origin}/auth/error?error_code=unexpected_error&error_description=An unexpected error occurred`);
  }
}
