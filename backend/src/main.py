"""Entry point for the backend data pipeline."""

from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

import fastf1

from data_cleaning import clean_lap_data
from data_ingestion import load_session_laps
from feature_engineering import add_basic_features
from utils import PROCESSED_DATA_DIR, RAW_DATA_DIR, ensure_data_dirs, save_dataframe


# Enable FastF1 cache
fastf1.Cache.enable_cache("f1_cache")


SESSION_CODES = ["FP1", "FP2", "FP3", "SQ", "SS", "S", "Q", "R"]


def build_dataset_stem(year: int, event_name: str, session_name: str) -> str:
    """Generate a safe filename stem for saved datasets."""
    event_slug = event_name.lower().replace(" ", "_")
    session_slug = session_name.lower()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return f"{year}_{event_slug}_{session_slug}_{timestamp}"


def run_event_pipeline(year: int, event_name: str) -> None:
    """Run pipeline for all sessions of a race weekend."""

    ensure_data_dirs()

    print(f"\nLoading event: {event_name} ({year})")

    event = fastf1.get_event(year, event_name)

    for session_code in SESSION_CODES:

        try:
            print(f"Processing session: {session_code}")

            raw_df = load_session_laps(year, event_name, session_code)

            cleaned_df = clean_lap_data(raw_df)

            featured_df = add_basic_features(cleaned_df)

            dataset_stem = build_dataset_stem(year, event_name, session_code)

            raw_path = RAW_DATA_DIR / f"{dataset_stem}_raw.csv"
            processed_path = PROCESSED_DATA_DIR / f"{dataset_stem}_processed.csv"

            save_dataframe(raw_df, raw_path)
            save_dataframe(featured_df, processed_path)

            print(f"Saved raw → {raw_path}")
            print(f"Saved processed → {processed_path}")

        except Exception as exc:
            print(f"Skipping session {session_code}: {exc}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the F1 data pipeline.")

    parser.add_argument(
        "--year",
        type=int,
        default=2026,
        help="Season year (e.g. 2026)",
    )

    parser.add_argument(
        "--event",
        type=str,
        default="Chinese Grand Prix",
        help="Event name",
    )

    return parser.parse_args()


def main() -> None:
    args = parse_args()

    try:
        run_event_pipeline(
            year=args.year,
            event_name=args.event,
        )
    except Exception as exc:
        print(f"Pipeline failed: {exc}")
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
