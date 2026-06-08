# Shared Authorization Vocabulary Design

## Overview

ExtraToast/authz-model defines a design-only specification for a shared authorization vocabulary consumed as a versioned artifact by repositories such as personal-stack and website. The vocabulary aligns common role, claim, permission, group, and host-gate names without moving authentication services or site-specific authorization behavior into this repository.

The current reference is the personal-stack auth-api domain, especially `ServicePermission`, `Role`, and `AuthVerificationController`. That reference shows service permissions represented as stable names, roles represented as token/header authorities, optional group claims, and host gates that map incoming hosts to required service permissions. This specification captures the vocabulary contract those consumers can share while preserving each site's own domain model, deployment lifecycle, and authorization evaluators.

## User Scenarios

1. A personal-stack auth-api maintainer needs a canonical vocabulary for roles, service permissions, claim names, and host gates so generated constants match the authorization data already emitted by the auth service.

2. A website maintainer needs shared role and claim constants without importing personal-stack service names into website domain permission evaluators.

3. A platform maintainer needs Maven and TypeScript artifacts that can be pinned and upgraded through Renovate while personal-stack continues to auto-deploy continuously and is not itself versioned.

4. A reviewer needs a clear boundary proving this repository contains vocabulary definitions only, with no auth server, OAuth client registration, redirect URI, or permission evaluator behavior merged from consumer repositories.

## Functional Requirements (FR-n)

- FR-1: The specification shall define a shared schema for roles, claims, permissions, groups, and host gates as vocabulary records, not runtime authorization behavior.

- FR-2: Each vocabulary record shall have a stable machine identifier, human-readable description, owning namespace, lifecycle status, and enough metadata to distinguish shared entries from consumer-specific entries.

- FR-3: Role vocabulary shall cover the current personal-stack role names `ADMIN`, `USER`, and `READONLY`, and shall define the claim/header value format used when roles are surfaced to consumers.

- FR-4: Claim vocabulary shall define the canonical names and value shapes for role claims, username-related identity claims, service-permission authorities, optional group claims, and forwarded identity headers that consumers may already exchange.

- FR-5: Permission vocabulary shall represent service access permissions independently from any one site's domain entities, including a stable permission key and the authority value format equivalent to the current `SERVICE_<PERMISSION>` pattern.

- FR-6: Host-gate vocabulary shall represent host or subdomain aliases that require a permission, including support for multiple aliases per permission and unmapped hosts that require no vocabulary decision.

- FR-7: Group vocabulary shall represent externally consumed group names separately from roles and permissions, including the relationship that a permission or role may cause a group value to be emitted by a consumer.

- FR-8: The design shall require generated constants for Maven and TypeScript consumers, derived from the same vocabulary source and covering roles, claims, permissions, groups, host gates, and value-format helpers.

- FR-9: Generated constants shall be vocabulary-only artifacts; they shall not include controllers, filters, token issuance, persistence, OAuth client registration, redirect URI data, secrets, or domain permission evaluators.

- FR-10: Distribution metadata shall use short coordinates for the Maven and TypeScript artifacts, avoid doubled plugin-marker names, and be suitable for Renovate-pinned consumer upgrades.

- FR-11: Consumer adoption shall not require personal-stack to become a versioned application artifact; personal-stack shall remain continuously auto-deployed while consuming pinned versions of authz-model artifacts.

- FR-12: The vocabulary shall support change review for additions, deprecations, replacements, and removals so consumers can detect renamed or removed entries before runtime data becomes unreadable.

## Success Criteria (SC-n, measurable)

- SC-1: A requirements review can map 100% of current personal-stack `ServicePermission` entries to permission vocabulary records and host-gate aliases without adding personal-stack-specific evaluator behavior.

- SC-2: A requirements review can map 100% of current personal-stack `Role` entries to role vocabulary records and role claim/header value formats.

- SC-3: The schema description covers all five required entity types: roles, claims, permissions, groups, and host gates.

- SC-4: Generated Maven and TypeScript constants expose the same vocabulary identifiers and value-format constants from one versioned release, with no extra consumer-only identifiers in one ecosystem but not the other.

- SC-5: The artifact coordinate and package names contain the project name once, do not require a `.gradle.plugin` marker dependency for consumers, and are short enough to be recognizable in dependency files.

- SC-6: A Renovate upgrade PR in a consuming repository can change only the authz-model version pin and generated import references, with no auth service configuration, OAuth client registration, or redirect URI changes.

- SC-7: A consumer can keep a site-specific permission evaluator outside this repository while still using shared constants for any overlapping roles, claims, permissions, groups, or host-gate names.

- SC-8: The vocabulary review process identifies removed or renamed permissions before release and documents the replacement or deprecation state for each affected record.

## Assumptions

- The shared artifact represents vocabulary and generated constants only; consumer repositories continue to own enforcement, storage, token issuance, and deployment.

- personal-stack is a consumer and reference source, not the package whose release number defines this repository.

- website may consume shared constants where useful, but website domain permission evaluators remain local to website.

- Maven and TypeScript are the required consumer ecosystems for the initial design.

- Host gates are vocabulary records that describe known host-to-permission mappings; runtime host parsing and request authorization remain consumer responsibilities.

## Edge Cases

- A host alias is unknown or blank; the vocabulary must allow consumers to treat it as unmapped without inventing a permission.

- A permission has multiple host aliases; all aliases must point to one stable permission key.

- A permission is deprecated or removed while persisted consumer data still contains the old value; the vocabulary must expose lifecycle status so consumers can migrate or ignore obsolete values deliberately.

- A website domain permission has the same display label as a personal-stack service permission; namespace and ownership metadata must prevent accidental merging.

- A group claim is relevant only for one consuming client or deployment; the group remains vocabulary metadata and does not create an OAuth client registration in this repository.

- Case or separator differences appear across Kotlin, TypeScript, token claims, or headers; generated constants must preserve canonical values and avoid consumer-local spelling drift.

## Key Entities

- Vocabulary Schema: The canonical contract that lists supported authorization vocabulary records and the metadata required to generate constants.

- Role: A named coarse-grained authorization identity, such as `ADMIN`, `USER`, or `READONLY`, with a defined claim/header value format.

- Claim: A token or header field name and its expected value shape, such as roles, username identity, service authority values, or groups.

- Permission: A stable service-access vocabulary entry with a generated constant and authority value format.

- Group: An externally consumed group name that may be emitted by a consumer when local authorization state qualifies.

- Host Gate: A host or subdomain alias mapped to a required permission key for consumer-owned forward-auth or routing checks.

- Generated Constants Artifact: A Maven or TypeScript package that exposes vocabulary constants generated from the same source definition.

- Consumer: A repository such as personal-stack or website that imports the versioned constants while keeping its own auth services and domain authorization behavior.

## Out of Scope

- Implementing auth services, authorization servers, login flows, token issuance, session verification, or forward-auth endpoints.

- Merging OAuth client registrations, client secrets, redirect URIs, scopes, or client-specific consent configuration.

- Moving domain permission evaluators from website or personal-stack into this repository.

- Defining persistence tables, migrations, user-management APIs, or service-permission assignment workflows.

- Embedding one site's domain permissions into another site's model.

- Changing personal-stack deployment semantics or requiring personal-stack application releases.

- Publishing, pushing, or committing artifacts from this specification task.
