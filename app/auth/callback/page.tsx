"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  const supabase = createBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const user = session.user;

        // Insert or update profile
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: user.user_metadata.full_name,
          email: user.email,
          avatar_url: user.user_metadata.avatar_url,
          updated_at: new Date().toISOString(),
        });

        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    };

    handleSession();
  }, [router]);

  return <p>Loading...</p>;
}
