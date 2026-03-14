"""Entry point for the backend data pipeline."""

from __future__ import annotations

import argparse
from pathlib import Path

import fastf1
import pandas as pd

from data_cleaning import clean_lap_data
from data_ingestion import load_session_laps
from feature_engineering import add_basic_features
from utils import PROCESSED_DATA_DIR, RAW_DATA_DIR, ensure_data_dirs, save_dataframe


# Enable FastF1 cache
BACKEND_DIR = Path(__file__).resolve().parent.parent
CACHE_DIR = BACKEND_DIR / "f1_cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)
fastf1.Cache.enable_cache(str(CACHE_DIR))


SESSION_CODES = ["FP1", "FP2", "FP3", "SQ", "SS", "S", "Q", "R"]


def slugify_event_name(event_name: str) -> str:
    """Convert event names into deterministic filename-safe slugs."""
    return event_name.lower().replace(" ", "_")


def build_output_paths(year: int, event_name: str, session_code: str) -> tuple[Path, Path]:
    """Build deterministic output paths for a session's raw and processed data."""
    event_slug = slugify_event_name(event_name)
    session_slug = session_code.lower()
    raw_path = RAW_DATA_DIR / f"{year}_{event_slug}_{session_slug}_raw.csv"
    processed_path = PROCESSED_DATA_DIR / f"{year}_{event_slug}_{session_slug}_processed.csv"
    return raw_path, processed_path


def run_session_pipeline(year: int, event_name: str, session_code: str) -> tuple[Path, Path] | None:
    """Process a single session and save datasets unless already present."""
    raw_path, processed_path = build_output_paths(year, event_name, session_code)

    if raw_path.exists() and processed_path.exists():
        print(f"Skipping {event_name} {session_code} (already exists)")
        return None

    try:
        raw_df = load_session_laps(year=year, event_name=event_name, session_name=session_code)
    except Exception as exc:
        print(f"Skipping {event_name} {session_code}: {exc}")
        return None

    cleaned_df = clean_lap_data(raw_df)
    featured_df = add_basic_features(cleaned_df)

    print(f"Saving session: {session_code}")
    save_dataframe(raw_df, raw_path)
    save_dataframe(featured_df, processed_path)
    print(f"Saved raw -> {raw_path}")
    print(f"Saved processed -> {processed_path}")

    return raw_path, processed_path


def run_event_pipeline(year: int, event_name: str) -> list[tuple[Path, Path]]:
    """Run pipeline for all available sessions of a race weekend."""

    ensure_data_dirs()
    saved_paths: list[tuple[Path, Path]] = []

    print(f"\nProcessing event: {event_name}")

    for session_code in SESSION_CODES:
        result = run_session_pipeline(year=year, event_name=event_name, session_code=session_code)
        if result is not None:
            saved_paths.append(result)

    return saved_paths


def get_completed_event_names(year: int) -> list[str]:
    """Return completed race weekend names for a season."""
    schedule = fastf1.get_event_schedule(year)

    if "RoundNumber" in schedule.columns:
        schedule = schedule[schedule["RoundNumber"] > 0]

    if "EventDate" not in schedule.columns:
        raise ValueError("Event schedule does not include an EventDate column")

    event_dates = pd.to_datetime(schedule["EventDate"], errors="coerce")
    if event_dates.dt.tz is not None:
        event_dates = event_dates.dt.tz_convert("UTC").dt.tz_localize(None)

    now_utc_naive = pd.Timestamp.now(tz="UTC").tz_localize(None)
    completed_events = schedule[event_dates.notna() & (event_dates <= now_utc_naive)]

    if "EventName" not in completed_events.columns:
        raise ValueError("Event schedule does not include an EventName column")

    return completed_events["EventName"].tolist()


def run_completed_events_pipeline(year: int) -> list[tuple[Path, Path]]:
    """Run pipeline for all completed race weekends in a season."""
    print(f"Checking completed events for season {year}...")
    completed_events = get_completed_event_names(year)
    saved_paths: list[tuple[Path, Path]] = []

    if not completed_events:
        print(f"No completed race weekends found for {year}.")
        return saved_paths

    print(f"Found {len(completed_events)} completed event(s).")

    for event_name in completed_events:
        saved_paths.extend(run_event_pipeline(year=year, event_name=event_name))

    return saved_paths


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
        default=None,
        help="Event name",
    )

    parser.add_argument(
        "--auto",
        action="store_true",
        help="Automatically process all completed race weekends for the season",
    )

    return parser.parse_args()


def main() -> None:
    args = parse_args()

    try:
        if args.auto:
            run_completed_events_pipeline(year=args.year)
            return

        if not args.event:
            print("No --event provided; defaulting to --auto mode.")
            run_completed_events_pipeline(year=args.year)
            return

        run_event_pipeline(year=args.year, event_name=args.event)
    except Exception as exc:
        print(f"Pipeline failed: {exc}")
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
