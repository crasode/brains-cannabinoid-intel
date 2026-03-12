import { indicationScore, institutionScore, sponsorTierScore } from "./enrichment";
import { EnrichedTrial } from "./types";

function scorePhase(phase: string) {
  const p = phase.toLowerCase();
  if (p.includes("phase 3")) return 24;
  if (p.includes("phase 2")) return 19;
  if (p.includes("phase 1")) return 12;
  if (p.includes("early")) return 8;
  return 6;
}

function scoreSponsor(sponsors: string[]) {
  return sponsorTierScore(sponsors);
}

function scoreGeography(countries: string[]) {
  if (countries.length >= 5) return 10;
  if (countries.length >= 3) return 8;
  if (countries.length >= 2) return 6;
  return countries.length ? 4 : 2;
}

function scoreRecency(lastUpdated?: string) {
  if (!lastUpdated) return 3;
  const days = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  if (days <= 14) return 10;
  if (days <= 45) return 8;
  if (days <= 90) return 6;
  return 3;
}

export function scoreTrial(input: Omit<EnrichedTrial, "commercialScore" | "scoringBreakdown">): EnrichedTrial {
  const phase = scorePhase(input.phase);
  const sponsor = scoreSponsor(input.sponsors);
  const geography = scoreGeography(input.countries);
  const patents = Math.min(input.patentCount * 4, 15);
  const grants = Math.min(input.grantCount * 4, 12);
  const publications = Math.min(input.publicationCount * 2, 12);
  const recency = scoreRecency(input.lastUpdated);
  const institution = institutionScore(input.institutions);
  const indication = indicationScore(input.condition);

  const total = Math.min(100, phase + sponsor + geography + patents + grants + publications + recency + institution + indication);

  return {
    ...input,
    commercialScore: total,
    scoringBreakdown: { phase, sponsor, geography, patents, grants, publications, recency },
  };
}
