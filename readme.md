# F1 2026 Race Strategy Suite

A production-style portfolio project focused on data engineering, analytics, and future machine learning for Formula 1 race strategy.

## Core idea

This repository is intentionally split into:
- `backend/`: the main data/ML system (FastF1 + pandas + API)
- `frontend/`: a separate UI layer for visualization

This helps you stay focused on learning data science and ML while still showing how the project can grow into a production architecture.

## Why split backend and frontend?

- Your main learning and portfolio value is in data pipelines, analytics, and ML.
- Frontend should be replaceable and independent.
- API boundaries make the system easier to scale, test, and deploy.
- Team workflows are cleaner when data and UI concerns are separated.

## Monorepo structure

- `backend/`: ingestion, cleaning, feature engineering, API, datasets
- `frontend/`: React + Vite dashboard consuming backend API
- `docs/`: educational architecture and concept notes

## Quick start

### Backend

```bash
cd backend
pip install -r requirements.txt
python src/main.py --year 2024 --event "Bahrain Grand Prix" --session R
uvicorn src.api.app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Growth roadmap

1. Expand data core with additional sessions and events.
2. Add richer analytics features and validation checks.
3. Introduce starter scikit-learn models for pace/strategy forecasting.
4. Add 2026 concept simulation outputs into API + dashboard.
5. Connect processed datasets to SQL/cloud storage.

The backend remains the intelligence layer. The frontend remains an interface layer.
