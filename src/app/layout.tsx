import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
