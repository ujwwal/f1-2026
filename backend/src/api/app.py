"""Minimal FastAPI app for serving processed lap datasets."""

from __future__ import annotations

from pathlib import Path

import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware


PROCESSED_DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "processed"

app = FastAPI(title="F1 2026 Race Strategy Suite API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/datasets")
def list_processed_datasets() -> dict[str, list[str]]:
    PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)
    datasets = sorted(path.name for path in PROCESSED_DATA_DIR.glob("*.csv"))
    return {"datasets": datasets}


@app.get("/datasets/{dataset_name}")
def get_dataset_rows(
    dataset_name: str,
    limit: int = Query(default=200, ge=1, le=5000),
) -> dict[str, object]:
    filename = dataset_name if dataset_name.endswith(".csv") else f"{dataset_name}.csv"
    dataset_path = PROCESSED_DATA_DIR / filename

    if not dataset_path.exists():
        raise HTTPException(status_code=404, detail=f"Dataset not found: {filename}")

    df = pd.read_csv(dataset_path)
    records = df.head(limit).to_dict(orient="records")
    return {
        "dataset": filename,
        "rows": records,
        "row_count": len(records),
    }
