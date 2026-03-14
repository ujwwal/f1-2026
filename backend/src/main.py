"""Entry point for the backend data pipeline."""

from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

from data_cleaning import clean_lap_data
from data_ingestion import load_session_laps
from feature_engineering import add_basic_features
from utils import PROCESSED_DATA_DIR, RAW_DATA_DIR, ensure_data_dirs, save_dataframe


def build_dataset_stem(year: int, event_name: str, session_name: str) -> str:
    """Generate a safe filename stem for saved datasets."""
    event_slug = event_name.lower().replace(" ", "_")
    session_slug = session_name.lower().replace(" ", "_")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{year}_{event_slug}_{session_slug}_{timestamp}"


def run_pipeline(year: int, event_name: str, session_name: str) -> tuple[Path, Path]:
    """Run ingestion, cleaning, feature engineering, and persistence."""
    ensure_data_dirs()

    raw_df = load_session_laps(year=year, event_name=event_name, session_name=session_name)
    cleaned_df = clean_lap_data(raw_df)
    featured_df = add_basic_features(cleaned_df)

    dataset_stem = build_dataset_stem(year, event_name, session_name)
    raw_path = RAW_DATA_DIR / f"{dataset_stem}_raw.csv"
    processed_path = PROCESSED_DATA_DIR / f"{dataset_stem}_processed.csv"

    save_dataframe(raw_df, raw_path)
    save_dataframe(featured_df, processed_path)

    return raw_path, processed_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the F1 2026 backend data pipeline.")
    parser.add_argument("--year", type=int, default=2024, help="Season year, e.g., 2024")
    parser.add_argument("--event", type=str, default="Bahrain Grand Prix", help="Event name")
    parser.add_argument("--session", type=str, default="R", help="Session code: R, Q, FP1, etc.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    try:
        raw_path, processed_path = run_pipeline(
            year=args.year,
            event_name=args.event,
            session_name=args.session,
        )
    except Exception as exc:
        print(f"Pipeline failed: {exc}")
        raise SystemExit(1) from exc

    print(f"Raw dataset saved to: {raw_path}")
    print(f"Processed dataset saved to: {processed_path}")


if __name__ == "__main__":
    main()
