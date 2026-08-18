"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bed, CalendarCheck, Users, CreditCard, Wrench, ShieldCheck, UserCog, LogOut, UtensilsCrossed, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/common/Logo";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/rooms", label: "Rooms (CRUD)", icon: Bed },
    { href: "/dashboard/admin/bookings", label: "Live Bookings", icon: CalendarCheck, badge: "Live" },
    { href: "/dashboard/admin/residents", label: "Resident Directory", icon: Users },
    { href: "/dashboard/admin/mess-menu", label: "Mess / Dining Menu", icon: UtensilsCrossed },
    { href: "/dashboard/admin/payments", label: "Payments & Finance", icon: CreditCard },
    { href: "/dashboard/admin/maintenance", label: "Maintenance Desk", icon: Wrench },
    { href: "/dashboard/admin/gate-passes", label: "Gate Passes & Security", icon: ShieldCheck },
    { href: "/dashboard/admin/users", label: "Staff & Permissions", icon: UserCog },
  ];

  return (
    <aside className="w-64 border-r border-amber-500/20 bg-[#0c0c10] min-h-[calc(100vh-5rem)] p-4 space-y-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-2 py-2.5 border-b border-amber-500/15 flex items-center gap-3">
          <Logo variant="dark" size={48} showText={false} />
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Admin
            </span>
            <h2 className="font-bold font-serif text-xs text-white mt-0.5">Control Center</h2>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-amber-300 hover:bg-slate-950/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-slate-950 text-amber-300" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-amber-500/15">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/10 rounded-xl transition">
          <LogOut className="w-4 h-4" />
          <span>Exit to Main Site</span>
        </Link>
      </div>
    </aside>
  );
}
