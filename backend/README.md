# Backend (Data + Analytics + API)

This backend is the core of the F1 2026 Race Strategy Suite.

It is responsible for:
- loading Formula 1 session data with FastF1
- cleaning and standardizing lap-level data with pandas
- saving raw and processed datasets for analytics and future ML
- exposing processed data through a simple FastAPI service

## Folder guide

- `src/data_ingestion.py`: pulls lap data from FastF1
- `src/data_cleaning.py`: handles missing values, snake_case conversion, and time conversion
- `src/feature_engineering.py`: adds beginner-friendly derived features
- `src/main.py`: pipeline entry point
- `src/api/app.py`: lightweight API for frontend/data consumers
- `data/raw/`: raw pipeline outputs
- `data/processed/`: cleaned + feature-engineered outputs
- `sql/schema.sql`: starter schema for future database storage

## Quick start

1. Create and activate a Python environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the data pipeline:

```bash
python src/main.py --year 2024 --event "Bahrain Grand Prix" --session R
```

4. Start the API:

```bash
uvicorn src.api.app:app --reload
```

5. Test endpoints:
- `GET /health`
- `GET /datasets`
- `GET /datasets/{dataset_name}`

## FastF1 usage note

FastF1 can cache downloaded data to speed up repeated runs.
For early learning, running the pipeline directly is enough.
Later, you can add an explicit cache directory configuration and logging.

## Where ML will fit later

As this project evolves:
- processed tables in `data/processed/` become model-ready datasets
- additional feature pipelines can be added in `src/feature_engineering.py` or a dedicated `src/ml/` module
- model training/inference can be exposed through additional API endpoints

The current backend is intentionally simple and production-minded: clear boundaries, reproducible data outputs, and API-first access for downstream applications.
