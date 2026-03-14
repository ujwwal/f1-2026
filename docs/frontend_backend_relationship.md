# Frontend and Backend Relationship

## How the frontend calls the backend

The frontend never reads local backend files directly.
It only talks over HTTP APIs:
- `GET /health`
- `GET /datasets`
- `GET /datasets/{dataset_name}`

This means the frontend can run on a different server than the backend.

## Why frontend should not contain ML logic

Machine learning and data transformations belong in backend services because:
- backend can be versioned and validated for reproducibility
- model logic is easier to monitor and secure on the server side
- frontend should stay lightweight and presentation-focused

## Scaling benefits

- backend can scale for heavy data workloads
- frontend can scale for user traffic
- teams can deploy changes independently

## Practical rule for this project

If code touches FastF1, pandas, feature engineering, or model logic, it belongs in backend.
If code renders tables/charts/UI state, it belongs in frontend.
