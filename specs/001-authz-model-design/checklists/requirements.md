# Requirements Checklist: Shared Authorization Vocabulary Design

## Scope Validation

- [x] Specification is design-only and does not request runtime auth behavior.
- [x] Out of Scope explicitly excludes auth services, OAuth client registrations, redirect URIs, and domain permission evaluators.
- [x] personal-stack and website remain consumers with their own domain boundaries.
- [x] personal-stack continuous auto-deployment remains separate from authz-model artifact versioning.

## Requirement Quality

- [x] Functional requirements are numbered with `FR-n`.
- [x] Success criteria are numbered with `SC-n`.
- [x] Success criteria are measurable through review, generated artifact comparison, or consumer upgrade evidence.
- [x] No unresolved clarification markers are present.
- [x] Requirements focus on what the shared vocabulary must express and why consumers need it.

## Required Coverage

- [x] Roles are included.
- [x] Claims are included.
- [x] Permissions are included.
- [x] Groups are included.
- [x] Host gates are included.
- [x] Maven and TypeScript generated constants are included.
- [x] Distribution intent covers short coordinates, no doubled plugin-marker names, and Renovate-pinned versions.
