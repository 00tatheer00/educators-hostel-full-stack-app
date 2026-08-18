"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Single Executive", value: 15, color: "#ffd700" },
  { name: "Deluxe Double", value: 40, color: "#d4af37" },
  { name: "Triple Economy", value: 25, color: "#f59e0b" },
  { name: "Quad Student", value: 10, color: "#92400e" },
];

export function OccupancyChart() {
  return (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#070709" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#0c0c10",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#d1d5db" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
