"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

interface SiteLayoutWrapperProps {
  children: React.ReactNode;
}

export function SiteLayoutWrapper({ children }: SiteLayoutWrapperProps) {
  const pathname = usePathname();

  // Determine if current route is an Admin Portal or Dashboard route
  const isAdminRoute =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard/admin");

  const isResidentDashboard = pathname?.startsWith("/dashboard/resident");

  // Completely isolate Admin routes from public website (no public navbar, footer, or floating widgets)
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col antialiased">
        {children}
      </div>
    );
  }

  // Resident dashboard: clean standalone dashboard workspace
  if (isResidentDashboard) {
    return (
      <div className="min-h-screen bg-[#070709] text-slate-100 flex flex-col antialiased">
        {children}
      </div>
    );
  }

  // Public Website: Full layout with luxury Navbar, Footer, and Floating WhatsApp
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
