export async function getOpenAlexInstitutionWorks(name: string) {
  if (!name) return 0;
  try {
    const res = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(name + ' cannabinoid')}&per-page=10`, {
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!res.ok) return 0;
    const json = await res.json();
    return json?.results?.length ?? 0;
  } catch {
    return 0;
  }
}
