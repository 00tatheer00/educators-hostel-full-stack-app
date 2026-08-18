"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatPKR } from "@/lib/utils";

const data = [
  { month: "Jan", revenue: 1250000 },
  { month: "Feb", revenue: 1320000 },
  { month: "Mar", revenue: 1280000 },
  { month: "Apr", revenue: 1400000 },
  { month: "May", revenue: 1450000 },
  { month: "Jun", revenue: 1420000 },
  { month: "Jul", revenue: 1490000 },
  { month: "Aug", revenue: 1512000 },
];

export function RevenueChart() {
  return (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(212, 175, 55, 0.15)" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-[11px] fill-slate-400" />
          <YAxis tickLine={false} axisLine={false} className="text-[11px] fill-slate-400" tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip
            formatter={(value: any) => [formatPKR(Number(value)), "Revenue"]}
            contentStyle={{
              backgroundColor: "#0c0c10",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#fbbf24",
            }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
