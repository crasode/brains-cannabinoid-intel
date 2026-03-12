import { ACTIVE_STATUSES, CANNABINOID_TERMS } from "./sources";
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
      locations?: { facility?: string; country?: string }[];
    };
  };
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, next: { revalidate: 60 * 60 * 6 } });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${url}`);
  return response.json();
}

async function fetchClinicalTrialsStudies(): Promise<CtGovStudy[]> {
  const responses = await Promise.all(
    CANNABINOID_TERMS.slice(0, 8).map(async (term) => {
      const url = `https://clinicaltrials.gov/api/int/studies?aggFilters=status:rec%20act%20not&from=0&limit=12&fields=OverallStatus%2CBriefTitle%2CCondition%2CInterventionName%2CLocationCountry%2CCentralContactName%2CCentralContactEMail%2CNCTId%2CStudyType%2CLeadSponsorName%2CPhase%2CStudyFirstPostDate%2CLastUpdatePostDate%2COverallOfficialName%2COverallOfficialAffiliation&columns=conditions%2Cinterventions%2Ccollaborators&highlight=true&sort=%40relevance&query.term=${encodeURIComponent(term)}`;
      return fetchJson<any>(url);
    }),
  );

  const map = new Map<string, CtGovStudy>();
  for (const response of responses) {
    for (const hit of response?.hits || []) {
      const study = hit?.study as CtGovStudy | undefined;
      const nctId = study?.protocolSection?.identificationModule?.nctId;
      if (!study || !nctId) continue;
      const type = study?.protocolSection?.designModule?.studyType || "";
      if (type && type !== "INTERVENTIONAL") continue;
      map.set(nctId, study);
    }
  }

  return Array.from(map.values());
}

async function getPatentCount(name: string): Promise<number> {
  if (!name) return 0;
  try {
    const body = {
      q: { _text_any: { patent_title: name } },
      f: ["patent_id"],
      o: { size: 5 },
    };
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

function normalizeStudy(study: CtGovStudy) {
  const protocol = study.protocolSection || {};
  const id = protocol.identificationModule?.nctId || protocol.identificationModule?.orgStudyIdInfo?.id || crypto.randomUUID();
  const rawTitle = protocol.identificationModule?.briefTitle || protocol.identificationModule?.officialTitle || "Untitled study";
  const title = summarizeTitle(rawTitle);
  const status = protocol.statusModule?.overallStatus || "Unknown";
  const phase = protocol.designModule?.phases?.join(", ") || "Not specified";
  const condition = (protocol.conditionsModule?.conditions || []).map(cleanText).filter(Boolean);
  const interventions = (protocol.armsInterventionsModule?.interventions || []).map((item) => cleanText(item.name)).filter(Boolean) as string[];
  const sponsors = [protocol.sponsorCollaboratorsModule?.leadSponsor?.name, ...(protocol.sponsorCollaboratorsModule?.collaborators || []).map((x) => x.name)].map(cleanText).filter(Boolean) as string[];
  const overallOfficials = protocol.contactsLocationsModule?.overallOfficials || [];
  const leadResearchers = overallOfficials.map((x) => cleanText(x.name)).filter(Boolean) as string[];
  const institutions = [...new Set(overallOfficials.map((x) => cleanText(x.affiliation)).filter(Boolean) as string[])];
  const countries = [...new Set((protocol.contactsLocationsModule?.locations || []).map((x) => cleanText(x.country)).filter(Boolean) as string[])];
  const firstPosted = protocol.statusModule?.studyFirstPostDateStruct?.date;
  const lastUpdated = protocol.statusModule?.lastUpdatePostDateStruct?.date;
  return { id, title, status, phase, condition, interventions, sponsors, institutions, countries, leadResearchers, firstPosted, lastUpdated };
}

export async function getDashboardData(): Promise<DashboardPayload> {
  const studies = await fetchClinicalTrialsStudies();

  const enriched = await Promise.all(
    studies.map(async (study) => {
      const normalized = normalizeStudy(study);
      const researcher = normalized.leadResearchers[0] || normalized.sponsors[0] || normalized.title;
      const sponsorQuery = normalized.sponsors[0] || normalized.title;
      const institutionQuery = normalized.institutions[0] || researcher;

      const [patentCount, grantCount, publicationCount] = await Promise.all([
        getPatentCount(sponsorQuery),
        getGrantCount(researcher),
        getPublicationCount(institutionQuery),
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
        publicationCount,
      });
    }),
  );

  const byScore = [...enriched].sort((a, b) => b.commercialScore - a.commercialScore);
  const byUpdate = [...enriched].sort((a, b) => (new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime()));

  const sponsorMap = Object.entries(
    enriched.reduce<Record<string, number>>((acc, trial) => {
      trial.sponsors.forEach((s) => { if (s) acc[s] = (acc[s] || 0) + 1; });
      return acc;
    }, {}),
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);

  const institutionMap = Object.entries(
    enriched.reduce<Record<string, number>>((acc, trial) => {
      trial.institutions.forEach((s) => { if (s) acc[s] = (acc[s] || 0) + 1; });
      return acc;
    }, {}),
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);

  const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
  const newlyAddedCount = enriched.filter((t) => t.firstPosted && new Date(t.firstPosted).getTime() >= twoWeeksAgo).length;

  return {
    generatedAt: new Date().toISOString(),
    totalActiveTrials: enriched.length,
    newlyAddedCount,
    topTrials: byScore.slice(0, 8),
    latestTrials: byUpdate.slice(0, 8),
    sponsorMap,
    institutionMap,
  };
}
