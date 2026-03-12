import Link from "next/link";
import { getAllTrials } from "@/lib/live-data";

export const dynamic = "force-dynamic";

type Params = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    phase?: string;
    country?: string;
    minScore?: string;
    sort?: string;
  }>;
};

function includesAny(values: string[], q: string) {
  return values.some((v) => v.toLowerCase().includes(q));
}

export default async function ExplorerPage({ searchParams }: Params) {
  const params = await searchParams;
  const q = (params.q || "").trim().toLowerCase();
  const status = params.status || "";
  const phase = params.phase || "";
  const country = params.country || "";
  const minScore = Number(params.minScore || "0") || 0;
  const sort = params.sort || "score";

  let trials = await getAllTrials();

  if (q) {
    trials = trials.filter((trial) => {
      return (
        trial.title.toLowerCase().includes(q) ||
        includesAny(trial.condition, q) ||
        includesAny(trial.interventions, q) ||
        includesAny(trial.sponsors, q) ||
        includesAny(trial.institutions, q) ||
        includesAny(trial.leadResearchers, q)
      );
    });
  }

  if (status) trials = trials.filter((t) => t.status === status);
  if (phase) trials = trials.filter((t) => t.phase.includes(phase));
  if (country) trials = trials.filter((t) => t.countries.includes(country));
  trials = trials.filter((t) => t.commercialScore >= minScore);

  if (sort === "newest") {
    trials = [...trials].sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime());
  } else if (sort === "patents") {
    trials = [...trials].sort((a, b) => b.patentCount - a.patentCount);
  } else if (sort === "grants") {
    trials = [...trials].sort((a, b) => b.grantCount - a.grantCount);
  } else {
    trials = [...trials].sort((a, b) => b.commercialScore - a.commercialScore);
  }

  const statuses = Array.from(new Set((await getAllTrials()).map((t) => t.status))).sort();
  const countries = Array.from(new Set((await getAllTrials()).flatMap((t) => t.countries))).sort();

  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#1d2430] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
            <h1 className="mt-3 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035] md:text-6xl">All Trials Explorer</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526174]">Search all indexed cannabinoid-based active trials by keyword, condition, university, sponsor, researcher, country, and score.</p>
          </div>
          <Link href="/" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Back to dashboard</Link>
        </div>

        <form className="mt-8 grid gap-3 rounded-sm border border-black/5 bg-white p-4 md:grid-cols-6">
          <input name="q" defaultValue={params.q || ""} placeholder="Keyword, university, sponsor, PI…" className="border border-black/10 px-3 py-3 md:col-span-2" />
          <select name="status" defaultValue={status} className="border border-black/10 px-3 py-3">
            <option value="">All statuses</option>
            {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <input name="phase" defaultValue={phase} placeholder="Phase" className="border border-black/10 px-3 py-3" />
          <select name="country" defaultValue={country} className="border border-black/10 px-3 py-3">
            <option value="">All countries</option>
            {countries.slice(0, 80).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select name="sort" defaultValue={sort} className="border border-black/10 px-3 py-3">
            <option value="score">Sort: Highest score</option>
            <option value="newest">Sort: Newest</option>
            <option value="patents">Sort: Most patents</option>
            <option value="grants">Sort: Most grants</option>
          </select>
          <input name="minScore" defaultValue={params.minScore || "0"} placeholder="Min score" className="border border-black/10 px-3 py-3" />
          <button className="bg-[#0d2035] px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white md:col-span-1">Search</button>
        </form>

        <div className="mt-4 text-sm text-[#526174]">{trials.length} matching indexed trials</div>

        <div className="mt-6 overflow-x-auto border border-black/5 bg-white">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-[#7a8794]">
                <th className="px-4 py-4">Trial</th>
                <th className="px-4 py-4">Sponsor / Institution</th>
                <th className="px-4 py-4">Country</th>
                <th className="px-4 py-4">Phase</th>
                <th className="px-4 py-4">Patents</th>
                <th className="px-4 py-4">Grants</th>
                <th className="px-4 py-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {trials.map((trial) => (
                <tr key={trial.id} className="border-b border-black/5 align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-[#0d2035]">{trial.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.15em] text-[#7a8794]">{trial.id} · {trial.status}</div>
                    <div className="mt-2 text-[#526174]">{trial.condition.slice(0, 2).join(", ") || "No condition listed"}</div>
                    <a href={trial.sourceUrl} target="_blank" className="mt-2 inline-block text-xs font-medium text-[#0d2035] underline underline-offset-4">Source</a>
                  </td>
                  <td className="px-4 py-4 text-[#526174]">
                    <div>{trial.sponsors[0] || "Unknown sponsor"}</div>
                    <div className="mt-1 text-xs text-[#7a8794]">{trial.institutions[0] || trial.leadResearchers[0] || "No mapped institution"}</div>
                  </td>
                  <td className="px-4 py-4 text-[#526174]">{trial.countries[0] || "—"}</td>
                  <td className="px-4 py-4 text-[#526174]">{trial.phase}</td>
                  <td className="px-4 py-4 text-[#526174]">{trial.patentCount}</td>
                  <td className="px-4 py-4 text-[#526174]">{trial.grantCount}</td>
                  <td className="px-4 py-4"><span className="inline-flex min-w-[52px] justify-center bg-[#f4efe7] px-3 py-2 font-semibold text-[#0d2035]">{trial.commercialScore}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
