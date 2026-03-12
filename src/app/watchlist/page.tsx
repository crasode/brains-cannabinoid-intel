import Link from "next/link";
import { StudyCard } from "@/components/StudyCard";
import { getAllTrials } from "@/lib/live-data";
import { getWatchlistIds } from "@/lib/watchlist";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const [ids, trials] = await Promise.all([getWatchlistIds(), getAllTrials()]);
  const saved = trials.filter((t) => ids.includes(t.id));

  return (
    <main className="min-h-screen bg-[#f4efe7] px-6 py-12 text-[#1d2430] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
            <h1 className="mt-3 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035] md:text-5xl">Watchlist</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526174]">Saved studies for BD, asset review, and ongoing monitoring.</p>
          </div>
          <Link href="/explorer" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Back to explorer</Link>
        </div>

        <div className="mt-8 border border-black/5 bg-white p-6">
          <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Saved studies</div>
          <div className="mt-2 text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">{saved.length}</div>
        </div>

        <div className="mt-8 space-y-4">
          {saved.length ? saved.map((trial) => <StudyCard key={trial.id} trial={trial} />) : (
            <div className="border border-black/5 bg-white p-8 text-[#526174]">No studies saved yet. Add studies from the dashboard or explorer.</div>
          )}
        </div>
      </div>
    </main>
  );
}
