# Frontend (React + Vite)

This frontend is intentionally separate from the backend data/ML system.

Its job is simple:
- call backend API endpoints
- display processed race/session data
- provide a UI surface for future strategy insights

It does **not** contain:
- FastF1 logic
- pandas pipelines
- model training code

## Why this separation matters

For data science projects moving toward production, this separation keeps responsibilities clear:
- backend owns data ingestion, cleaning, analytics, and future ML
- frontend owns visualization and user interaction

This makes each side easier to evolve independently.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Optional API base URL override:

Create `.env` and set:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Current UI sections

- simple homepage hero
- processed dataset selector
- lap/session table (fetched from backend API)
- placeholder panel for future strategy outputs
