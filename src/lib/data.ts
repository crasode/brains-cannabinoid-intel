export type TrialRecord = {
  id: string;
  registry: string;
  title: string;
  moleculeClass: string;
  molecules: string[];
  indication: string;
  status: "Recruiting" | "Active, not recruiting" | "Not yet recruiting" | "Completed";
  phase: string;
  geography: string[];
  sponsor: string;
  leadResearcher: {
    name: string;
    institution: string;
    previousWork: string[];
    patents: string[];
    grants: string[];
  };
  updatedAt: string;
  sourceUrls: string[];
};

export const dashboardStats = [
  { label: "Active trials tracked", value: "148" },
  { label: "Jurisdictions", value: "Global" },
  { label: "Research entities mapped", value: "392" },
  { label: "Daily sync cadence", value: "24h" },
];

export const sourceCatalog = [
  "ClinicalTrials.gov",
  "EU CTIS / EU Clinical Trials Register",
  "ISRCTN",
  "WHO ICTRP (where accessible)",
  "PubMed",
  "Crossref / OpenAlex",
  "Google Patents / Lens-style patent sources",
  "NIH RePORTER",
  "CORDIS",
  "NSF Awards",
  "UKRI / public grant sources",
  "ORCID + institutional profile enrichment",
];

export const trackedScope = [
  "CBD",
  "D9-THC / THC",
  "CBN",
  "CBG",
  "Synthetic cannabinoids",
  "Cannabinoid analogs",
  "Cannabinoid prodrugs",
  "NCEs containing cannabinoid structures",
];

export const sampleTrials: TrialRecord[] = [
  {
    id: "NCT-BSPG-001",
    registry: "ClinicalTrials.gov",
    title: "Cannabinoid API program for refractory epilepsy",
    moleculeClass: "Cannabinoid API",
    molecules: ["CBD", "NCE cannabinoid analog"],
    indication: "Epilepsy",
    status: "Recruiting",
    phase: "Phase 2",
    geography: ["United States", "Brazil"],
    sponsor: "Example Pharma Partner",
    leadResearcher: {
      name: "Dr. Elena Marquez",
      institution: "Global Neurology Institute",
      previousWork: [
        "Published translational work on cannabinoid receptor modulation in seizure pathways",
        "Prior principal investigator on two CNS-focused clinical studies",
      ],
      patents: [
        "WO-2024-118221 — cannabinoid analog compositions for neurological disorders",
      ],
      grants: [
        "NIH translational neurology award — active",
      ],
    },
    updatedAt: "2026-03-11",
    sourceUrls: ["https://clinicaltrials.gov/"],
  },
  {
    id: "EU-BSPG-002",
    registry: "EU CTIS",
    title: "Cannabinoid prodrug study in inflammatory pain",
    moleculeClass: "Prodrug",
    molecules: ["Cannabinoid prodrug", "CBG analog"],
    indication: "Inflammatory pain",
    status: "Active, not recruiting",
    phase: "Phase 1/2",
    geography: ["United Kingdom", "Germany", "Spain"],
    sponsor: "Biopharma Europe",
    leadResearcher: {
      name: "Prof. Markus Feld",
      institution: "European Clinical Pharmacology Network",
      previousWork: [
        "Published work in drug delivery and modified cannabinoid molecules",
        "Co-author on multiple API development studies",
      ],
      patents: ["EP-2025-440018 — prodrug formulations for cannabinoid delivery"],
      grants: ["Horizon Europe translational medicine grant"],
    },
    updatedAt: "2026-03-10",
    sourceUrls: ["https://euclinicaltrials.eu/"],
  },
  {
    id: "INTL-BSPG-003",
    registry: "ISRCTN",
    title: "Synthetic cannabinoid API investigation in insomnia",
    moleculeClass: "Synthetic cannabinoid",
    molecules: ["Synthetic cannabinoid", "THC analog"],
    indication: "Insomnia",
    status: "Not yet recruiting",
    phase: "Phase 2",
    geography: ["Australia", "Canada"],
    sponsor: "Pacific Therapeutics",
    leadResearcher: {
      name: "Dr. Rachel Singh",
      institution: "Sleep & Neuropharmacology Lab",
      previousWork: [
        "Published cannabinoid sleep-mechanism work",
        "PI on prior CNS and sleep studies",
      ],
      patents: ["US-2025-0048871 — synthetic cannabinoid sleep therapeutics"],
      grants: ["National sleep research grant", "Provincial innovation program"],
    },
    updatedAt: "2026-03-11",
    sourceUrls: ["https://www.isrctn.com/"],
  },
];
