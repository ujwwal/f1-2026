# Pandas Explained for This Project

Pandas is your core table-processing tool.
Think of each DataFrame as a dataset table you can filter, transform, and save.

## What you use pandas for here

- selecting relevant columns from FastF1 outputs
- cleaning missing values
- converting `Timedelta` values to numeric seconds
- standardizing column names to `snake_case`
- writing CSV outputs for analytics and ML

## Important concepts

- **DataFrame**: table-like data structure
- **Series**: one column from a DataFrame
- **vectorized operations**: fast column operations
- **groupby**: per-driver or per-team aggregations

## Beginner tips

- avoid too many in-place edits while learning
- keep raw data untouched and write cleaned versions separately
- validate column types before feature engineering
