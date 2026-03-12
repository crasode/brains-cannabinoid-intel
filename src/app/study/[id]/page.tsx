import Link from "next/link";
import { NoteBox } from "@/components/NoteBox";
import { TopNav } from "@/components/TopNav";
import { WatchMetaEditor } from "@/components/WatchMetaEditor";
import { summarizeWhyItMatters } from "@/lib/intel";
import { getAllTrials } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export default async function StudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trials = await getAllTrials();
  const trial = trials.find((item) => item.id === id);

  if (!trial) {
    return (
      <main className="min-h-screen bg-[#f4efe7] px-6 py-12 text-[#1d2430]">
        <div className="mx-auto max-w-4xl border border-black/5 bg-white p-8">
          <h1 className="text-4xl font-[family-name:var(--font-serif)] text-[#0d2035]">Study not found</h1>
          <p className="mt-4 text-[#526174]">The requested study is not currently in the indexed trial set.</p>
          <Link href="/explorer" className="mt-6 inline-block text-sm font-medium text-[#0d2035] underline underline-offset-4">Back to explorer</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] px-6 py-12 text-[#1d2430] md:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <TopNav />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8a96e]">Brains Clinical Intelligence</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-[family-name:var(--font-serif)] text-[#0d2035] md:text-5xl">{trial.title}</h1>
          </div>
          <Link href="/explorer" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Back to explorer</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="border border-black/5 bg-white p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Study ID</div><div className="mt-1 text-[#0d2035]">{trial.id}</div></div>
                <div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Status</div><div className="mt-1 text-[#0d2035]">{trial.status}</div></div>
                <div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Phase</div><div className="mt-1 text-[#0d2035]">{trial.phase}</div></div>
                <div><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Commercial score</div><div className="mt-1 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.commercialScore}</div></div>
              </div>
            </div>

            <div className="border border-black/5 bg-white p-6">
              <h2 className="text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">Commercial relevance breakdown</h2>
              <p className="mt-3 text-sm leading-7 text-[#526174]">This score blends stage, sponsor quality, institution quality, indication relevance, geography, patent activity, grant backing, publication signal, and recency. It is intended as a prioritization signal for BD and strategic review, not a regulatory or investment certainty measure.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {Object.entries(trial.scoringBreakdown).map(([key, value]) => (
                  <div key={key} className="border border-black/5 bg-[#fcfaf7] p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">{key}</div>
                    <div className="mt-2 text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/5 bg-white p-6">
              <h2 className="text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">Research context</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#526174]">
                <div><span className="font-medium text-[#0d2035]">Lead researchers:</span> {trial.leadResearchers.join(", ") || "Not listed"}</div>
                <div><span className="font-medium text-[#0d2035]">Institutions:</span> {trial.institutions.join(", ") || "Not listed"}</div>
                <div><span className="font-medium text-[#0d2035]">Sponsors:</span> {trial.sponsors.join(", ") || "Not listed"}</div>
                <div><span className="font-medium text-[#0d2035]">Conditions:</span> {trial.condition.join(", ") || "Not listed"}</div>
                <div><span className="font-medium text-[#0d2035]">Interventions:</span> {trial.interventions.join(", ") || "Not listed"}</div>
                <div><span className="font-medium text-[#0d2035]">Countries:</span> {trial.countries.join(", ") || "Not listed"}</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-black/5 bg-white p-6">
              <h2 className="text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">Signal summary</h2>
              <p className="mt-3 text-sm leading-7 text-[#526174]">{summarizeWhyItMatters(trial)}.</p>
              <div className="mt-5 grid gap-4">
                <div className="border border-black/5 bg-[#fcfaf7] p-4"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Patent activity</div><div className="mt-2 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.patentCount}</div></div>
                <div className="border border-black/5 bg-[#fcfaf7] p-4"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Grant activity</div><div className="mt-2 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.grantCount}</div></div>
                <div className="border border-black/5 bg-[#fcfaf7] p-4"><div className="text-xs uppercase tracking-[0.16em] text-[#7a8794]">Publication activity</div><div className="mt-2 text-3xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.publicationCount}</div></div>
              </div>
            </div>

            <WatchMetaEditor id={trial.id} />
            <NoteBox id={trial.id} />
            <div className="border border-black/5 bg-white p-6">
              <h2 className="text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">Timeline</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#526174]">
                <div><span className="font-medium text-[#0d2035]">First posted:</span> {trial.firstPosted || "Unknown"}</div>
                <div><span className="font-medium text-[#0d2035]">Last updated:</span> {trial.lastUpdated || "Unknown"}</div>
                <div><a href={trial.sourceUrl} target="_blank" className="font-medium text-[#0d2035] underline underline-offset-4">Open registry source</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
