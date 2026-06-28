# Tasks: Shared Authorization Vocabulary

## Dependencies

- T001 must run before implementation so the branch and toolchain are known.
- T002-T004 define the source vocabulary contract and must complete before generator work.
- T005-T009 implement and test generation; T010-T013 package generated outputs.
- T014-T016 add CI/release/publish workflows after local commands exist.
- T017-T019 are final validation, traceability, and repository hygiene tasks.

## Tasks

- [x] T001 Confirm implementation branch `impl/initial`, Git identity, and local Java/Node toolchain. Trace: SC-4.
- [x] T002 Add JSON Schema at `schema/authz-model.schema.json` covering roles, claims, permissions, groups, host gates, lifecycle, namespace, owner, scope, and replacement metadata. Trace: FR-1, FR-2, FR-12, SC-3, SC-8.
- [x] T003 Add personal-stack-derived sample model at `model/personal-stack.sample.json` with all current role and service-permission vocabulary entries. Trace: FR-3, FR-5, SC-1, SC-2.
- [x] T004 Add claim, group, and host-gate records to the sample for role claims, username identity, service authorities, optional groups, forwarded headers, and known host aliases. Trace: FR-4, FR-6, FR-7, SC-1, SC-3.
- [x] T005 Add npm workspace scripts and dependencies in `package.json` and `package-lock.json` for validation, generation, generated-output checks, and TypeScript typecheck. Trace: FR-8, SC-4.
- [x] T006 Implement `tools/generator/validate.mjs` with JSON Schema validation, duplicate detection, and cross-reference checks. Trace: FR-2, FR-12, SC-8.
- [x] T007 Implement `tools/generator/generate.mjs` to emit Kotlin and TypeScript constants plus value-format helpers from the sample. Trace: FR-8, FR-9, SC-4, SC-7.
- [x] T008 Implement `tools/generator/check-generated.mjs` to fail on stale generated Kotlin or TypeScript output. Trace: FR-8, SC-4.
- [x] T009 Run the generator to create checked-in outputs under `packages/kotlin/src/generated/kotlin/...` and `packages/typescript/src/generated/...`. Trace: FR-8, FR-9, SC-4.
- [x] T010 Add Gradle settings, wrapper, root build, and `packages/kotlin/build.gradle.kts` for the Maven-facing Kotlin artifact `dev.jorisjonkers:authz-model`. Trace: FR-10, SC-5.
- [x] T011 Add Kotlin tests at `packages/kotlin/src/test/kotlin/dev/jorisjonkers/authz/model/AuthzVocabularyTest.kt` for role authorities, service authorities, host alias lookup, unmapped host behavior, and group causes. Trace: FR-3, FR-5, FR-6, FR-7, SC-1, SC-2.
- [x] T012 Add TypeScript package metadata, `tsconfig.json`, and type assertions for generated exports under `packages/typescript`. Trace: FR-8, FR-10, SC-4, SC-5.
- [x] T013 Ensure generated constants contain no controllers, filters, token issuance, persistence, OAuth client registration, redirect URI data, secrets, or evaluators. Trace: FR-9, SC-7.
- [x] T014 Add `.github/workflows/ci.yml` with real validation/build/typecheck gates and terminal job exactly named `Pipeline Complete`. Trace: SC-4.
- [x] T015 Add `.github/workflows/release.yml` for release-please. Trace: FR-10, FR-11, SC-6.
- [x] T016 Add release workflow publishing with serial Maven publish and npm publish to GitHub Packages. Trace: FR-10, SC-6.
- [x] T017 Run local validation: `npm run validate`, `npm run generate`, `npm run check:generated`, `npm run typecheck`, and `./gradlew test`. Trace: SC-1, SC-2, SC-4, SC-8.
- [x] T018 Review `spec.md`, `plan.md`, and `tasks.md` for consistency and update minimally if implementation reveals a gap. Trace: all FR/SC.
- [ ] T019 Commit, push, and open PR for review. Trace: CI/release rules.

## Validation

- Schema validation must fail on missing required record metadata, duplicate keys or generated values, duplicate host aliases, invalid lifecycle replacements, and references to missing roles or permissions.
- Kotlin validation must compile and test generated constants through Gradle.
- TypeScript validation must typecheck generated constants through `tsc --noEmit`.
- CI must include a `Pipeline Complete` job whose result reflects all gating jobs.
