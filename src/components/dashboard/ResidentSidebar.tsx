"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bed, CalendarCheck, CreditCard, Wrench, ShieldCheck, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ResidentSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard/resident", label: "My Room Overview", icon: Bed },
    { href: "/dashboard/resident/bookings", label: "My Bookings & Stay", icon: CalendarCheck },
    { href: "/dashboard/resident/payments", label: "Rent & Payments", icon: CreditCard, badge: "Due" },
    { href: "/dashboard/resident/maintenance", label: "Maintenance Requests", icon: Wrench },
    { href: "/dashboard/resident/gate-pass", label: "Gate Pass Requests", icon: ShieldCheck },
    { href: "/dashboard/resident/profile", label: "Resident Profile", icon: User },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-[calc(100vh-5rem)] p-4 space-y-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
          <Badge variant="emerald" className="text-[10px]">Resident Portal</Badge>
          <h2 className="font-bold font-serif text-sm text-slate-900 dark:text-slate-100 mt-1">
            Fatima Khan (Room 204)
          </h2>
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
                    ? "bg-emerald-900 text-white shadow-md shadow-emerald-900/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant={isActive ? "gold" : "secondary"} className="text-[9px] px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition">
          <LogOut className="w-4 h-4" />
          <span>Exit to Main Site</span>
        </Link>
      </div>
    </aside>
  );
}
