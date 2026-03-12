import Link from "next/link";
import { EnrichedTrial } from "@/lib/types";
import { WatchToggle } from "./WatchToggle";

export function StudyCard({ trial }: { trial: EnrichedTrial }) {
  return (
    <div className="border border-black/6 bg-[#fcfaf7] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.18em] text-[#7a8794]">{trial.id} · {trial.status} · {trial.phase}</div>
          <h3 className="mt-2 text-2xl font-[family-name:var(--font-serif)] text-[#0d2035]">{trial.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Lead:</span> {trial.leadResearchers[0] || "Not listed"}{trial.institutions[0] ? ` · ` : ""}{trial.institutions[0] ? <Link href={`/institution/${encodeURIComponent(trial.institutions[0])}`} className="underline underline-offset-4">{trial.institutions[0]}</Link> : null}</p>
          <p className="mt-1 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Sponsor:</span> {trial.sponsors[0] ? <Link href={`/sponsor/${encodeURIComponent(trial.sponsors[0])}`} className="underline underline-offset-4">{trial.sponsors[0]}</Link> : "Not listed"}</p>
          <p className="mt-1 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Countries:</span> {trial.countries.join(", ") || "Not listed"}</p>
          <p className="mt-1 text-sm leading-7 text-[#526174]"><span className="font-medium text-[#0d2035]">Why it matters:</span> {trial.scoringBreakdown.phase >= 19 ? 'Later-stage development signal' : 'Earlier-stage opportunity'} · {trial.patentCount > 0 ? 'patent activity present' : 'limited patent signal'} · {trial.grantCount > 0 ? 'grant backing detected' : 'limited grant backing'}.</p>
        </div>
        <div className="min-w-[130px] bg-[#f4efe7] px-4 py-3 text-center text-[#0d2035]">
          <div className="text-xs uppercase tracking-[0.18em]">Score</div>
          <div className="mt-1 text-4xl font-[family-name:var(--font-serif)]">{trial.commercialScore}</div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-[#526174] md:grid-cols-3">
        <div>Patents: <span className="font-semibold text-[#0d2035]">{trial.patentCount}</span></div>
        <div>Grants: <span className="font-semibold text-[#0d2035]">{trial.grantCount}</span></div>
        <div>Publications: <span className="font-semibold text-[#0d2035]">{trial.publicationCount}</span></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        <Link href={`/study/${trial.id}`} className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Study detail</Link>
        <a href={trial.sourceUrl} target="_blank" className="text-sm font-medium text-[#0d2035] underline underline-offset-4">Source</a>
        <WatchToggle id={trial.id} />
      </div>
    </div>
  );
}
