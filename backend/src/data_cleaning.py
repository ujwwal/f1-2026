"""Data cleaning functions for lap-level race data."""

from __future__ import annotations

from typing import Iterable

import pandas as pd

from utils import timedelta_to_seconds, to_snake_case


TIME_COLUMNS: Iterable[str] = ["lap_time", "sector1_time", "sector2_time", "sector3_time"]


def clean_lap_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean and standardize raw lap data for analytics and ML preparation."""
    working_df = df.copy()
    working_df.columns = [to_snake_case(column) for column in working_df.columns]

    for column in TIME_COLUMNS:
        if column in working_df.columns:
            seconds_column = f"{column}_seconds"
            working_df[seconds_column] = working_df[column].apply(timedelta_to_seconds)

    # Keep categorical values explicit for downstream tooling.
    for column in ["driver", "team", "compound", "track_status", "event_name", "session_name"]:
        if column in working_df.columns:
            working_df[column] = working_df[column].fillna("unknown").astype(str)

    for column in ["lap_number", "stint", "tyre_life", "year"]:
        if column in working_df.columns:
            working_df[column] = pd.to_numeric(working_df[column], errors="coerce")

    if {"driver", "lap_number"}.issubset(working_df.columns):
        working_df = working_df.drop_duplicates(subset=["driver", "lap_number"], keep="last")

    sort_columns = [column for column in ["driver", "lap_number"] if column in working_df.columns]
    if sort_columns:
        working_df = working_df.sort_values(sort_columns).reset_index(drop=True)

    return working_df
