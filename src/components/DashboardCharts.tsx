"use client";

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

const COLORS = ["#0d2035", "#24486a", "#56799b", "#8ca7c0", "#c8a96e", "#d8c29a"];

export function DashboardCharts({ moleculeData, geographyData }: { moleculeData: { name: string; count: number }[]; geographyData: { name: string; count: number }[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-black/5 bg-white p-6">
        <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Molecule distribution</div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moleculeData.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e0d4" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 11 }} angle={-15} textAnchor="end" height={56} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#0d2035" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border border-black/5 bg-white p-6">
        <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Geographic distribution</div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={geographyData.slice(0, 6)} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={92} innerRadius={48} paddingAngle={3}>
                {geographyData.slice(0, 6).map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
