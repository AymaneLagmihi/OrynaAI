import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"


export const metadata: Metadata = {
  title: "LumeAI",
  description: "Cutting-edge AI technology meets fashion expertise to deliver personalized styling solutions.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          {/* Vercel Speed Insights and Analytics*/}
          <SpeedInsights />
          <Analytics />
          
          {/* Theme Provider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
