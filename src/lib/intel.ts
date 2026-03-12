import { EnrichedTrial } from "./types";

export function summarizeWhyItMatters(trial: EnrichedTrial) {
  const points: string[] = [];

  if (trial.scoringBreakdown.phase >= 19) points.push("later-stage development signal");
  else if (trial.scoringBreakdown.phase >= 12) points.push("mid-stage development signal");
  else points.push("early-stage optionality");

  if (trial.patentCount > 0) points.push("patent activity present");
  if (trial.grantCount > 0) points.push("grant-backed research");
  if (trial.publicationCount > 1) points.push("publication trail detected");
  if (trial.countries.length >= 2) points.push("multi-jurisdiction footprint");
  if (trial.sponsors.length >= 2) points.push("multiple sponsor/collaborator links");

  return points.length ? points.join(" · ") : "indexed activity with limited external signal";
}

export function summarizeEntity(trials: EnrichedTrial[], type: "institution" | "sponsor", name: string) {
  const active = trials.length;
  const avgScore = active ? Math.round(trials.reduce((a, b) => a + b.commercialScore, 0) / active) : 0;
  const patentSignals = trials.reduce((a, b) => a + b.patentCount, 0);
  const grantSignals = trials.reduce((a, b) => a + b.grantCount, 0);
  const topConditions = Object.entries(trials.flatMap((t) => t.condition).reduce<Record<string, number>>((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label]) => label);
  const topMolecules = Object.entries(trials.flatMap((t) => t.interventions).reduce<Record<string, number>>((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([label]) => label);

  const summary = `${name} is currently linked to ${active} indexed cannabinoid study${active === 1 ? "" : "ies"}, with an average commercial score of ${avgScore}. Strongest signals: ${patentSignals} patent matches, ${grantSignals} grant matches, and concentration around ${topConditions.join(", ") || "current indexed indications"}.`;

  return { active, avgScore, patentSignals, grantSignals, topConditions, topMolecules, summary };
}
