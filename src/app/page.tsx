import { getDashboardData } from "@/lib/live-data";

export const dynamic = "force-dynamic";

function scoreTone(score: number) {
  if (score >= 75) return "text-emerald-700 bg-emerald-50";
  if (score >= 60) return "text-amber-700 bg-amber-50";
  return "text-slate-700 bg-slate-100";
}

function metric(label: string, value: string | number) {
  return (
    <div className="border border-white/10 bg-white/5 p-5">
      <div className="text-3xl font-[family-name:var(--font-serif)]">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">{label}</div>
    </div>
  );
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#1d2430]">
      <section className="border-b border-black/5 bg-[#0d2035] px-8 py-16 text-white md:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl leading-tight font-[family-name:var(--font-serif)] md:text-7xl">
              Cannabinoid trial landscape, ranked for commercial relevance.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Executive snapshot of the global cannabinoid development landscape: active studies, leading schools,
              top sponsors, molecule clusters, geographic spread, and highest-value opportunities.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/45">
              Updated {new Date(data.generatedAt).toLocaleString()}
            </p>
            <div className="mt-6">
              <a href="/explorer" className="inline-flex bg-[#c8a96e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#081723]">
                Open All Trials Explorer
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {metric("Total active trials", data.totalActiveTrials)}
            {metric("Recruiting studies", data.recruitingTrials)}
            {metric("Schools / institutions", data.totalInstitutions)}
            {metric("Countries active", data.totalCountries)}
          </div>
        </div>
      </section>

      <section className="px-8 py-10 md:px-14">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="border border-black/5 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Pipeline motion</p>
            <div className="mt-3 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{data.newlyAddedCount}</div>
            <p className="mt-2 text-sm leading-7 text-[#526174]">New studies posted in the last 14 days.</p>
          </div>
          <div className="border border-black/5 bg-white p-6 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Landscape snapshot</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top molecule clusters</div>
                <div className="mt-3 space-y-2 text-sm text-[#526174]">
                  {data.moleculeMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top indications</div>
                <div className="mt-3 space-y-2 text-sm text-[#526174]">
                  {data.conditionMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top countries</div>
                <div className="mt-3 space-y-2 text-sm text-[#526174]">
                  {data.geographyMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 pb-10 md:px-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-black/5 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Highest-value opportunities</p>
            <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Top scored studies</h2>
            <div className="mt-8 space-y-4">
              {data.topTrials.map((trial) => (
                <div key={trial.id} className="border border-black/6 bg-[#fcfaf7] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#7a8794]">{trial.id} · {trial.status} · {trial.phase}</div>
                      <h3 className="mt-2 text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Lead:</span> {trial.leadResearchers[0] || "Not listed"}{trial.institutions[0] ? ` · ${trial.institutions[0]}` : ""}</p>
                      <p className="mt-1 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Sponsor:</span> {trial.sponsors.join(", ") || "Not listed"}</p>
                      <p className="mt-1 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Countries:</span> {trial.countries.join(", ") || "Not listed"}</p>
                    </div>
                    <div className={`min-w-[130px] px-4 py-3 text-center ${scoreTone(trial.commercialScore)}`}>
                      <div className="text-xs uppercase tracking-[0.18em]">Score</div>
                      <div className="mt-1 text-4xl font-[family-name:var(--font-serif)]">{trial.commercialScore}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-[#526174] md:grid-cols-3">
                    <div>Patents: <span className="font-semibold text-[#0d2035]">{trial.patentCount}</span></div>
                    <div>Grants: <span className="font-semibold text-[#0d2035]">{trial.grantCount}</span></div>
                    <div>Publications: <span className="font-semibold text-[#0d2035]">{trial.publicationCount}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Top schools</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Most active institutions</h2>
              <div className="mt-6 space-y-3">
                {data.institutionMap.slice(0, 8).map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0">
                    <span className="max-w-[80%] text-[#526174]">{item.name}</span>
                    <span className="font-semibold text-[#0d2035]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Top sponsors</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Leading sponsor activity</h2>
              <div className="mt-6 space-y-3">
                {data.sponsorMap.slice(0, 8).map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0">
                    <span className="max-w-[80%] text-[#526174]">{item.name}</span>
                    <span className="font-semibold text-[#0d2035]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Latest movement</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Recently updated studies</h2>
              <div className="mt-6 space-y-4">
                {data.latestTrials.slice(0, 5).map((trial) => (
                  <div key={trial.id} className="border-b border-black/6 pb-4 last:border-b-0 last:pb-0">
                    <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">{trial.lastUpdated || "Unknown update"}</div>
                    <div className="mt-1 font-medium text-[#0d2035]">{trial.title}</div>
                    <div className="mt-1 text-sm leading-6 text-[#526174]">{trial.sponsors[0] || "Unknown sponsor"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
