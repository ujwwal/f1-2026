#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

if ! command -v python >/dev/null 2>&1; then
  echo "Error: python is not installed or not in PATH."
  exit 1
fi

if ! command -v uvicorn >/dev/null 2>&1; then
  echo "Error: uvicorn is not installed or not in PATH."
  exit 1
fi

cleanup() {
  echo
  echo "Stopping backend and frontend..."
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
}

trap cleanup INT TERM EXIT

echo "Starting backend API on http://127.0.0.1:8000"
(
  cd "$BACKEND_DIR"
  uvicorn src.api.app:app --reload
) &
BACKEND_PID=$!

echo "Starting frontend on http://127.0.0.1:5000"
(
  cd "$FRONTEND_DIR"
  python app.py
) &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both services."

wait "$BACKEND_PID" "$FRONTEND_PID"