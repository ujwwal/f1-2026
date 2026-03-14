# Architecture Overview

## Monorepo design

This project uses a monorepo with strict boundaries:
- **backend** for data ingestion, cleaning, feature engineering, analytics API, and future ML
- **frontend** for UI and data presentation only
- **docs** for technical and learning documentation

## Why this architecture is strong for ML projects

1. **Single source of truth for data logic**
   - FastF1 ingestion and pandas transformations stay in backend.

2. **Independent UI evolution**
   - frontend can be redesigned or replaced without touching ML/data code.

3. **Clear production path**
   - API contracts enable independent deployment and scaling.

4. **Portfolio clarity**
   - reviewers can quickly identify data engineering and ML work separately from UI work.

## Backend flow

1. Pull session data with FastF1
2. Create lap-level dataset
3. Clean and standardize columns
4. Convert time fields to numeric seconds
5. Save raw and processed outputs
6. Serve processed data through FastAPI

## Frontend flow

1. Call `GET /datasets`
2. Call `GET /datasets/{dataset_name}`
3. Render tabular output and simple strategy placeholders

## Future production extensions

- Add background jobs for scheduled ingestion
- Add model training and inference modules
- Add database persistence and lineage tracking
- Add CI tests for data quality and API contracts
