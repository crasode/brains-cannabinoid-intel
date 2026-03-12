import { dashboardStats, sampleTrials, sourceCatalog, trackedScope } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#1d2430]">
      <section className="border-b border-black/5 bg-[#0d2035] px-8 py-16 text-white md:px-14">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Intelligence Platform</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl leading-tight font-[family-name:var(--font-serif)] md:text-7xl">
              Global cannabinoid API trial intelligence, cross-referenced daily.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Internal Brains dashboard for tracking active cannabinoid trials, NCEs containing cannabinoids,
              investigator history, patents, grants, sponsors, and new trial movement across free global data sources.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-[family-name:var(--font-serif)]">{stat.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 py-12 md:px-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-black/5 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Scope</p>
            <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Tracked cannabinoid classes</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {trackedScope.map((item) => (
                <span key={item} className="border border-[#0d2035]/10 bg-[#f4efe7] px-3 py-2 text-sm text-[#405063]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-black/5 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Data sources</p>
            <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Free-source cross-reference stack</h2>
            <ul className="mt-6 grid gap-3 text-sm leading-7 text-[#526174] md:grid-cols-2">
              {sourceCatalog.map((source) => (
                <li key={source}>• {source}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-8 pb-10 md:px-14">
        <div className="border border-black/5 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Trial monitor</p>
              <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">Daily watchlist — sample view</h2>
            </div>
            <div className="text-sm text-[#526174]">MVP scaffold with canonical data model and placeholder sync targets</div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-[#7a8794]">
                  <th className="pb-4 pr-4">Trial</th>
                  <th className="pb-4 pr-4">Molecules</th>
                  <th className="pb-4 pr-4">Phase</th>
                  <th className="pb-4 pr-4">Lead researcher</th>
                  <th className="pb-4 pr-4">Patents / Grants</th>
                  <th className="pb-4">Updated</th>
                </tr>
              </thead>
              <tbody>
                {sampleTrials.map((trial) => (
                  <tr key={trial.id} className="border-b border-black/5 align-top">
                    <td className="py-5 pr-4">
                      <div className="font-semibold text-[#0d2035]">{trial.title}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.15em] text-[#7a8794]">
                        {trial.registry} · {trial.status} · {trial.sponsor}
                      </div>
                      <div className="mt-2 text-[#526174]">{trial.indication}</div>
                    </td>
                    <td className="py-5 pr-4 text-[#526174]">{trial.molecules.join(", ")}</td>
                    <td className="py-5 pr-4 text-[#526174]">{trial.phase}</td>
                    <td className="py-5 pr-4">
                      <div className="font-medium text-[#0d2035]">{trial.leadResearcher.name}</div>
                      <div className="text-[#526174]">{trial.leadResearcher.institution}</div>
                      <div className="mt-2 text-xs leading-6 text-[#7a8794]">
                        {trial.leadResearcher.previousWork[0]}
                      </div>
                    </td>
                    <td className="py-5 pr-4 text-[#526174]">
                      <div>{trial.leadResearcher.patents[0]}</div>
                      <div className="mt-2 text-xs text-[#7a8794]">{trial.leadResearcher.grants.join(" · ")}</div>
                    </td>
                    <td className="py-5 text-[#526174]">{trial.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-8 pb-16 md:px-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border border-black/5 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Build plan</p>
            <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">What this repo already sets up</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#526174]">
              <li>• Brains-branded protected dashboard shell</li>
              <li>• Canonical schema for trials, researchers, patents, grants, and source links</li>
              <li>• Global cannabinoid scope including analogs, prodrugs, synthetic cannabinoids, and NCEs</li>
              <li>• Daily-sync-ready structure for free data-source ingestion</li>
              <li>• Private Git-backed starting point for productionizing the platform</li>
            </ul>
          </div>
          <div className="border border-black/5 bg-[#0d2035] p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a96e]">Next milestone</p>
            <h2 className="mt-3 text-3xl font-[family-name:var(--font-serif)] text-white">Cross-reference engine first.</h2>
            <p className="mt-6 text-sm leading-8 text-white/72">
              Priority is entity resolution: matching trial investigators to publications, patents, grants,
              institutions, and sponsors with confidence scoring. That is the part that creates strategic value.
            </p>
            <div className="mt-8 border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/78">
              Password gate is set to <span className="font-semibold text-[#c8a96e]">BSPG</span> for now.
              Repo should remain private. Replace APP_PASSWORD in environment config before any external deployment.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
