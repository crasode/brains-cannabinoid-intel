import { getDashboardData } from "@/lib/live-data";

export const dynamic = "force-dynamic";

function scoreTone(score: number) {
  if (score >= 75) return "text-emerald-700 bg-emerald-50";
  if (score >= 60) return "text-amber-700 bg-amber-50";
  return "text-slate-700 bg-slate-100";
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#1d2430]">
      <section className="border-b border-black/5 bg-[#0d2035] px-8 py-16 text-white md:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl leading-tight font-[family-name:var(--font-serif)] md:text-7xl">
              Live global cannabinoid trial intelligence.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Real active-trial monitoring across public registries with automated cross-reference scoring for patents,
              grants, publications, sponsors, institutions, and commercial relevance.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/45">
              Updated {new Date(data.generatedAt).toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-[family-name:var(--font-serif)]">{data.totalActiveTrials}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">Active trials tracked</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-[family-name:var(--font-serif)]">{data.newlyAddedCount}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">Newly posted (14d)</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-[family-name:var(--font-serif)]">Global</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">Jurisdiction scope</div>
            </div>
            <div className="border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-[family-name:var(--font-serif)]">100</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">Commercial score ceiling</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-12 md:px-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border border-black/5 bg-white p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Top scored studies</p>
                <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Highest-value active trials</h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {data.topTrials.map((trial) => (
                <div key={trial.id} className="border border-black/6 bg-[#fcfaf7] p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div className="text-xs uppercase tracking-[0.18em] text-[#7a8794]">
                        {trial.id} · {trial.status} · {trial.phase}
                      </div>
                      <h3 className="mt-2 text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#526174]">
                        <span className="font-medium text-[#0d2035]">Lead:</span> {trial.leadResearchers[0] || "Not listed"}
                        {trial.institutions[0] ? ` · ${trial.institutions[0]}` : ""}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[#526174]">
                        <span className="font-medium text-[#0d2035]">Sponsor:</span> {trial.sponsors.join(", ") || "Not listed"}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[#526174]">
                        <span className="font-medium text-[#0d2035]">Countries:</span> {trial.countries.join(", ") || "Not listed"}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[#526174]">
                        <span className="font-medium text-[#0d2035]">Interventions:</span> {(trial.interventions.slice(0, 3).join(", ") || "Not listed")}{trial.interventions.length > 3 ? "…" : ""}
                      </p>
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
                  <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.16em] text-[#7a8794] md:grid-cols-7">
                    <div>Phase {trial.scoringBreakdown.phase}</div>
                    <div>Sponsor {trial.scoringBreakdown.sponsor}</div>
                    <div>Geography {trial.scoringBreakdown.geography}</div>
                    <div>Patents {trial.scoringBreakdown.patents}</div>
                    <div>Grants {trial.scoringBreakdown.grants}</div>
                    <div>Pubs {trial.scoringBreakdown.publications}</div>
                    <div>Recency {trial.scoringBreakdown.recency}</div>
                  </div>
                  <a href={trial.sourceUrl} target="_blank" className="mt-4 inline-block text-sm font-medium text-[#0d2035] underline underline-offset-4">
                    Open source record
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Newly added</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Latest activity</h2>
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

            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Sponsor mapping</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Most active sponsors</h2>
              <div className="mt-6 space-y-3">
                {data.sponsorMap.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0">
                    <span className="max-w-[80%] text-[#526174]">{item.name}</span>
                    <span className="font-semibold text-[#0d2035]">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/5 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Institution mapping</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Top institutions</h2>
              <div className="mt-6 space-y-3">
                {data.institutionMap.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0">
                    <span className="max-w-[80%] text-[#526174]">{item.name}</span>
                    <span className="font-semibold text-[#0d2035]">{item.count}</span>
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
