import { getOpenAlexInstitutionWorks } from "./openalex";
import { dedupeNormalized } from "./normalize";
import { scoreTrial } from "./scoring";
import { DashboardPayload, EnrichedTrial } from "./types";

type CtGovStudy = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string; officialTitle?: string; orgStudyIdInfo?: { id?: string } };
    statusModule?: { overallStatus?: string; studyFirstPostDateStruct?: { date?: string }; lastUpdatePostDateStruct?: { date?: string } };
    designModule?: { phases?: string[]; studyType?: string };
    conditionsModule?: { conditions?: string[] };
    armsInterventionsModule?: { interventions?: { name?: string; type?: string }[] };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string }; collaborators?: { name?: string }[] };
    contactsLocationsModule?: {
      overallOfficials?: { name?: string; affiliation?: string; role?: string }[];
      centralContacts?: { name?: string; email?: string }[];
      locations?: { facility?: string; country?: string }[];
    };
  };
};

export const dynamic = "force-dynamic";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, next: { revalidate: 60 * 60 * 6 } });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${url}`);
  return response.json();
}

const QUERY_PLANS: Array<{ field: "term" | "cond" | "intr"; term: string }> = [
  { field: "term", term: "cannabinoid" },
  { field: "term", term: "cannabidiol" },
  { field: "term", term: "tetrahydrocannabinol" },
  { field: "term", term: "dronabinol" },
  { field: "term", term: "nabiximols" },
  { field: "term", term: "nabilone" },
  { field: "term", term: "cannabigerol" },
  { field: "term", term: "cannabinol" },
  { field: "term", term: "synthetic cannabinoid" },
  { field: "cond", term: "cannabinoid" },
  { field: "cond", term: "cannabidiol" },
  { field: "cond", term: "tetrahydrocannabinol" },
  { field: "intr", term: "cannabinoid" },
  { field: "intr", term: "cannabidiol" },
  { field: "intr", term: "tetrahydrocannabinol" },
  { field: "intr", term: "dronabinol" },
  { field: "intr", term: "nabiximols" },
];

function cleanText(value?: string) {
  if (!value) return "";
  return value
    .replace(/<mark[^>]*>/gi, "")
    .replace(/<\/mark>/gi, "")
    .replace(/&rarr;/g, "→")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function summarizeTitle(title: string) {
  const cleaned = cleanText(title);
  const compact = cleaned
    .replace(/^PK\/PD of /i, "PK/PD: ")
    .replace(/^Comparing /i, "Comparison: ")
    .replace(/^Improvement of Quality of Life by /i, "Quality of Life: ")
    .replace(/ in Older Adults$/i, " — Older Adults")
    .replace(/ in the Emergency Department$/i, " — Emergency Department");

  if (compact.length <= 110) return compact;
  const parts = compact.split(": ");
  if (parts.length > 1) return `${parts[0]}: ${parts[1].slice(0, 72).trim()}…`;
  return `${compact.slice(0, 96).trim()}…`;
}

async function fetchClinicalTrialsStudies(): Promise<CtGovStudy[]> {
  const map = new Map<string, CtGovStudy>();

  for (const query of QUERY_PLANS) {
    let from = 0;
    while (from < 300) {
      const url = `https://clinicaltrials.gov/api/int/studies?aggFilters=status:rec%20act%20not&from=${from}&limit=100&fields=OverallStatus%2CBriefTitle%2CCondition%2CInterventionName%2CLocationCountry%2CCentralContactName%2CCentralContactEMail%2CNCTId%2CStudyType%2CLeadSponsorName%2CPhase%2CStudyFirstPostDate%2CLastUpdatePostDate%2COverallOfficialName%2COverallOfficialAffiliation&columns=conditions%2Cinterventions%2Ccollaborators&highlight=true&sort=%40relevance&query.${query.field}=${encodeURIComponent(query.term)}`;
      const response = await fetchJson<any>(url);
      const hits = response?.hits || [];
      if (!hits.length) break;

      for (const hit of hits) {
        const study = hit?.study as CtGovStudy | undefined;
        const nctId = study?.protocolSection?.identificationModule?.nctId;
        if (!study || !nctId) continue;
        const type = study?.protocolSection?.designModule?.studyType || "";
        if (type && type !== "INTERVENTIONAL") continue;
        map.set(nctId, study);
      }

      if (hits.length < 100) break;
      from += hits.length;
    }
  }

  return Array.from(map.values());
}

