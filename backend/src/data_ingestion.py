"""Data ingestion utilities for loading Formula 1 session data via FastF1."""

from __future__ import annotations

from typing import List

import fastf1
import pandas as pd

RAW_COLUMNS: List[str] = [
    "Driver",
    "Team",
    "LapNumber",
    "LapTime",
    "Sector1Time",
    "Sector2Time",
    "Sector3Time",
    "Stint",
    "Compound",
    "TyreLife",
    "TrackStatus",
]


def load_session_laps(year: int, event_name: str, session_name: str) -> pd.DataFrame:
    """Load a session from FastF1 and return lap-level data.

    Args:
        year: Championship year.
        event_name: Grand Prix/event name accepted by FastF1.
        session_name: Session code such as "R", "Q", "FP1".
    """
    session = fastf1.get_session(year, event_name, session_name)
    session.load(laps=True, telemetry=False, weather=False, messages=False)

    laps = session.laps
    available_columns = [column for column in RAW_COLUMNS if column in laps.columns]
    if not available_columns:
        raise ValueError("No expected lap columns were found in the loaded session.")

    df = laps[available_columns].copy()

    event_label = event_name
    if hasattr(session, "event") and session.event is not None:
        event_label = str(session.event.get("EventName", event_name))

    df["EventName"] = event_label
    df["SessionName"] = session_name
    df["Year"] = year
    return df
