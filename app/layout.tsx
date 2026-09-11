import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TestPrime // AI Banking Exam Generator & TCS iON CBT Simulator",
  description: "Transform your DPPs, notes, and study materials into authentic Indian banking mock tests (SBI PO, IBPS PO/Clerk, RRB, RBI Grade B) with real-time CBT simulation, sectional timers, and AI diagnostics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
