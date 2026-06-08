// Generated from model/personal-stack.sample.json. Do not edit manually.

export const MODEL_ID = "personal-stack.authz";
export const MODEL_VERSION = "0.1.0";
export const ROLE_AUTHORITY_PREFIX = "ROLE_";
export const SERVICE_PERMISSION_AUTHORITY_PREFIX = "SERVICE_";
export const ROLES_HEADER_SEPARATOR = ",";
export const UNMAPPED_HOST_BEHAVIOR = "no-vocabulary-decision";

export const ROLE_KEYS = ["ADMIN", "USER", "READONLY"] as const;
export type RoleKey = (typeof ROLE_KEYS)[number];

export const RoleKeys = {
  ADMIN: "ADMIN",
  USER: "USER",
  READONLY: "READONLY"
} as const satisfies Record<string, RoleKey>;

export const RoleAuthorities = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
  READONLY: "ROLE_READONLY"
} as const satisfies Record<RoleKey, string>;

export const CLAIM_KEYS = ["roles", "username", "preferredUsername", "email", "emailVerified", "audience", "subject", "tokenType", "groups", "forwardedUserId", "forwardedUserRoles", "forwardedHost"] as const;
export type ClaimKey = (typeof CLAIM_KEYS)[number];

export const ClaimNames = {
  roles: "roles",
  username: "username",
  preferredUsername: "preferred_username",
  email: "email",
  emailVerified: "email_verified",
  audience: "aud",
  subject: "sub",
  tokenType: "type",
  groups: "groups",
  forwardedUserId: "X-User-Id",
  forwardedUserRoles: "X-User-Roles",
  forwardedHost: "X-Forwarded-Host"
} as const satisfies Record<ClaimKey, string>;

export const PERMISSION_KEYS = ["VAULT", "MAIL", "N8N", "GRAFANA", "DASHBOARD", "TRAEFIK", "RABBITMQ", "ASSISTANT", "STATUS", "JELLYFIN", "JELLYSEERR", "SONARR", "RADARR", "BAZARR", "PROWLARR", "QBITTORRENT", "IMMICH", "ADGUARD", "WOLF", "KNOWLEDGE_API"] as const;
export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export const PermissionKeys = {
  VAULT: "VAULT",
  MAIL: "MAIL",
  N8N: "N8N",
  GRAFANA: "GRAFANA",
  DASHBOARD: "DASHBOARD",
  TRAEFIK: "TRAEFIK",
  RABBITMQ: "RABBITMQ",
  ASSISTANT: "ASSISTANT",
  STATUS: "STATUS",
  JELLYFIN: "JELLYFIN",
  JELLYSEERR: "JELLYSEERR",
  SONARR: "SONARR",
  RADARR: "RADARR",
  BAZARR: "BAZARR",
  PROWLARR: "PROWLARR",
  QBITTORRENT: "QBITTORRENT",
  IMMICH: "IMMICH",
  ADGUARD: "ADGUARD",
  WOLF: "WOLF",
  KNOWLEDGE_API: "KNOWLEDGE_API"
} as const satisfies Record<string, PermissionKey>;

export const PermissionAuthorities = {
  VAULT: "SERVICE_VAULT",
  MAIL: "SERVICE_MAIL",
  N8N: "SERVICE_N8N",
  GRAFANA: "SERVICE_GRAFANA",
  DASHBOARD: "SERVICE_DASHBOARD",
  TRAEFIK: "SERVICE_TRAEFIK",
  RABBITMQ: "SERVICE_RABBITMQ",
  ASSISTANT: "SERVICE_ASSISTANT",
  STATUS: "SERVICE_STATUS",
  JELLYFIN: "SERVICE_JELLYFIN",
  JELLYSEERR: "SERVICE_JELLYSEERR",
  SONARR: "SERVICE_SONARR",
  RADARR: "SERVICE_RADARR",
  BAZARR: "SERVICE_BAZARR",
  PROWLARR: "SERVICE_PROWLARR",
  QBITTORRENT: "SERVICE_QBITTORRENT",
  IMMICH: "SERVICE_IMMICH",
  ADGUARD: "SERVICE_ADGUARD",
  WOLF: "SERVICE_WOLF",
  KNOWLEDGE_API: "SERVICE_KNOWLEDGE_API"
} as const satisfies Record<PermissionKey, string>;

