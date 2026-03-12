import { getDashboardData } from "@/lib/live-data";

export const dynamic = "force-dynamic";

function scoreTone(score: number) {
  if (score >= 75) return "text-emerald-700 bg-emerald-50";
  if (score >= 60) return "text-amber-700 bg-amber-50";
  return "text-slate-700 bg-slate-100";
}

function metric(label: string, value: string | number) {
  return (
    <div className="border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="text-3xl font-[family-name:var(--font-serif)]">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">{label}</div>
    </div>
  );
}

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#1d2430]">
      <section className="relative overflow-hidden bg-[#071723] px-8 py-24 text-white md:px-14 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,169,110,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(94,129,172,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="max-w-5xl text-5xl leading-[1.02] font-[family-name:var(--font-serif)] md:text-7xl">
                The cannabinoid landscape, mapped like an intelligence system — not a spreadsheet.
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                Brains Clinical Intelligence surfaces the active cannabinoid trial universe, identifies who matters,
                scores what is commercially relevant, and turns a fragmented landscape into an actionable BD and pharma-development view.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                <span className="border border-white/10 bg-white/5 px-3 py-2">Active trials</span>
                <span className="border border-white/10 bg-white/5 px-3 py-2">Lead researchers</span>
                <span className="border border-white/10 bg-white/5 px-3 py-2">Patents</span>
                <span className="border border-white/10 bg-white/5 px-3 py-2">Grants</span>
                <span className="border border-white/10 bg-white/5 px-3 py-2">Sponsor mapping</span>
                <span className="border border-white/10 bg-white/5 px-3 py-2">Commercial scoring</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {metric("Total active trials", data.totalActiveTrials)}
                {metric("Recruiting studies", data.recruitingTrials)}
                {metric("Schools / institutions", data.totalInstitutions)}
                {metric("Countries active", data.totalCountries)}
              </div>
              <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.22em] text-[#c8a96e]">What the platform does</div>
                <div className="mt-4 grid gap-3 text-sm leading-7 text-white/75">
                  <div>01 — Ingests active cannabinoid studies across the live landscape</div>
                  <div>02 — Cross-references sponsors, schools, researchers, patents, and grants</div>
                  <div>03 — Scores what is strategically valuable and commercially credible</div>
                  <div>04 — Gives Brains a faster way to identify good assets earlier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-black/5 bg-[#0d2035] px-8 py-20 text-white md:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Signal Layer</div>
              <h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">See the market structure.</h2>
              <p className="mt-4 text-sm leading-8 text-white/72">
                Instantly understand where the real activity is clustering — by molecule, institution, sponsor, geography, and therapeutic focus.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Research Layer</div>
              <h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">Know who is worth paying attention to.</h2>
              <p className="mt-4 text-sm leading-8 text-white/72">
                Connect trials to investigators, institutions, publications, patent activity, and funding signals to separate noise from serious work.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Decision Layer</div>
              <h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">Rank what matters commercially.</h2>
              <p className="mt-4 text-sm leading-8 text-white/72">
                Use the scoring engine to prioritize the studies, people, and programs most relevant to BD, asset identification, and pharma strategy.
              </p>
            </div>
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Highest-value opportunities</p>
                <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Top scored studies</h2>
              </div>
              <a href="/explorer" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Open explorer</a>
            </div>
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
