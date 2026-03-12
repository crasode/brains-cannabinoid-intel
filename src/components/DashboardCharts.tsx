"use client";

export function DashboardCharts({ moleculeData, geographyData }: { moleculeData: { name: string; count: number }[]; geographyData: { name: string; count: number }[] }) {
  const moleculeTotal = moleculeData.reduce((sum, item) => sum + item.count, 0) || 1;
  const geographyTotal = geographyData.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-black/5 bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Molecule concentration</div>
            <div className="mt-2 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Where the molecule activity sits</div>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.16em] text-[#7a8794]">Share of indexed studies</div>
        </div>
        <div className="mt-6 space-y-4">
          {moleculeData.slice(0, 6).map((item) => {
            const pct = Math.round((item.count / moleculeTotal) * 100);
            return (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#0d2035]">{item.name}</span>
                  <span className="text-[#526174]">{item.count} studies · {pct}%</span>
                </div>
                <div className="mt-2 h-2.5 bg-[#ece5d9]">
                  <div className="h-2.5 bg-[#0d2035]" style={{ width: `${Math.max(pct, 4)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm leading-7 text-[#526174]">
          Concentration at the molecule level helps show where the active commercial and clinical attention is actually clustering.
        </p>
      </div>

      <div className="border border-black/5 bg-white p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Geographic concentration</div>
            <div className="mt-2 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Where trial activity is concentrated</div>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.16em] text-[#7a8794]">Share of indexed studies</div>
        </div>
        <div className="mt-6 space-y-4">
          {geographyData.slice(0, 6).map((item) => {
            const pct = Math.round((item.count / geographyTotal) * 100);
            return (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#0d2035]">{item.name}</span>
                  <span className="text-[#526174]">{item.count} studies · {pct}%</span>
                </div>
                <div className="mt-2 h-2.5 bg-[#ece5d9]">
                  <div className="h-2.5 bg-[#c8a96e]" style={{ width: `${Math.max(pct, 4)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm leading-7 text-[#526174]">
          Geographic concentration highlights where regulatory activity, investigator density, and commercially relevant programs are strongest.
        </p>
      </div>
    </div>
  );
}
