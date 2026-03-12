export type EnrichedTrial = {
  id: string;
  title: string;
  status: string;
  phase: string;
  condition: string[];
  interventions: string[];
  sponsors: string[];
  institutions: string[];
  countries: string[];
  leadResearchers: string[];
  firstPosted?: string;
  lastUpdated?: string;
  sourceUrl: string;
  patentCount: number;
  grantCount: number;
  publicationCount: number;
  commercialScore: number;
  scoringBreakdown: {
    phase: number;
    sponsor: number;
    geography: number;
    patents: number;
    grants: number;
    publications: number;
    recency: number;
  };
};

export type DashboardPayload = {
  generatedAt: string;
  totalActiveTrials: number;
  newlyAddedCount: number;
  topTrials: EnrichedTrial[];
  latestTrials: EnrichedTrial[];
  sponsorMap: { name: string; count: number }[];
  institutionMap: { name: string; count: number }[];
};
