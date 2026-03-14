# Frontend (Flask)

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
pip install -r requirements.txt
```

2. Start the Flask app:

```bash
python app.py
```

3. Optional API base URL override:

```bash
export API_BASE_URL=http://127.0.0.1:8000
```

4. Optional host/port override:

```bash
export FRONTEND_HOST=127.0.0.1
export FRONTEND_PORT=5000
```

Open `http://127.0.0.1:5000` in your browser.

## Current UI sections

- simple homepage hero
- processed dataset selector
- lap/session table (fetched from backend API)
- placeholder panel for future strategy outputs
