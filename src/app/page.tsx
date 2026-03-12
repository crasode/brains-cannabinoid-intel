import { DashboardCharts } from "@/components/DashboardCharts";
import { HeroMotion } from "@/components/HeroMotion";
import { Reveal } from "@/components/Reveal";
import { StudyCard } from "@/components/StudyCard";
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
        <HeroMotion />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal>
              <div>
                <h1 className="max-w-5xl text-5xl leading-[1.02] font-[family-name:var(--font-serif)] md:text-7xl">
                  Intelligence infrastructure for cannabinoid clinical strategy.
                </h1>
                <p className="mt-8 max-w-3xl text-base leading-8 text-white/72 md:text-lg">
                  A live strategic platform that tracks the cannabinoid development landscape, identifies the institutions and investigators driving it,
                  and ranks the studies most likely to matter commercially.
                </p>
                <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.22em] text-[#c8a96e]">
                  Built to surface high-value opportunities before the rest of the market sees them clearly.
                </p>
                <form action="/explorer" className="mt-8 grid gap-3 md:max-w-3xl md:grid-cols-[1.5fr_1fr_1fr_auto]">
                  <input name="q" placeholder="Search by study, university, sponsor, PI, condition, or molecule" className="border border-white/10 bg-white/8 px-4 py-4 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm md:col-span-2" />
                  <input name="minScore" placeholder="Min score" className="border border-white/10 bg-white/8 px-4 py-4 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur-sm" />
                  <button className="bg-[#c8a96e] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#081723]">Search</button>
                </form>
                <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                  <span className="border border-white/10 bg-white/5 px-3 py-2">Active trial intelligence</span>
                  <span className="border border-white/10 bg-white/5 px-3 py-2">Institutional mapping</span>
                  <span className="border border-white/10 bg-white/5 px-3 py-2">Patent and grant signals</span>
                  <span className="border border-white/10 bg-white/5 px-3 py-2">Commercial scoring</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {metric("Total active trials", data.totalActiveTrials)}
                  {metric("Recruiting studies", data.recruitingTrials)}
                  {metric("Schools / institutions", data.totalInstitutions)}
                  {metric("Countries active", data.totalCountries)}
                </div>
                <div className="border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.22em] text-[#c8a96e]">What the platform delivers</div>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-white/75">
                    <div>01 — Live view of the global cannabinoid study universe</div>
                    <div>02 — Cross-reference of schools, sponsors, researchers, patents, and grants</div>
                    <div>03 — Commercial scoring of the studies most relevant to Brains</div>
                    <div>04 — Faster BD, stronger asset identification, sharper development strategy</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-b border-black/5 bg-[#0d2035] px-8 py-20 text-white md:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal><div className="border border-white/10 bg-white/5 p-6"><div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Signal Layer</div><h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">See the market structure.</h2><p className="mt-4 text-sm leading-8 text-white/72">Understand exactly where activity is clustering by molecule, school, sponsor, geography, and therapeutic focus.</p></div></Reveal>
            <Reveal><div className="border border-white/10 bg-white/5 p-6"><div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Research Layer</div><h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">Know who matters.</h2><p className="mt-4 text-sm leading-8 text-white/72">Connect studies to the investigators, institutions, publications, patents, and grants behind them.</p></div></Reveal>
            <Reveal><div className="border border-white/10 bg-white/5 p-6"><div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e]">Decision Layer</div><h2 className="mt-4 text-3xl font-[family-name:var(--font-serif)]">Prioritize what can win.</h2><p className="mt-4 text-sm leading-8 text-white/72">Rank the opportunities with the strongest commercial relevance and strategic fit instead of treating every study equally.</p></div></Reveal>
          </div>
        </div>
      </section>

      <section className="px-8 py-10 md:px-14">
        <div className="grid gap-6 lg:grid-cols-4">
          <Reveal><div className="border border-black/5 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Pipeline motion</p><div className="mt-3 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{data.newlyAddedCount}</div><p className="mt-2 text-sm leading-7 text-[#526174]">New studies posted in the last 14 days.</p></div></Reveal>
          <Reveal className="lg:col-span-3"><div className="border border-black/5 bg-white p-6 lg:col-span-3"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Landscape snapshot</p><div className="mt-4 grid gap-4 md:grid-cols-3"><div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top molecule clusters</div><div className="mt-3 space-y-2 text-sm text-[#526174]">{data.moleculeMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}</div></div><div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top indications</div><div className="mt-3 space-y-2 text-sm text-[#526174]">{data.conditionMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}</div></div><div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Top countries</div><div className="mt-3 space-y-2 text-sm text-[#526174]">{data.geographyMap.slice(0, 5).map((item) => <div key={item.name} className="flex justify-between"><span>{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>)}</div></div></div></div></Reveal>
        </div>
        <Reveal className="mt-6"><DashboardCharts moleculeData={data.moleculeMap} geographyData={data.geographyMap} /></Reveal>
      </section>

      <section className="px-8 pb-10 md:px-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal><div className="border border-black/5 bg-white p-6 md:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Highest-value opportunities</p><h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Top scored studies</h2></div><a href="/explorer" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Open explorer</a></div><div className="mt-8 space-y-4">{data.topTrials.map((trial) => (<StudyCard key={trial.id} trial={trial} />))}</div></div></Reveal>

          <div className="grid gap-6">
            <Reveal><div className="border border-black/5 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Top schools</p><h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Most active institutions</h2><div className="mt-6 space-y-3">{data.institutionMap.slice(0, 8).map((item) => (<div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0"><span className="max-w-[80%] text-[#526174]">{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>))}</div></div></Reveal>
            <Reveal><div className="border border-black/5 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Top sponsors</p><h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Leading sponsor activity</h2><div className="mt-6 space-y-3">{data.sponsorMap.slice(0, 8).map((item) => (<div key={item.name} className="flex items-center justify-between border-b border-black/6 pb-3 text-sm last:border-b-0"><span className="max-w-[80%] text-[#526174]">{item.name}</span><span className="font-semibold text-[#0d2035]">{item.count}</span></div>))}</div></div></Reveal>
            <Reveal><div className="border border-black/5 bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Latest movement</p><h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Recently updated studies</h2><div className="mt-6 space-y-4">{data.latestTrials.slice(0, 5).map((trial) => (<div key={trial.id} className="border-b border-black/6 pb-4 last:border-b-0 last:pb-0"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">{trial.lastUpdated || "Unknown update"}</div><div className="mt-1 font-medium text-[#0d2035]">{trial.title}</div><div className="mt-1 text-sm leading-6 text-[#526174]">{trial.sponsors[0] || "Unknown sponsor"}</div></div>))}</div></div></Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
