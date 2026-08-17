import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, ShieldCheck, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300 pt-16 pb-8 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 flex items-center justify-center text-amber-300 border border-amber-400/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Educator Girls Hostel
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Peshawar&apos;s premier luxury accommodation for female university students, medical officers, and professionals. Combining academic serenity, 5-star security, and homely comfort.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Verified Female-Only Premises</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Accommodations</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/rooms" className="hover:text-amber-300 transition-colors">Single Executive Rooms</Link></li>
              <li><Link href="/rooms" className="hover:text-amber-300 transition-colors">Deluxe Double Sharing</Link></li>
              <li><Link href="/rooms" className="hover:text-amber-300 transition-colors">Triple Economy Suites</Link></li>
              <li><Link href="/rooms" className="hover:text-amber-300 transition-colors">Quad Student Rooms</Link></li>
              <li><Link href="/amenities" className="hover:text-amber-300 transition-colors">Hostel Mess Menu</Link></li>
            </ul>
          </div>

          {/* Col 3: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Portals & Help</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/login" className="hover:text-amber-300 transition-colors">Resident Portal Login</Link></li>
              <li><Link href="/dashboard/resident/payments" className="hover:text-amber-300 transition-colors">Pay Monthly Rent</Link></li>
              <li><Link href="/dashboard/resident/gate-pass" className="hover:text-amber-300 transition-colors">Gate Pass Request</Link></li>
              <li><Link href="/dashboard/resident/maintenance" className="hover:text-amber-300 transition-colors">Submit Repair Ticket</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-amber-300 transition-colors">Admin Control Desk</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Contact Desk</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Main University Road, near University of Peshawar, Peshawar, KPK</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-mono">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>info@educatorhostel.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Educator Girls Hostel Peshawar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Academic Excellence & Safety
          </p>
        </div>
      </div>
    </footer>
  );
}
