"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client";

export default function Callback() {
  const router = useRouter()
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/dashboard") // ✅ send user here
      } else {
        router.push("/") // fallback if no session
      }
    })
  }, [router])

  return <p>Loading...</p>
}
