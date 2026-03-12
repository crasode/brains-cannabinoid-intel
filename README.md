# Brains Cannabinoid Intelligence Platform

Brains-branded internal MVP for tracking global cannabinoid API trials and cross-referencing public trial data with investigator history, patents, grants, and funding records.

## Current MVP

- Protected internal dashboard
- Password gate via `APP_PASSWORD` (`BSPG` placeholder)
- Global cannabinoid scope including:
  - CBD
  - THC / D9-THC
  - CBN
  - CBG
  - synthetic cannabinoids
  - cannabinoid analogs
  - cannabinoid prodrugs
  - NCEs containing cannabinoid structures
- Sample cross-referenced trial data model
- Free data source catalog for first implementation phase

## Free-source targets for ingestion

- ClinicalTrials.gov
- EU CTIS / EU Clinical Trials Register
- ISRCTN
- WHO ICTRP (where accessible)
- PubMed
- Crossref / OpenAlex
- Google Patents / Lens-style patent sources
- NIH RePORTER
- CORDIS
- NSF Awards
- UKRI / public grant sources
- ORCID + institutional profile enrichment

## Priority build order

1. Trial ingestion and normalization
2. Canonical people / institution / sponsor entity resolution
3. Publication, patent, and grant enrichment
4. Daily sync jobs and change detection
5. Alerting for new trials and material updates

## Local run

```bash
cp .env.example .env.local
npm install
npm run dev
```

Then open `http://localhost:3000` and enter the password.

## Security note

This is a starter password gate for internal use only. Before any real deployment:

- replace the placeholder password
- keep the repo private
- move auth to proper identity-based access
- store secrets outside the repo
