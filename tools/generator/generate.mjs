#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateModel } from "./validate.mjs";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const KOTLIN_OUTPUT = "packages/kotlin/src/generated/kotlin/com/extratoast/authz/model/AuthzVocabulary.kt";
const TYPESCRIPT_OUTPUT = "packages/typescript/src/generated/authz-vocabulary.ts";

export async function generate({
  rootDir = ROOT_DIR,
  outputRoot = ROOT_DIR,
  modelPath = path.join(rootDir, "model/personal-stack.sample.json"),
  schemaPath = path.join(rootDir, "schema/authz-model.schema.json")
} = {}) {
  const { model } = await validateModel({ modelPath, schemaPath });
  const outputs = [
    {
      path: KOTLIN_OUTPUT,
      content: renderKotlin(model)
    },
    {
      path: TYPESCRIPT_OUTPUT,
      content: renderTypeScript(model)
    }
  ];

  for (const output of outputs) {
    const target = path.join(outputRoot, output.path);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, output.content, "utf8");
  }

  return outputs;
}

function renderKotlin(model) {
  const aliases = hostAliasPairs(model);
  return `${generatedBanner("//")}
package ${model.artifacts.maven.packageName}

public data class AuthzRoleRecord(
    public val id: String,
    public val key: String,
    public val authorityValue: String,
    public val description: String,
    public val namespace: String,
    public val owner: String,
    public val scope: String,
    public val status: String,
)

public data class AuthzClaimRecord(
    public val id: String,
    public val key: String,
    public val name: String,
    public val channel: String,
    public val valueShape: String,
    public val allowedAuthorityFormats: List<String>,
    public val description: String,
    public val namespace: String,
    public val owner: String,
    public val scope: String,
    public val status: String,
)

public data class AuthzPermissionRecord(
    public val id: String,
    public val key: String,
    public val authorityValue: String,
    public val description: String,
    public val namespace: String,
    public val owner: String,
    public val scope: String,
    public val status: String,
)

public data class AuthzGroupCause(
    public val type: String,
    public val key: String,
)

public data class AuthzGroupRecord(
    public val id: String,
    public val key: String,
    public val value: String,
    public val causes: List<AuthzGroupCause>,
    public val description: String,
    public val namespace: String,
    public val owner: String,
    public val scope: String,
    public val status: String,
)

public data class AuthzHostGateRecord(
    public val id: String,
    public val key: String,
    public val permissionKey: String,
    public val aliases: List<String>,
    public val description: String,
    public val namespace: String,
    public val owner: String,
    public val scope: String,
    public val status: String,
)

public object AuthzVocabulary {
    public const val MODEL_ID: String = ${kotlinString(model.modelId)}
    public const val MODEL_VERSION: String = ${kotlinString(model.version)}
    public const val ROLE_AUTHORITY_PREFIX: String = ${kotlinString(model.authorityFormats.rolePrefix)}
    public const val SERVICE_PERMISSION_AUTHORITY_PREFIX: String = ${kotlinString(model.authorityFormats.servicePermissionPrefix)}
    public const val ROLES_HEADER_SEPARATOR: String = ${kotlinString(model.authorityFormats.rolesHeaderSeparator)}
    public const val UNMAPPED_HOST_BEHAVIOR: String = ${kotlinString(model.unmappedHostBehavior)}

    public fun roleAuthority(key: String): String = ROLE_AUTHORITY_PREFIX + key

    public fun servicePermissionAuthority(key: String): String = SERVICE_PERMISSION_AUTHORITY_PREFIX + key

    public fun permissionKeyForHostAlias(alias: String?): String? {
        val normalized = alias?.trim()?.lowercase().takeUnless { it.isNullOrEmpty() } ?: return null
        return HostGates.ALIAS_TO_PERMISSION_KEY[normalized]
    }

    public fun permissionKeyForHost(host: String?): String? =
        permissionKeyForHostAlias(host?.substringBefore("."))

    public object RoleKeys {
${model.roles.map((role) => `        public const val ${role.key}: String = ${kotlinString(role.key)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.roles.map((role) => role.key).join(", ")})
    }

    public object RoleAuthorities {
${model.roles.map((role) => `        public const val ${role.key}: String = ${kotlinString(role.authorityValue)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.roles.map((role) => role.key).join(", ")})
    }

    public object ClaimNames {
${model.claims.map((claim) => `        public const val ${constantName(claim.key)}: String = ${kotlinString(claim.name)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.claims.map((claim) => constantName(claim.key)).join(", ")})
    }

    public object PermissionKeys {
${model.permissions.map((permission) => `        public const val ${permission.key}: String = ${kotlinString(permission.key)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.permissions.map((permission) => permission.key).join(", ")})
    }

    public object PermissionAuthorities {
${model.permissions.map((permission) => `        public const val ${permission.key}: String = ${kotlinString(permission.authorityValue)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.permissions.map((permission) => permission.key).join(", ")})
    }

    public object GroupValues {
${model.groups.map((group) => `        public const val ${group.key}: String = ${kotlinString(group.value)}`).join("\n")}
        public val ALL: List<String> = listOf(${model.groups.map((group) => group.key).join(", ")})
    }

    public object Roles {
        public val ALL: List<AuthzRoleRecord> = listOf(
${model.roles.map((role) => `            ${renderKotlinRole(role)}`).join(",\n")}
        )
    }

    public object Claims {
        public val ALL: List<AuthzClaimRecord> = listOf(
${model.claims.map((claim) => `            ${renderKotlinClaim(claim)}`).join(",\n")}
        )
    }

    public object Permissions {
        public val ALL: List<AuthzPermissionRecord> = listOf(
${model.permissions.map((permission) => `            ${renderKotlinPermission(permission)}`).join(",\n")}
        )
    }

    public object Groups {
        public val ALL: List<AuthzGroupRecord> = listOf(
${model.groups.map((group) => `            ${renderKotlinGroup(group)}`).join(",\n")}
        )
    }

    public object HostGates {
        public val ALL: List<AuthzHostGateRecord> = listOf(
${model.hostGates.map((hostGate) => `            ${renderKotlinHostGate(hostGate)}`).join(",\n")}
        )
        public val ALIAS_TO_PERMISSION_KEY: Map<String, String> = mapOf(
${aliases.map(([alias, permissionKey]) => `            ${kotlinString(alias)} to PermissionKeys.${permissionKey}`).join(",\n")}
        )
    }
}
`;
}

function renderTypeScript(model) {
  const aliases = hostAliasPairs(model);
  return `${generatedBanner("//")}
export const MODEL_ID = ${tsString(model.modelId)};
export const MODEL_VERSION = ${tsString(model.version)};
export const ROLE_AUTHORITY_PREFIX = ${tsString(model.authorityFormats.rolePrefix)};
export const SERVICE_PERMISSION_AUTHORITY_PREFIX = ${tsString(model.authorityFormats.servicePermissionPrefix)};
export const ROLES_HEADER_SEPARATOR = ${tsString(model.authorityFormats.rolesHeaderSeparator)};
export const UNMAPPED_HOST_BEHAVIOR = ${tsString(model.unmappedHostBehavior)};

export const ROLE_KEYS = [${model.roles.map((role) => tsString(role.key)).join(", ")}] as const;
export type RoleKey = (typeof ROLE_KEYS)[number];

export const RoleKeys = {
${model.roles.map((role) => `  ${role.key}: ${tsString(role.key)}`).join(",\n")}
} as const satisfies Record<string, RoleKey>;

export const RoleAuthorities = {
${model.roles.map((role) => `  ${role.key}: ${tsString(role.authorityValue)}`).join(",\n")}
} as const satisfies Record<RoleKey, string>;

export const CLAIM_KEYS = [${model.claims.map((claim) => tsString(claim.key)).join(", ")}] as const;
export type ClaimKey = (typeof CLAIM_KEYS)[number];

export const ClaimNames = {
${model.claims.map((claim) => `  ${claim.key}: ${tsString(claim.name)}`).join(",\n")}
} as const satisfies Record<ClaimKey, string>;

export const PERMISSION_KEYS = [${model.permissions.map((permission) => tsString(permission.key)).join(", ")}] as const;
export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export const PermissionKeys = {
${model.permissions.map((permission) => `  ${permission.key}: ${tsString(permission.key)}`).join(",\n")}
} as const satisfies Record<string, PermissionKey>;

export const PermissionAuthorities = {
${model.permissions.map((permission) => `  ${permission.key}: ${tsString(permission.authorityValue)}`).join(",\n")}
} as const satisfies Record<PermissionKey, string>;

export const GROUP_KEYS = [${model.groups.map((group) => tsString(group.key)).join(", ")}] as const;
export type GroupKey = (typeof GROUP_KEYS)[number];

export const GroupValues = {
${model.groups.map((group) => `  ${group.key}: ${tsString(group.value)}`).join(",\n")}
} as const satisfies Record<GroupKey, string>;

export interface AuthzRoleRecord {
  readonly id: string;
  readonly key: RoleKey;
  readonly authorityValue: string;
  readonly description: string;
  readonly namespace: string;
  readonly owner: string;
  readonly scope: "shared" | "consumer-specific";
  readonly status: "active" | "deprecated" | "replaced" | "removed";
}

export interface AuthzClaimRecord {
  readonly id: string;
  readonly key: ClaimKey;
  readonly name: string;
  readonly channel: "jwt-claim" | "http-header" | "authority";
  readonly valueShape: string;
  readonly allowedAuthorityFormats: readonly string[];
  readonly description: string;
  readonly namespace: string;
  readonly owner: string;
  readonly scope: "shared" | "consumer-specific";
  readonly status: "active" | "deprecated" | "replaced" | "removed";
}

export interface AuthzPermissionRecord {
  readonly id: string;
  readonly key: PermissionKey;
  readonly authorityValue: string;
  readonly description: string;
  readonly namespace: string;
  readonly owner: string;
  readonly scope: "shared" | "consumer-specific";
  readonly status: "active" | "deprecated" | "replaced" | "removed";
}

export interface AuthzGroupCause {
  readonly type: "role" | "permission";
  readonly key: RoleKey | PermissionKey;
}

export interface AuthzGroupRecord {
  readonly id: string;
  readonly key: GroupKey;
  readonly value: string;
  readonly causes: readonly AuthzGroupCause[];
  readonly description: string;
  readonly namespace: string;
  readonly owner: string;
  readonly scope: "shared" | "consumer-specific";
  readonly status: "active" | "deprecated" | "replaced" | "removed";
}

export interface AuthzHostGateRecord {
  readonly id: string;
  readonly key: PermissionKey;
  readonly permissionKey: PermissionKey;
  readonly aliases: readonly string[];
  readonly description: string;
  readonly namespace: string;
  readonly owner: string;
  readonly scope: "shared" | "consumer-specific";
  readonly status: "active" | "deprecated" | "replaced" | "removed";
}

export const Roles = ${tsValue(model.roles)} as const satisfies readonly AuthzRoleRecord[];
export const Claims = ${tsValue(normalizeClaims(model.claims))} as const satisfies readonly AuthzClaimRecord[];
export const Permissions = ${tsValue(model.permissions)} as const satisfies readonly AuthzPermissionRecord[];
export const Groups = ${tsValue(model.groups)} as const satisfies readonly AuthzGroupRecord[];
export const HostGates = ${tsValue(model.hostGates)} as const satisfies readonly AuthzHostGateRecord[];

export const HostGateAliases = {
${aliases.map(([alias, permissionKey]) => `  ${JSON.stringify(alias)}: ${tsString(permissionKey)}`).join(",\n")}
} as const satisfies Record<string, PermissionKey>;

export function roleAuthority(key: RoleKey | string): string {
  return ROLE_AUTHORITY_PREFIX + key;
}

export function servicePermissionAuthority(key: PermissionKey | string): string {
  return SERVICE_PERMISSION_AUTHORITY_PREFIX + key;
}

export function permissionKeyForHostAlias(alias: string | null | undefined): PermissionKey | undefined {
  const normalized = alias?.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  return HostGateAliases[normalized as keyof typeof HostGateAliases];
}

export function permissionKeyForHost(host: string | null | undefined): PermissionKey | undefined {
  return permissionKeyForHostAlias(host?.split(".")[0]);
}
`;
}

function renderKotlinRole(role) {
  return `AuthzRoleRecord(id = ${kotlinString(role.id)}, key = ${kotlinString(role.key)}, authorityValue = ${kotlinString(role.authorityValue)}, description = ${kotlinString(role.description)}, namespace = ${kotlinString(role.namespace)}, owner = ${kotlinString(role.owner)}, scope = ${kotlinString(role.scope)}, status = ${kotlinString(role.status)})`;
}

function renderKotlinClaim(claim) {
  const allowed = claim.allowedAuthorityFormats ?? [];
  return `AuthzClaimRecord(id = ${kotlinString(claim.id)}, key = ${kotlinString(claim.key)}, name = ${kotlinString(claim.name)}, channel = ${kotlinString(claim.channel)}, valueShape = ${kotlinString(claim.valueShape)}, allowedAuthorityFormats = listOf(${allowed.map(kotlinString).join(", ")}), description = ${kotlinString(claim.description)}, namespace = ${kotlinString(claim.namespace)}, owner = ${kotlinString(claim.owner)}, scope = ${kotlinString(claim.scope)}, status = ${kotlinString(claim.status)})`;
}

function renderKotlinPermission(permission) {
  return `AuthzPermissionRecord(id = ${kotlinString(permission.id)}, key = ${kotlinString(permission.key)}, authorityValue = ${kotlinString(permission.authorityValue)}, description = ${kotlinString(permission.description)}, namespace = ${kotlinString(permission.namespace)}, owner = ${kotlinString(permission.owner)}, scope = ${kotlinString(permission.scope)}, status = ${kotlinString(permission.status)})`;
}

function renderKotlinGroup(group) {
  const causes = group.causes.map((cause) => `AuthzGroupCause(type = ${kotlinString(cause.type)}, key = ${kotlinString(cause.key)})`).join(", ");
  return `AuthzGroupRecord(id = ${kotlinString(group.id)}, key = ${kotlinString(group.key)}, value = ${kotlinString(group.value)}, causes = listOf(${causes}), description = ${kotlinString(group.description)}, namespace = ${kotlinString(group.namespace)}, owner = ${kotlinString(group.owner)}, scope = ${kotlinString(group.scope)}, status = ${kotlinString(group.status)})`;
}

function renderKotlinHostGate(hostGate) {
  return `AuthzHostGateRecord(id = ${kotlinString(hostGate.id)}, key = ${kotlinString(hostGate.key)}, permissionKey = ${kotlinString(hostGate.permissionKey)}, aliases = listOf(${hostGate.aliases.map(kotlinString).join(", ")}), description = ${kotlinString(hostGate.description)}, namespace = ${kotlinString(hostGate.namespace)}, owner = ${kotlinString(hostGate.owner)}, scope = ${kotlinString(hostGate.scope)}, status = ${kotlinString(hostGate.status)})`;
}

function hostAliasPairs(model) {
  return model.hostGates.flatMap((hostGate) => hostGate.aliases.map((alias) => [alias, hostGate.permissionKey]));
}

function normalizeClaims(claims) {
  return claims.map((claim) => ({
    ...claim,
    allowedAuthorityFormats: claim.allowedAuthorityFormats ?? []
  }));
}

function constantName(key) {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();
}

function kotlinString(value) {
  return JSON.stringify(value);
}

function tsString(value) {
  return JSON.stringify(value);
}

function tsValue(value) {
  return JSON.stringify(value, null, 2);
}

function generatedBanner(prefix) {
  return `${prefix} Generated from model/personal-stack.sample.json. Do not edit manually.\n`;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--output-root") {
      options.outputRoot = path.resolve(argv[++index]);
    } else if (arg === "--model") {
      options.modelPath = path.resolve(argv[++index]);
    } else if (arg === "--schema") {
      options.schemaPath = path.resolve(argv[++index]);
    }
  }
  return options;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  generate(parseArgs(process.argv.slice(2)))
    .then((outputs) => {
      for (const output of outputs) {
        console.log(`Wrote ${output.path}`);
      }
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
