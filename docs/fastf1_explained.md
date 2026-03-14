# FastF1 Explained (Beginner Guide)

FastF1 is a Python library for accessing Formula 1 timing/session data.

## What it gives you

- session metadata (event, year, session type)
- lap-level timing data
- sector split times
- stint and tyre compound details
- optional telemetry for deeper analysis

## Typical workflow

1. Select a session with `get_session(year, event, session)`
2. Load data with `session.load(...)`
3. Use `session.laps` to access lap-level data
4. Convert to pandas DataFrame operations

## Why it is useful here

For this project, FastF1 is the data source feeding your analytics and future ML pipelines.

## Good beginner practice

- start with lap-level tables before telemetry complexity
- keep raw exports for reproducibility
- document assumptions when cleaning missing values
