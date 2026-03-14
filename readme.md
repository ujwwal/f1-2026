# F1 2026 Race Strategy Suite

A portfolio-grade project that demonstrates how to build a data-driven analytics platform for Formula 1 race strategy.

This repository includes:
- A **backend** that ingests and processes F1 session data, builds analytics datasets, and exposes a web API.
- A **frontend** dashboard that visualizes the analytics and offers an interactive view of race strategy.
- Supporting **documentation** that explains architecture, data pipeline concepts, and the domain model.

---

## What this project does

This project collects and processes Formula 1 telemetry and timing data (via the FastF1 library), then:

- cleans and enriches raw session data into structured datasets
- computes race strategy metrics (stints, tire usage, lap pace, etc.)
- serves analytics through a REST API
- visualizes insights in a web dashboard

The goal is to illustrate how data engineering, analytics, and machine learning can be applied to motorsports strategy in a maintainable, modular architecture.

---

## Repository structure

- `backend/`
  - Ingests and cleans FastF1 session data
  - Performs feature engineering and builds datasets
  - Runs an API server (`uvicorn`) exposing processed data

- `frontend/`
  - A Flask application that calls the backend API
  - Provides interactive charts and data exploration

- `docs/`
  - High-level architecture notes and concept explanations
  - Guides for understanding the data pipeline and analytics

---

## Getting started

### Prerequisites

- Python 3.11+ (for backend and frontend)

### Run the backend

```bash
cd backend
pip install -r requirements.txt
python src/main.py --year 2024 --event "Bahrain Grand Prix" --session R
uvicorn src.api.app:app --reload
```

This will download FastF1 session data, process it, and start an API server on `http://localhost:8000`.

### Run the frontend

```bash
cd frontend
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

---

## Next steps (roadmap)

1. Expand the data core to support more events, sessions, and years.
2. Add additional analytics and validation checks for data quality.
3. Introduce starter machine learning models for pace prediction and strategic recommendations.
4. Add 2026 concept simulation outputs into the API and dashboard.
5. Connect processed datasets to SQL or cloud storage for persistence.

---

## Who is this for?

This project is aimed at anyone who wants to learn how to build a production-style data pipeline with a clear separation between the data/ML backend and the visualization frontend. It is suitable for portfolio reviewers, learners, and engineers interested in motorsport analytics.