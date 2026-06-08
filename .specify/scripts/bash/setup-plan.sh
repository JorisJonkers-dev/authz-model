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

if [[ ! -f "$SPEC_FILE" ]]; then
  echo "Missing spec: $SPEC_FILE" >&2
  exit 1
fi

if [[ ! -f "$PLAN_FILE" ]]; then
  cp "$ROOT_DIR/.specify/templates/plan-template.md" "$PLAN_FILE"
fi

if [[ "${1:-}" == "--json" ]]; then
  printf '{"FEATURE_DIR":"%s","SPEC_FILE":"%s","PLAN_FILE":"%s"}\n' "$FEATURE_DIR" "$SPEC_FILE" "$PLAN_FILE"
else
  printf 'FEATURE_DIR=%s\nSPEC_FILE=%s\nPLAN_FILE=%s\n' "$FEATURE_DIR" "$SPEC_FILE" "$PLAN_FILE"
fi
