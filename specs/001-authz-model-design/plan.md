# Implementation Plan: Shared Authorization Vocabulary

## Technical Context

- Source format: JSON vocabulary document validated by JSON Schema draft 2020-12.
- Generator: Node.js ESM script. It validates the sample with Ajv, performs referential-integrity checks, and emits generated constants for Kotlin and TypeScript.
- Maven artifact: Kotlin/JVM constants library with coordinate `dev.jorisjonkers:authz-model`.
- TypeScript artifact: package `@jorisjonkers-dev/authz-model` with generated `as const` exports and helper functions.
- CI: npm validation/generation/typecheck plus Gradle Kotlin compile/test, ending in a required job named `Pipeline Complete`.
- Release: release-please workflow with serial Maven publish and GitHub Packages npm publish from the released tag.

Ajv is used because JSON Schema validation is the core contract under test. The generator remains a small local script rather than a runtime service or build plugin, matching the vocabulary-only boundary.

## Scope Boundary

This implementation produces only:

- A shared schema for roles, claims, permissions, groups, and host gates.
- A personal-stack-derived sample vocabulary model.
- A generator skeleton that emits Kotlin and TypeScript constants from the sample.
- CI and release/publish wiring for the generated artifacts.

It does not produce auth services, controllers, filters, token issuance, persistence, OAuth client configuration, redirect URI data, secrets, or permission evaluators.

## Architecture

1. `schema/authz-model.schema.json` defines vocabulary records and shared metadata.
2. `model/personal-stack.sample.json` is the initial sample model. It maps the current personal-stack auth-api role names, service permissions, authority formats, claims, groups, and host-gate aliases.
3. `tools/generator/generate.mjs` loads the schema and model, validates the model, checks cross-record references and duplicate machine values, then writes:
   - `packages/kotlin/src/generated/kotlin/dev/jorisjonkers/authz/model/AuthzVocabulary.kt`
   - `packages/typescript/src/generated/authz-vocabulary.ts`
4. The Kotlin package compiles the generated file into the Maven-facing artifact.
5. The TypeScript package typechecks the generated exports and publishes under `@jorisjonkers-dev`.

Host gates are represented as vocabulary records keyed by alias and required permission. Runtime host parsing remains a consumer responsibility; generated helpers only resolve a provided alias or hostname to a permission key and return null/undefined for unmapped values.

## Project Structure

```text
.github/workflows/
  ci.yml
  release.yml
schema/
  authz-model.schema.json
model/
  personal-stack.sample.json
tools/generator/
  generate.mjs
  validate.mjs
  check-generated.mjs
packages/kotlin/
  build.gradle.kts
  src/generated/kotlin/dev/jorisjonkers/authz/model/AuthzVocabulary.kt
  src/test/kotlin/dev/jorisjonkers/authz/model/AuthzVocabularyTest.kt
packages/typescript/
  package.json
  tsconfig.json
  src/generated/authz-vocabulary.ts
  src/generated/authz-vocabulary.test-d.ts
build.gradle.kts
settings.gradle.kts
package.json
```

## Requirement Mapping

- FR-1: `schema/authz-model.schema.json` defines vocabulary records only; no runtime behavior fields are introduced.
- FR-2: Every record requires `id`, `description`, `namespace`, `owner`, `scope`, and `status`.
- FR-3: `model/personal-stack.sample.json` includes `ADMIN`, `USER`, and `READONLY` role records with `ROLE_<KEY>` authority value formatting.
- FR-4: Claim records cover roles, username identity, preferred username, email, email verification, audience, subject, token type, service authorities, optional groups, and forwarded identity headers.
- FR-5: Permission records include stable keys plus generated `SERVICE_<KEY>` authority values independent of consumer domain entities.
- FR-6: Host-gate records list aliases per permission and generated helpers return no decision for unmapped aliases or hosts.
- FR-7: Group records are separate from roles and permissions and declare emission causes such as `DASHBOARD` permission or `ADMIN` role.
- FR-8: The generator emits Kotlin and TypeScript constants from the same source model.
- FR-9: Generated files contain constants and value-format helpers only.
- FR-10: Maven coordinate `dev.jorisjonkers:authz-model` and npm package `@jorisjonkers-dev/authz-model` keep the project name once and avoid plugin marker coordinates.
- FR-11: The model treats personal-stack as a consumer/reference namespace; no personal-stack deployment release semantics are added.
- FR-12: Schema lifecycle fields support `active`, `deprecated`, `replaced`, and `removed`; deprecated/replaced records can carry replacement metadata.

## Success Criteria Mapping

- SC-1: The sample includes every current `ServicePermission` entry and its host aliases from personal-stack auth-api.
- SC-2: The sample includes every current `Role` entry and generated role authority values.
- SC-3: The schema requires roles, claims, permissions, groups, and host gates.
- SC-4: CI regenerates both ecosystems and checks the checked-in outputs are current.
- SC-5: Artifact names are short and do not use Gradle plugin marker naming.
- SC-6: Release workflows produce versioned Maven/npm packages that consumers can pin.
- SC-7: No evaluator code is generated; consumers import constants and keep authorization decisions local.
- SC-8: Lifecycle and replacement metadata are validated before generation.

## Validation Plan

- `npm run validate`: JSON Schema validation plus referential-integrity checks.
- `npm run generate`: generate Kotlin and TypeScript constants from the sample.
- `npm run check:generated`: regenerate and fail on stale checked-in generated output.
- `npm run typecheck`: TypeScript typecheck for generated constants.
- `./gradlew test`: Kotlin compile and focused constants tests.
- GitHub Actions gates all checks and ends in `Pipeline Complete`.

## Risks and Decisions

- The sample is not a full production migration. It is a reference vocabulary model derived from personal-stack auth-api.
- Host-gate constants expose aliases and lookup helpers, not routing or authorization behavior.
- Generated outputs are committed so CI and consumers can inspect exact vocabulary surfaces without running the generator first.
- Publishing is configured but only tag-triggered; package visibility for new GitHub Packages artifacts must be made public once by the owner.
