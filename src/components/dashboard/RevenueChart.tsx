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
              <stop offset="5%" stopColor="#0f5132" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0f5132" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-[11px]" />
          <YAxis tickLine={false} axisLine={false} className="text-[11px]" tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip
            formatter={(value: any) => [formatPKR(Number(value)), "Revenue"]}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#0f5132" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
