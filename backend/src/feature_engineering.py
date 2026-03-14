"""Simple feature engineering steps for early strategy analytics."""

from __future__ import annotations

import pandas as pd


def add_basic_features(df: pd.DataFrame) -> pd.DataFrame:
    """Add beginner-friendly derived features for analysis."""
    featured = df.copy()

    if "lap_time_seconds" in featured.columns and "driver" in featured.columns:
        driver_median = featured.groupby("driver")["lap_time_seconds"].transform("median")
        featured["driver_median_lap_time_seconds"] = driver_median
        featured["lap_delta_to_driver_median"] = featured["lap_time_seconds"] - driver_median

    if "stint" in featured.columns:
        featured["is_first_lap_of_stint"] = featured["stint"].ne(featured["stint"].shift(1))

    return featured
