import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LiveActivityTicker from "@/components/common/LiveActivityTicker";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LeadsVero - Buy Fresh Leads. Scale Your Outreach & Sales.",
    template: "%s | LeadsVero",
  },
  description:
    "Acquire 100% single-buyer, high-intent Fresh Leads from Instagram, LinkedIn, Facebook, and YouTube. Instant CSV export with zero data recycling.",
  keywords: [
    "Buy Fresh Leads",
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
    title: "LeadsVero - High-Intent Fresh Lead Marketplace",
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
      <head>
        {/* Meta Pixel Base Code */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '919748114351857');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=919748114351857&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-[#97df2c] selection:text-black">
        <AuthProvider>{children}</AuthProvider>
        {/* Live Social Proof Ticker */}
        <LiveActivityTicker />
      </body>
    </html>
  );
}