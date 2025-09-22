// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    } else {
      console.log('[CALLBACK ROUTE] Error exchanging code for session: ', error);
      return NextResponse.redirect(`${origin}/auth/error?error_code=${error?.message}&status=${error?.status}&error_message=${error?.message}&error_description=${error?.message}`)
    }
  }

  console.log('[CALLBACK ROUTE] No code provided in the callback URL!', {
    searchParams, origin, code
  });
  return NextResponse.redirect(`${origin}/auth/error`)
}
