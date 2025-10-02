'use client';

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <MailCheck className="h-12 w-12 text-green-500 mb-2" />
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            A sign in link has been sent to your email address.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}