import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Function to create Supabase client for server-side rendering
async function createSupabaseClient(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  return { supabase, supabaseResponse };
}

// Middleware function to handle authentication and redirection
export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = await createSupabaseClient(request);
  const { 
    data: { session }, 
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  const authRoutes = ["/auth", "/auth/login", "/auth/signup", "/auth/verification", "/auth/error"];
  const protectedRoutes = ["/dashboard"];

  if (session) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};