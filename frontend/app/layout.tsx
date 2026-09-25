import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LeadsVero - Buy Verified Leads. Scale Your Outreach & Sales.",
    template: "%s | LeadsVero",
  },
  description:
    "Acquire 100% single-buyer, high-intent verified leads from Instagram, LinkedIn, Facebook, and YouTube. Instant CSV export with zero data recycling.",
  keywords: [
    "Buy verified leads",
    "B2B lead generation",
    "Instagram leads database",
    "LinkedIn buyer leads",
    "Real estate leads India",
    "Telecalling datasets",
    "High-intent sales leads",
  ],
  openGraph: {
    title: "LeadsVero - Buy Real Leads. Grow Your Business.",
    description:
      "Direct channels, active WhatsApp reach, and single-buyer locked lead packs. Instant CSV downloads with replacement guarantee.",
    url: "https://leadsvero.com",
    siteName: "LeadsVero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadsVero - High-Intent Verified Lead Marketplace",
    description:
      "Stop dialing dead directories. Access active buyer leads with 99.4% connectivity rate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-[#97df2c] selection:text-black">

        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}