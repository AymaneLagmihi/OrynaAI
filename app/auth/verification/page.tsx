'use client';

import React, { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle , Loader2} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast , Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

// app/auth/confirm/page.tsx

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    const supabase = createClient();
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as "signup" | "magiclink" | "invite";

    if (!token_hash || !type) {
      toast.error("Invalid verification link.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      toast.error(`Error verifying email: ${error.message}`);
      console.error(error);
    } else {
      toast.success("✅ Email verified! Redirecting...");
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex flex-col items-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
            <Button className="w-full" variant="secondary" onClick={handleVerify} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm my account"}
            </Button>
        </CardContent>
    </Card>
  );
}

function LoadingFallback() {
  return (
    <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin mb-2" />
            <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">Preparing email verification...</p>
        </CardContent>
    </Card>
  );
}

export default function ConfirmEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
        <Suspense fallback={<LoadingFallback />}>
          <ConfirmEmailContent />
        </Suspense>
        {/* Toast Notifications */}
        <Toaster/>
    </div>
  );
}
