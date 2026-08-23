import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/bukwin/shared/theme-provider";
import { FloatingChat } from "@/components/bukwin/chat/floating-chat";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bukwin.com"),
  title: "Bukwin AI — Never Miss a Call. Never Lose a Customer.",
  description:
    "Bukwin AI is a premium AI receptionist that answers your phone 24/7, books appointments, takes orders, and speaks your customers' language — priced flat, set up in 48 hours.",
  keywords: [
    "AI receptionist",
    "AI phone agent",
    "automated call answering",
    "appointment booking AI",
    "small business automation",
    "Bukwin AI",
  ],
  authors: [{ name: "Bukwin AI" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Bukwin AI — Never Miss a Call. Never Lose a Customer.",
    description:
      "Premium AI receptionist that answers 24/7, books appointments, and speaks 30+ languages. Flat pricing, live in 48 hours.",
    url: "https://bukwin.com",
    siteName: "Bukwin AI",
    type: "website",
    images: [
      {
        url: "/api/og?title=Never%20miss%20a%20call.%20Never%20lose%20a%20customer.",
        width: 1200,
        height: 630,
        alt: "Bukwin AI — Premium AI Receptionist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bukwin AI — Premium AI Receptionist",
    description:
      "Never miss a call again. 24/7 answering, booking, multilingual. Flat pricing.",
    images: ["/api/og?title=Never%20miss%20a%20call.%20Never%20lose%20a%20customer."],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <FloatingChat />
      </body>
    </html>
  );
}
