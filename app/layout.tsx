import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://test-prime-nine.vercel.app"),
  title: {
    default: "TestPrime // Free Bank Mock Test 2026 & TCS iON CBT Simulator",
    template: "%s | TestPrime",
  },
  description:
    "Free online banking mock tests (SBI PO, IBPS PO, SBI Clerk, IBPS Clerk, RBI Grade B) with authentic TCS iON CBT console, sectional 20-min countdown clocks, -0.25 negative marking, and AI diagnostics.",
  keywords: [
    "bank mock test free",
    "sbi po mock test 2026",
    "ibps po mock test free online",
    "sbi clerk test series",
    "tcs ion exam simulator",
    "banking preparation cbt",
    "free banking test series",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://test-prime-nine.vercel.app",
    title: "TestPrime // Free Bank Mock Test 2026 & TCS iON CBT Simulator",
    description:
      "Practice Indian banking exams in authentic TCS iON exam hall simulator with sectional timers, negative marking, and instant AI analytics.",
    siteName: "TestPrime",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestPrime // Free Bank Mock Test 2026 & TCS iON CBT Simulator",
    description:
      "100% Free TCS iON Exam Simulator for SBI PO, IBPS PO, and Clerk aspirants.",
  },
  other: {
    "google-adsense-account": "ca-pub-8023550227126773",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-8023550227126773";

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={adsenseId} />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
