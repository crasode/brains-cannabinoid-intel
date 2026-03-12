export function normalizeEntityName(name: string) {
  return name
    .replace(/\s+/g, " ")
    .replace(/,?\s+inc\.?$/i, "")
    .replace(/,?\s+ltd\.?$/i, "")
    .replace(/,?\s+llc\.?$/i, "")
    .replace(/,?\s+corp\.?$/i, "")
    .replace(/,?\s+corporation$/i, "")
    .replace(/,?\s+university$/i, " University")
    .trim();
}

export function dedupeNormalized(values: string[]) {
  const map = new Map<string, string>();
  for (const value of values) {
    if (!value) continue;
    const normalized = normalizeEntityName(value);
    if (!map.has(normalized.toLowerCase())) {
      map.set(normalized.toLowerCase(), normalized);
    }
  }
  return Array.from(map.values());
}
