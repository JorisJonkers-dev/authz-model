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
REQUIRE_TASKS=false
JSON=false

for arg in "$@"; do
  case "$arg" in
    --json) JSON=true ;;
    --require-tasks) REQUIRE_TASKS=true ;;
    --include-tasks) ;;
  esac
done

for required in "$SPEC_FILE" "$PLAN_FILE"; do
  if [[ ! -f "$required" ]]; then
    echo "Missing required file: $required" >&2
    exit 1
  fi
done

if [[ "$REQUIRE_TASKS" == true && ! -f "$TASKS_FILE" ]]; then
  echo "Missing required file: $TASKS_FILE" >&2
  exit 1
fi

if [[ "$JSON" == true ]]; then
  printf '{"FEATURE_DIR":"%s","SPEC_FILE":"%s","PLAN_FILE":"%s","TASKS_FILE":"%s"}\n' "$FEATURE_DIR" "$SPEC_FILE" "$PLAN_FILE" "$TASKS_FILE"
else
  printf 'FEATURE_DIR=%s\nSPEC_FILE=%s\nPLAN_FILE=%s\nTASKS_FILE=%s\n' "$FEATURE_DIR" "$SPEC_FILE" "$PLAN_FILE" "$TASKS_FILE"
fi
