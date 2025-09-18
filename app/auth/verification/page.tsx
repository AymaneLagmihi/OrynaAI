'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast , Toaster } from "sonner";


const Verification = () => {
    const supabase = createClient();
  
  // Button handler for verifying email
    const handleVerify = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const email = userData?.user?.email;
    
    
    if (!email) {
      toast.error('Error',{
        description: "No user email found. Please log in first.",
      });
      return;
    }
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) {
        toast.error('Failed',{
          description: "Failed to resend verification email: " + error.message,
        });
    } else {
        toast.info('Verification Email Sent',{
          description: "Verification email resent. Please check your inbox.",
        });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md p-6 shadow-lg">
            <CardHeader className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
                <Button className="w-full" variant="secondary" onClick={handleVerify}>Verify Email</Button>
            </CardContent>
        </Card>
        {/* Toast Notifications */}
        <Toaster/>
    </div>
  );
};

export default Verification;