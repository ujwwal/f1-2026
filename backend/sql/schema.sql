-- Starter schema for future relational storage.
-- This can later be adapted for PostgreSQL, Oracle Cloud, or another managed DB.

CREATE TABLE IF NOT EXISTS race_laps (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    year INTEGER NOT NULL,
    event_name VARCHAR(128) NOT NULL,
    session_name VARCHAR(32) NOT NULL,
    driver VARCHAR(32) NOT NULL,
    team VARCHAR(64),
    lap_number INTEGER,
    lap_time_seconds DOUBLE PRECISION,
    sector1_time_seconds DOUBLE PRECISION,
    sector2_time_seconds DOUBLE PRECISION,
    sector3_time_seconds DOUBLE PRECISION,
    stint INTEGER,
    compound VARCHAR(32),
    tyre_life INTEGER,
    track_status VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
