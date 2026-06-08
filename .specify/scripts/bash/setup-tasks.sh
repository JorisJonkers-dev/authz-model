#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(git rev-parse --show-toplevel)
FEATURE_DIR=$(find "$ROOT_DIR/specs" -maxdepth 1 -type d -name '001-*' | sort | head -n 1)

if [[ -z "${FEATURE_DIR:-}" ]]; then
  echo "No active feature directory found" >&2
  exit 1
fi

SPEC_FILE="$FEATURE_DIR/spec.md"
PLAN_FILE="$FEATURE_DIR/plan.md"
TASKS_FILE="$FEATURE_DIR/tasks.md"

for required in "$SPEC_FILE" "$PLAN_FILE"; do
  if [[ ! -f "$required" ]]; then
    echo "Missing required file: $required" >&2
    exit 1
  fi
done

if [[ ! -f "$TASKS_FILE" ]]; then
  cp "$ROOT_DIR/.specify/templates/tasks-template.md" "$TASKS_FILE"
fi

if [[ "${1:-}" == "--json" ]]; then
  printf '{"FEATURE_DIR":"%s","PLAN_FILE":"%s","TASKS_FILE":"%s"}\n' "$FEATURE_DIR" "$PLAN_FILE" "$TASKS_FILE"
else
  printf 'FEATURE_DIR=%s\nPLAN_FILE=%s\nTASKS_FILE=%s\n' "$FEATURE_DIR" "$PLAN_FILE" "$TASKS_FILE"
fi
