"""Utility helpers for file paths, naming, and time conversions."""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import pandas as pd


BACKEND_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = BACKEND_ROOT / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"


def ensure_data_dirs() -> None:
    """Create local data directories if they do not exist."""
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)


def to_snake_case(value: str) -> str:
    """Convert mixed naming styles to snake_case."""
    cleaned = re.sub(r"[^a-zA-Z0-9]", "_", value)
    cleaned = re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", cleaned)
    cleaned = re.sub(r"_+", "_", cleaned)
    return cleaned.strip("_").lower()


def timedelta_to_seconds(value: Any) -> float | None:
    """Convert pandas Timedelta-like values to seconds."""
    if pd.isna(value):
        return None

    if isinstance(value, pd.Timedelta):
        return value.total_seconds()

    # Handles string and python timedelta input safely.
    converted = pd.to_timedelta(value, errors="coerce")
    if pd.isna(converted):
        return None
    return converted.total_seconds()


def save_dataframe(df: pd.DataFrame, path: Path) -> Path:
    """Save a DataFrame as CSV and return the path."""
    path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(path, index=False)
    return path