async function getPatentCount(name: string): Promise<number> {
  if (!name) return 0;
  try {
    const body = { q: { _text_any: { patent_title: name } }, f: ["patent_id"], o: { size: 5 } };
    const response = await fetch("https://api.patentsview.org/patents/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!response.ok) return 0;
    const json = await response.json();
    return Array.isArray(json?.patents) ? json.patents.length : 0;
  } catch {
    return 0;
  }
}

async function getGrantCount(name: string): Promise<number> {
  if (!name) return 0;
  try {
    const response = await fetch("https://api.reporter.nih.gov/v2/projects/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ criteria: { pi_names: [name] }, include_fields: ["ProjectTitle"], limit: 5 }),
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!response.ok) return 0;
    const json = await response.json();
    return json?.meta?.total ?? json?.results?.length ?? 0;
  } catch {
    return 0;
  }
}

async function getPublicationCount(name: string): Promise<number> {
  if (!name) return 0;
  try {
    const url = `https://api.openalex.org/works?search=${encodeURIComponent(name + " cannabinoid")}&per-page=5`;
    const json = await fetchJson<any>(url);
    return json?.meta?.count ? Math.min(json.meta.count, 5) : (json?.results?.length ?? 0);
  } catch {
    return 0;
  }
}

function normalizeStudy(study: CtGovStudy) {
  const protocol = study.protocolSection || {};
  const id = protocol.identificationModule?.nctId || protocol.identificationModule?.orgStudyIdInfo?.id || crypto.randomUUID();
  const rawTitle = protocol.identificationModule?.briefTitle || protocol.identificationModule?.officialTitle || "Untitled study";
  const title = summarizeTitle(rawTitle);
  const status = protocol.statusModule?.overallStatus || "Unknown";
  const phase = protocol.designModule?.phases?.join(", ") || "Not specified";
  const condition = (protocol.conditionsModule?.conditions || []).map(cleanText).filter(Boolean);
  const interventions = (protocol.armsInterventionsModule?.interventions || []).map((item) => cleanText(item.name)).filter(Boolean) as string[];
  const sponsors = dedupeNormalized([protocol.sponsorCollaboratorsModule?.leadSponsor?.name, ...(protocol.sponsorCollaboratorsModule?.collaborators || []).map((x) => x.name)].map(cleanText).filter(Boolean) as string[]);
  const overallOfficials = protocol.contactsLocationsModule?.overallOfficials || [];
  const centralContacts = protocol.contactsLocationsModule?.centralContacts || [];
  const leadResearchers = dedupeNormalized([
    ...overallOfficials.map((x) => cleanText(x.name)),
    ...centralContacts.map((x) => cleanText(x.name)),
  ].filter(Boolean) as string[]);
  const institutions = dedupeNormalized(overallOfficials.map((x) => cleanText(x.affiliation)).filter(Boolean) as string[]);
  const countries = dedupeNormalized((protocol.contactsLocationsModule?.locations || []).map((x) => cleanText(x.country)).filter(Boolean) as string[]);
  const firstPosted = protocol.statusModule?.studyFirstPostDateStruct?.date;
  const lastUpdated = protocol.statusModule?.lastUpdatePostDateStruct?.date;
  return { id, title, status, phase, condition, interventions, sponsors, institutions, countries, leadResearchers, firstPosted, lastUpdated };
}

export async function getAllTrials(): Promise<EnrichedTrial[]> {
  const studies = await fetchClinicalTrialsStudies();
  const enriched = await Promise.all(
    studies.map(async (study) => {
      const normalized = normalizeStudy(study);
      const researcher = normalized.leadResearchers[0] || normalized.sponsors[0] || normalized.title;
      const sponsorQuery = normalized.sponsors[0] || normalized.title;
      const institutionQuery = normalized.institutions[0] || researcher;
      const [patentCount, grantCount, publicationCount, institutionWorks] = await Promise.all([
        getPatentCount(sponsorQuery),
        getGrantCount(researcher),
        getPublicationCount(institutionQuery),
        getOpenAlexInstitutionWorks(institutionQuery),
      ]);
      return scoreTrial({
        id: normalized.id,
        title: normalized.title,
        status: normalized.status,
        phase: normalized.phase,
        condition: normalized.condition,
        interventions: normalized.interventions,
        sponsors: normalized.sponsors,
        institutions: normalized.institutions,
        countries: normalized.countries,
        leadResearchers: normalized.leadResearchers,
        firstPosted: normalized.firstPosted,
        lastUpdated: normalized.lastUpdated,
        sourceUrl: `https://clinicaltrials.gov/study/${normalized.id}`,
        patentCount,
        grantCount,
        publicationCount: publicationCount + institutionWorks,
      });
    }),
  );
  return enriched.sort((a, b) => b.commercialScore - a.commercialScore);
}

function topCounts(values: string[]) {
  return Object.entries(
    values.reduce<Record<string, number>>((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {}),
  )
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function detectMolecules(trial: EnrichedTrial) {
  const haystack = [trial.title, ...trial.interventions, ...trial.condition].join(" ").toLowerCase();
  const hits = [] as string[];
  if (haystack.includes("cannabidiol") || haystack.includes(" cbd")) hits.push("CBD");
  if (haystack.includes("tetrahydrocannabinol") || haystack.includes(" thc") || haystack.includes("dronabinol")) hits.push("THC / Dronabinol");
  if (haystack.includes("nabiximols")) hits.push("Nabiximols");
  if (haystack.includes("nabilone")) hits.push("Nabilone");
  if (haystack.includes("cannabigerol") || haystack.includes(" cbg")) hits.push("CBG");
  if (haystack.includes("cannabinol") || haystack.includes(" cbn")) hits.push("CBN");
  if (haystack.includes("synthetic cannabinoid")) hits.push("Synthetic cannabinoids");
  return hits.length ? hits : ["Other cannabinoid"];
}

export async function getDashboardData(): Promise<DashboardPayload> {
  const enriched = await getAllTrials();
  const byScore = [...enriched].sort((a, b) => b.commercialScore - a.commercialScore);
  const byUpdate = [...enriched].sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime());

  const sponsorMap = topCounts(enriched.flatMap((trial) => trial.sponsors)).slice(0, 10);
  const institutionMap = topCounts(enriched.flatMap((trial) => trial.institutions)).slice(0, 10);
  const moleculeMap = topCounts(enriched.flatMap((trial) => detectMolecules(trial))).slice(0, 10);
  const conditionMap = topCounts(enriched.flatMap((trial) => trial.condition)).slice(0, 10);
  const geographyMap = topCounts(enriched.flatMap((trial) => trial.countries)).slice(0, 10);

  const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
  const newlyAddedCount = enriched.filter((t) => t.firstPosted && new Date(t.firstPosted).getTime() >= twoWeeksAgo).length;
  const recruitingTrials = enriched.filter((t) => t.status === "RECRUITING").length;
  const totalInstitutions = new Set(enriched.flatMap((t) => t.institutions).filter(Boolean)).size;
  const totalCountries = new Set(enriched.flatMap((t) => t.countries).filter(Boolean)).size;

  return {
    generatedAt: new Date().toISOString(),
    totalActiveTrials: enriched.length,
    recruitingTrials,
    totalInstitutions,
    totalCountries,
    newlyAddedCount,
    changesSummary: {
      newlyAdded: newlyAddedCount,
      recentlyUpdated: byUpdate.filter((t) => t.lastUpdated && new Date(t.lastUpdated).getTime() >= twoWeeksAgo).length,
      highScoreCount: enriched.filter((t) => t.commercialScore >= 70).length,
    },
    topTrials: byScore.slice(0, 8),
    latestTrials: byUpdate.slice(0, 8),
    sponsorMap,
    institutionMap,
    moleculeMap,
    conditionMap,
    geographyMap,
  };
}