export const GROUP_KEYS = ["K8S_ADMIN"] as const;
export type GroupKey = (typeof GROUP_KEYS)[number];

export const GroupValues = {
  K8S_ADMIN: "k8s-admin"
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

export const Roles = [
  {
    "id": "shared.role.admin",
    "key": "ADMIN",
    "authorityValue": "ROLE_ADMIN",
    "description": "Administrative role authority surfaced to consumers.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active"
  },
  {
    "id": "shared.role.user",
    "key": "USER",
    "authorityValue": "ROLE_USER",
    "description": "Standard user role authority surfaced to consumers.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active"
  },
  {
    "id": "shared.role.readonly",
    "key": "READONLY",
    "authorityValue": "ROLE_READONLY",
    "description": "Read-only role authority surfaced to consumers.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active"
  }
] as const satisfies readonly AuthzRoleRecord[];
export const Claims = [
  {
    "id": "shared.claim.roles",
    "key": "roles",
    "name": "roles",
    "channel": "jwt-claim",
    "valueShape": "authority-array",
    "allowedAuthorityFormats": [
      "role",
      "service-permission"
    ],
    "description": "Token claim carrying role and service-permission authorities.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active"
  },
  {
    "id": "shared.claim.username",
    "key": "username",
    "name": "username",
    "channel": "jwt-claim",
    "valueShape": "string",
    "description": "Canonical username identity claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.preferred-username",
    "key": "preferredUsername",
    "name": "preferred_username",
    "channel": "jwt-claim",
    "valueShape": "string",
    "description": "OpenID Connect preferred username claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.email",
    "key": "email",
    "name": "email",
    "channel": "jwt-claim",
    "valueShape": "string",
    "description": "Email identity claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.email-verified",
    "key": "emailVerified",
    "name": "email_verified",
    "channel": "jwt-claim",
    "valueShape": "boolean",
    "description": "Email verification state claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.audience",
    "key": "audience",
    "name": "aud",
    "channel": "jwt-claim",
    "valueShape": "string-array",
    "description": "Audience claim for token consumers.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.subject",
    "key": "subject",
    "name": "sub",
    "channel": "jwt-claim",
    "valueShape": "string",
    "description": "Subject identifier claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.token-type",
    "key": "tokenType",
    "name": "type",
    "channel": "jwt-claim",
    "valueShape": "token-type",
    "description": "Token type discriminator claim used for non-access-token flows.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.claim.groups",
    "key": "groups",
    "name": "groups",
    "channel": "jwt-claim",
    "valueShape": "string-array",
    "description": "Optional external group membership claim.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.header.forwarded-user-id",
    "key": "forwardedUserId",
    "name": "X-User-Id",
    "channel": "http-header",
    "valueShape": "string",
    "description": "Forwarded identity header carrying the authenticated user identifier.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  },
  {
    "id": "shared.header.forwarded-user-roles",
    "key": "forwardedUserRoles",
    "name": "X-User-Roles",
    "channel": "http-header",
    "valueShape": "comma-separated-authorities",
    "allowedAuthorityFormats": [
      "role",
      "service-permission"
    ],
    "description": "Forwarded identity header carrying comma-separated authorities.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active"
  },
  {
    "id": "shared.header.forwarded-host",
    "key": "forwardedHost",
    "name": "X-Forwarded-Host",
    "channel": "http-header",
    "valueShape": "hostname",
    "description": "Forwarded host header used by consumers to choose a host-gate vocabulary record.",
    "namespace": "shared",
    "owner": "authz-model",
    "scope": "shared",
    "status": "active",
    "allowedAuthorityFormats": []
  }
] as const satisfies readonly AuthzClaimRecord[];
export const Permissions = [
  {
    "id": "personal-stack.permission.vault",
    "key": "VAULT",
    "authorityValue": "SERVICE_VAULT",
    "description": "Access vocabulary entry for the Vault service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.mail",
    "key": "MAIL",
    "authorityValue": "SERVICE_MAIL",
    "description": "Access vocabulary entry for the mail administration service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.n8n",
    "key": "N8N",
    "authorityValue": "SERVICE_N8N",
    "description": "Access vocabulary entry for the n8n service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.grafana",
    "key": "GRAFANA",
    "authorityValue": "SERVICE_GRAFANA",
    "description": "Access vocabulary entry for the Grafana service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.dashboard",
    "key": "DASHBOARD",
    "authorityValue": "SERVICE_DASHBOARD",
    "description": "Access vocabulary entry for the Kubernetes dashboard service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.traefik",
    "key": "TRAEFIK",
    "authorityValue": "SERVICE_TRAEFIK",
    "description": "Access vocabulary entry for the Traefik service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.rabbitmq",
    "key": "RABBITMQ",
    "authorityValue": "SERVICE_RABBITMQ",
    "description": "Access vocabulary entry for the RabbitMQ service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.assistant",
    "key": "ASSISTANT",
    "authorityValue": "SERVICE_ASSISTANT",
    "description": "Access vocabulary entry for the assistant service hosts.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.status",
    "key": "STATUS",
    "authorityValue": "SERVICE_STATUS",
    "description": "Access vocabulary entry for the status service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.jellyfin",
    "key": "JELLYFIN",
    "authorityValue": "SERVICE_JELLYFIN",
    "description": "Access vocabulary entry for the Jellyfin media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.jellyseerr",
    "key": "JELLYSEERR",
    "authorityValue": "SERVICE_JELLYSEERR",
    "description": "Access vocabulary entry for the Jellyseerr media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.sonarr",
    "key": "SONARR",
    "authorityValue": "SERVICE_SONARR",
    "description": "Access vocabulary entry for the Sonarr media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.radarr",
    "key": "RADARR",
    "authorityValue": "SERVICE_RADARR",
    "description": "Access vocabulary entry for the Radarr media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.bazarr",
    "key": "BAZARR",
    "authorityValue": "SERVICE_BAZARR",
    "description": "Access vocabulary entry for the Bazarr media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.prowlarr",
    "key": "PROWLARR",
    "authorityValue": "SERVICE_PROWLARR",
    "description": "Access vocabulary entry for the Prowlarr media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.qbittorrent",
    "key": "QBITTORRENT",
    "authorityValue": "SERVICE_QBITTORRENT",
    "description": "Access vocabulary entry for the qBittorrent media service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.immich",
    "key": "IMMICH",
    "authorityValue": "SERVICE_IMMICH",
    "description": "Access vocabulary entry for the Immich photo service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.adguard",
    "key": "ADGUARD",
    "authorityValue": "SERVICE_ADGUARD",
    "description": "Access vocabulary entry for the AdGuard Home service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.wolf",
    "key": "WOLF",
    "authorityValue": "SERVICE_WOLF",
    "description": "Access vocabulary entry for the WolfManager service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.permission.knowledge-api",
    "key": "KNOWLEDGE_API",
    "authorityValue": "SERVICE_KNOWLEDGE_API",
    "description": "Access vocabulary entry for the knowledge API service.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  }
] as const satisfies readonly AuthzPermissionRecord[];
export const Groups = [
  {
    "id": "personal-stack.group.k8s-admin",
    "key": "K8S_ADMIN",
    "value": "k8s-admin",
    "causes": [
      {
        "type": "role",
        "key": "ADMIN"
      },
      {
        "type": "permission",
        "key": "DASHBOARD"
      }
    ],
    "description": "External group value emitted for Kubernetes dashboard access.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  }
] as const satisfies readonly AuthzGroupRecord[];
export const HostGates = [
  {
    "id": "personal-stack.host-gate.vault",
    "key": "VAULT",
    "permissionKey": "VAULT",
    "aliases": [
      "vault"
    ],
    "description": "Host aliases requiring the Vault service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.mail",
    "key": "MAIL",
    "permissionKey": "MAIL",
    "aliases": [
      "stalwart"
    ],
    "description": "Host aliases requiring the mail service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.n8n",
    "key": "N8N",
    "permissionKey": "N8N",
    "aliases": [
      "n8n"
    ],
    "description": "Host aliases requiring the n8n service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.grafana",
    "key": "GRAFANA",
    "permissionKey": "GRAFANA",
    "aliases": [
      "grafana"
    ],
    "description": "Host aliases requiring the Grafana service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.dashboard",
    "key": "DASHBOARD",
    "permissionKey": "DASHBOARD",
    "aliases": [
      "dashboard"
    ],
    "description": "Host aliases requiring the dashboard service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.traefik",
    "key": "TRAEFIK",
    "permissionKey": "TRAEFIK",
    "aliases": [
      "traefik"
    ],
    "description": "Host aliases requiring the Traefik service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.rabbitmq",
    "key": "RABBITMQ",
    "permissionKey": "RABBITMQ",
    "aliases": [
      "rabbitmq"
    ],
    "description": "Host aliases requiring the RabbitMQ service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.assistant",
    "key": "ASSISTANT",
    "permissionKey": "ASSISTANT",
    "aliases": [
      "assistant",
      "assistant-ws"
    ],
    "description": "Host aliases requiring the assistant service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.status",
    "key": "STATUS",
    "permissionKey": "STATUS",
    "aliases": [
      "status"
    ],
    "description": "Host aliases requiring the status service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.jellyfin",
    "key": "JELLYFIN",
    "permissionKey": "JELLYFIN",
    "aliases": [
      "jellyfin"
    ],
    "description": "Host aliases requiring the Jellyfin service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.jellyseerr",
    "key": "JELLYSEERR",
    "permissionKey": "JELLYSEERR",
    "aliases": [
      "jellyseerr"
    ],
    "description": "Host aliases requiring the Jellyseerr service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.sonarr",
    "key": "SONARR",
    "permissionKey": "SONARR",
    "aliases": [
      "sonarr"
    ],
    "description": "Host aliases requiring the Sonarr service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.radarr",
    "key": "RADARR",
    "permissionKey": "RADARR",
    "aliases": [
      "radarr"
    ],
    "description": "Host aliases requiring the Radarr service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.bazarr",
    "key": "BAZARR",
    "permissionKey": "BAZARR",
    "aliases": [
      "bazarr"
    ],
    "description": "Host aliases requiring the Bazarr service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.prowlarr",
    "key": "PROWLARR",
    "permissionKey": "PROWLARR",
    "aliases": [
      "prowlarr"
    ],
    "description": "Host aliases requiring the Prowlarr service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.qbittorrent",
    "key": "QBITTORRENT",
    "permissionKey": "QBITTORRENT",
    "aliases": [
      "qbittorrent"
    ],
    "description": "Host aliases requiring the qBittorrent service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.immich",
    "key": "IMMICH",
    "permissionKey": "IMMICH",
    "aliases": [
      "immich"
    ],
    "description": "Host aliases requiring the Immich service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.adguard",
    "key": "ADGUARD",
    "permissionKey": "ADGUARD",
    "aliases": [
      "adguard"
    ],
    "description": "Host aliases requiring the AdGuard service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.wolf",
    "key": "WOLF",
    "permissionKey": "WOLF",
    "aliases": [
      "wolf"
    ],
    "description": "Host aliases requiring the Wolf service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  },
  {
    "id": "personal-stack.host-gate.knowledge-api",
    "key": "KNOWLEDGE_API",
    "permissionKey": "KNOWLEDGE_API",
    "aliases": [
      "kb"
    ],
    "description": "Host aliases requiring the knowledge API service permission.",
    "namespace": "personal-stack",
    "owner": "personal-stack/auth-api",
    "scope": "consumer-specific",
    "status": "active"
  }
] as const satisfies readonly AuthzHostGateRecord[];

export const HostGateAliases = {
  "vault": "VAULT",
  "stalwart": "MAIL",
  "n8n": "N8N",
  "grafana": "GRAFANA",
  "dashboard": "DASHBOARD",
  "traefik": "TRAEFIK",
  "rabbitmq": "RABBITMQ",
  "assistant": "ASSISTANT",
  "assistant-ws": "ASSISTANT",
  "status": "STATUS",
  "jellyfin": "JELLYFIN",
  "jellyseerr": "JELLYSEERR",
  "sonarr": "SONARR",
  "radarr": "RADARR",
  "bazarr": "BAZARR",
  "prowlarr": "PROWLARR",
  "qbittorrent": "QBITTORRENT",
  "immich": "IMMICH",
  "adguard": "ADGUARD",
  "wolf": "WOLF",
  "kb": "KNOWLEDGE_API"
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
