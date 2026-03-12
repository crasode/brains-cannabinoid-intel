import Link from "next/link";
import { getAllTrials } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export default async function SponsorPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const trials = (await getAllTrials()).filter((trial) => trial.sponsors.includes(decoded));

  return (
    <main className="min-h-screen bg-[#f4efe7] px-6 py-12 text-[#1d2430] md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Sponsor Intelligence</p>
        <h1 className="mt-3 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035] md:text-5xl">{decoded}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526174]">Sponsor-level view of indexed cannabinoid studies, commercial scoring, and associated institutions.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="border border-black/5 bg-white p-5"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Active studies</div><div className="mt-2 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trials.length}</div></div>
          <div className="border border-black/5 bg-white p-5"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Avg score</div><div className="mt-2 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trials.length ? Math.round(trials.reduce((a,b)=>a+b.commercialScore,0)/trials.length) : 0}</div></div>
          <div className="border border-black/5 bg-white p-5"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Patent signals</div><div className="mt-2 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trials.reduce((a,b)=>a+b.patentCount,0)}</div></div>
          <div className="border border-black/5 bg-white p-5"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Grant signals</div><div className="mt-2 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trials.reduce((a,b)=>a+b.grantCount,0)}</div></div>
        </div>
        <div className="mt-8 border border-black/5 bg-white p-6">
          <h2 className="text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">Associated studies</h2>
          <div className="mt-5 space-y-4">
            {trials.map((trial) => (
              <div key={trial.id} className="border border-black/5 bg-[#fcfaf7] p-4">
                <div className="font-semibold text-[#0d2035]">{trial.title}</div>
                <div className="mt-1 text-sm text-[#526174]">{trial.institutions[0] || 'Unknown institution'} · {trial.phase} · Score {trial.commercialScore}</div>
                <Link href={`/study/${trial.id}`} className="mt-2 inline-block text-sm font-medium text-[#0d2035] underline underline-offset-4">Open study</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
