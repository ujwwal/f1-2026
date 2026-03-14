# Data Pipeline Explained

## Pipeline stages in this project

1. **Ingestion**
   - Load a specific F1 session from FastF1.

2. **Raw dataset save**
   - Persist original lap-level records to `backend/data/raw/`.

3. **Cleaning and standardization**
   - convert columns to snake_case
   - convert timing columns to seconds
   - handle missing categorical values

4. **Feature engineering (starter level)**
   - add simple derived fields such as lap delta to driver median pace

5. **Processed dataset save**
   - persist analytics-ready output to `backend/data/processed/`.

6. **API serving**
   - frontend and other consumers access processed data via FastAPI.

## Why this pattern is useful

- reproducible data artifacts
- clear separation of raw and cleaned layers
- easy to test each stage
- scalable path to future model training pipelines
