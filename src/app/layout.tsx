import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteLayoutWrapper } from "@/components/layout/SiteLayoutWrapper";
import { GlobalMouseSpotlight } from "@/components/common/GlobalMouseSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Educator Girls Hostel Peshawar | Luxury & Secure Female Accommodation",
  description:
    "Premier girls hostel in Peshawar near University of Peshawar. Offering 24/7 biometric security, AC rooms, hygienic mess meals, high-speed fiber Wi-Fi, and female staff.",
  keywords: [
    "Educator Girls Hostel",
    "Girls Hostel Peshawar",
    "Peshawar Hostel for Female Students",
    "University Road Peshawar Hostel",
    "Luxury Hostel KPK",
  ],
  authors: [{ name: "Educator Girls Hostel" }],
  icons: {
    icon: "/images/logo-dark.png",
    apple: "/images/logo-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans bg-[#070709] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
        <Providers>
          <GlobalMouseSpotlight />
          <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
