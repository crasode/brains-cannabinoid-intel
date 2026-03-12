export function sponsorTierScore(sponsors: string[]) {
  const joined = sponsors.join(" ").toLowerCase();
  const topTier = ["teva", "pfizer", "novartis", "jazz", "astrazeneca", "johnson", "abbvie", "glaxo"];
  if (topTier.some((name) => joined.includes(name))) return 18;
  if (joined.includes("university") || joined.includes("institute") || joined.includes("hospital")) return 10;
  if (sponsors.length >= 2) return 12;
  if (sponsors.length === 1) return 8;
  return 4;
}

export function indicationScore(conditions: string[]) {
  const joined = conditions.join(" ").toLowerCase();
  if (/(epilepsy|pain|oncology|cancer|opioid|addiction|neurology|sleep|insomnia|glaucoma|inflammation)/.test(joined)) return 14;
  if (conditions.length >= 2) return 10;
  return 6;
}

export function institutionScore(institutions: string[]) {
  const joined = institutions.join(" ").toLowerCase();
  if (/(harvard|stanford|oxford|cambridge|ubc|toronto|ucl|imperial|johns hopkins|mayo)/.test(joined)) return 12;
  if (institutions.length >= 2) return 9;
  if (institutions.length === 1) return 6;
  return 3;
}
