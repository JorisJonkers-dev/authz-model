// Generated from model/personal-stack.sample.json. Do not edit manually.

package dev.jorisjonkers.authz.model

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
    public const val MODEL_ID: String = "personal-stack.authz"
    public const val MODEL_VERSION: String = "0.1.0"
    public const val ROLE_AUTHORITY_PREFIX: String = "ROLE_"
    public const val SERVICE_PERMISSION_AUTHORITY_PREFIX: String = "SERVICE_"
    public const val ROLES_HEADER_SEPARATOR: String = ","
    public const val UNMAPPED_HOST_BEHAVIOR: String = "no-vocabulary-decision"

    public fun roleAuthority(key: String): String = ROLE_AUTHORITY_PREFIX + key

    public fun servicePermissionAuthority(key: String): String = SERVICE_PERMISSION_AUTHORITY_PREFIX + key

    public fun permissionKeyForHostAlias(alias: String?): String? {
        val normalized = alias?.trim()?.lowercase().takeUnless { it.isNullOrEmpty() } ?: return null
        return HostGates.ALIAS_TO_PERMISSION_KEY[normalized]
    }

    public fun permissionKeyForHost(host: String?): String? = permissionKeyForHostAlias(host?.substringBefore("."))

    public object RoleKeys {
        public const val ADMIN: String = "ADMIN"
        public const val USER: String = "USER"
        public const val READONLY: String = "READONLY"
        public val ALL: List<String> =
            listOf(
                ADMIN,
                USER,
                READONLY,
            )
    }

    public object RoleAuthorities {
        public const val ADMIN: String = "ROLE_ADMIN"
        public const val USER: String = "ROLE_USER"
        public const val READONLY: String = "ROLE_READONLY"
        public val ALL: List<String> =
            listOf(
                ADMIN,
                USER,
                READONLY,
            )
    }

    public object ClaimNames {
        public const val ROLES: String = "roles"
        public const val USERNAME: String = "username"
        public const val PREFERRED_USERNAME: String = "preferred_username"
        public const val EMAIL: String = "email"
        public const val EMAIL_VERIFIED: String = "email_verified"
        public const val AUDIENCE: String = "aud"
        public const val SUBJECT: String = "sub"
        public const val TOKEN_TYPE: String = "type"
        public const val GROUPS: String = "groups"
        public const val FORWARDED_USER_ID: String = "X-User-Id"
        public const val FORWARDED_USER_ROLES: String = "X-User-Roles"
        public const val FORWARDED_HOST: String = "X-Forwarded-Host"
        public val ALL: List<String> =
            listOf(
                ROLES,
                USERNAME,
                PREFERRED_USERNAME,
                EMAIL,
                EMAIL_VERIFIED,
                AUDIENCE,
                SUBJECT,
                TOKEN_TYPE,
                GROUPS,
                FORWARDED_USER_ID,
                FORWARDED_USER_ROLES,
                FORWARDED_HOST,
            )
    }

    public object PermissionKeys {
        public const val VAULT: String = "VAULT"
        public const val MAIL: String = "MAIL"
        public const val N8N: String = "N8N"
        public const val GRAFANA: String = "GRAFANA"
        public const val DASHBOARD: String = "DASHBOARD"
        public const val TRAEFIK: String = "TRAEFIK"
        public const val RABBITMQ: String = "RABBITMQ"
        public const val ASSISTANT: String = "ASSISTANT"
        public const val STATUS: String = "STATUS"
        public const val JELLYFIN: String = "JELLYFIN"
        public const val JELLYSEERR: String = "JELLYSEERR"
        public const val SONARR: String = "SONARR"
        public const val RADARR: String = "RADARR"
        public const val BAZARR: String = "BAZARR"
        public const val PROWLARR: String = "PROWLARR"
        public const val QBITTORRENT: String = "QBITTORRENT"
        public const val IMMICH: String = "IMMICH"
        public const val ADGUARD: String = "ADGUARD"
        public const val WOLF: String = "WOLF"
        public const val KNOWLEDGE_API: String = "KNOWLEDGE_API"
        public val ALL: List<String> =
            listOf(
                VAULT,
                MAIL,
                N8N,
                GRAFANA,
                DASHBOARD,
                TRAEFIK,
                RABBITMQ,
                ASSISTANT,
                STATUS,
                JELLYFIN,
                JELLYSEERR,
                SONARR,
                RADARR,
                BAZARR,
                PROWLARR,
                QBITTORRENT,
                IMMICH,
                ADGUARD,
                WOLF,
                KNOWLEDGE_API,
            )
    }

    public object PermissionAuthorities {
        public const val VAULT: String = "SERVICE_VAULT"
        public const val MAIL: String = "SERVICE_MAIL"
        public const val N8N: String = "SERVICE_N8N"
        public const val GRAFANA: String = "SERVICE_GRAFANA"
        public const val DASHBOARD: String = "SERVICE_DASHBOARD"
        public const val TRAEFIK: String = "SERVICE_TRAEFIK"
        public const val RABBITMQ: String = "SERVICE_RABBITMQ"
        public const val ASSISTANT: String = "SERVICE_ASSISTANT"
        public const val STATUS: String = "SERVICE_STATUS"
        public const val JELLYFIN: String = "SERVICE_JELLYFIN"
        public const val JELLYSEERR: String = "SERVICE_JELLYSEERR"
        public const val SONARR: String = "SERVICE_SONARR"
        public const val RADARR: String = "SERVICE_RADARR"
        public const val BAZARR: String = "SERVICE_BAZARR"
        public const val PROWLARR: String = "SERVICE_PROWLARR"
        public const val QBITTORRENT: String = "SERVICE_QBITTORRENT"
        public const val IMMICH: String = "SERVICE_IMMICH"
        public const val ADGUARD: String = "SERVICE_ADGUARD"
        public const val WOLF: String = "SERVICE_WOLF"
        public const val KNOWLEDGE_API: String = "SERVICE_KNOWLEDGE_API"
        public val ALL: List<String> =
            listOf(
                VAULT,
                MAIL,
                N8N,
                GRAFANA,
                DASHBOARD,
                TRAEFIK,
                RABBITMQ,
                ASSISTANT,
                STATUS,
                JELLYFIN,
                JELLYSEERR,
                SONARR,
                RADARR,
                BAZARR,
                PROWLARR,
                QBITTORRENT,
                IMMICH,
                ADGUARD,
                WOLF,
                KNOWLEDGE_API,
            )
    }

    public object GroupValues {
        public const val K8S_ADMIN: String = "k8s-admin"
        public val ALL: List<String> =
            listOf(
                K8S_ADMIN,
            )
    }

    public object Roles {
        public val ALL: List<AuthzRoleRecord> =
            listOf(
                AuthzRoleRecord(
                    id = "shared.role.admin",
                    key = "ADMIN",
                    authorityValue = "ROLE_ADMIN",
                    description = "Administrative role authority surfaced to consumers.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzRoleRecord(
                    id = "shared.role.user",
                    key = "USER",
                    authorityValue = "ROLE_USER",
                    description = "Standard user role authority surfaced to consumers.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzRoleRecord(
                    id = "shared.role.readonly",
                    key = "READONLY",
                    authorityValue = "ROLE_READONLY",
                    description = "Read-only role authority surfaced to consumers.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
            )
    }

    public object Claims {
        public val ALL: List<AuthzClaimRecord> =
            listOf(
                AuthzClaimRecord(
                    id = "shared.claim.roles",
                    key = "roles",
                    name = "roles",
                    channel = "jwt-claim",
                    valueShape = "authority-array",
                    allowedAuthorityFormats = listOf("role", "service-permission"),
                    description = "Token claim carrying role and service-permission authorities.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.username",
                    key = "username",
                    name = "username",
                    channel = "jwt-claim",
                    valueShape = "string",
                    allowedAuthorityFormats = listOf(),
                    description = "Canonical username identity claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.preferred-username",
                    key = "preferredUsername",
                    name = "preferred_username",
                    channel = "jwt-claim",
                    valueShape = "string",
                    allowedAuthorityFormats = listOf(),
                    description = "OpenID Connect preferred username claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.email",
                    key = "email",
                    name = "email",
                    channel = "jwt-claim",
                    valueShape = "string",
                    allowedAuthorityFormats = listOf(),
                    description = "Email identity claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.email-verified",
                    key = "emailVerified",
                    name = "email_verified",
                    channel = "jwt-claim",
                    valueShape = "boolean",
                    allowedAuthorityFormats = listOf(),
                    description = "Email verification state claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.audience",
                    key = "audience",
                    name = "aud",
                    channel = "jwt-claim",
                    valueShape = "string-array",
                    allowedAuthorityFormats = listOf(),
                    description = "Audience claim for token consumers.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.subject",
                    key = "subject",
                    name = "sub",
                    channel = "jwt-claim",
                    valueShape = "string",
                    allowedAuthorityFormats = listOf(),
                    description = "Subject identifier claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.token-type",
                    key = "tokenType",
                    name = "type",
                    channel = "jwt-claim",
                    valueShape = "token-type",
                    allowedAuthorityFormats = listOf(),
                    description = "Token type discriminator claim used for non-access-token flows.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.claim.groups",
                    key = "groups",
                    name = "groups",
                    channel = "jwt-claim",
                    valueShape = "string-array",
                    allowedAuthorityFormats = listOf(),
                    description = "Optional external group membership claim.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.header.forwarded-user-id",
                    key = "forwardedUserId",
                    name = "X-User-Id",
                    channel = "http-header",
                    valueShape = "string",
                    allowedAuthorityFormats = listOf(),
                    description = "Forwarded identity header carrying the authenticated user identifier.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.header.forwarded-user-roles",
                    key = "forwardedUserRoles",
                    name = "X-User-Roles",
                    channel = "http-header",
                    valueShape = "comma-separated-authorities",
                    allowedAuthorityFormats = listOf("role", "service-permission"),
                    description = "Forwarded identity header carrying comma-separated authorities.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
                AuthzClaimRecord(
                    id = "shared.header.forwarded-host",
                    key = "forwardedHost",
                    name = "X-Forwarded-Host",
                    channel = "http-header",
                    valueShape = "hostname",
                    allowedAuthorityFormats = listOf(),
                    description = "Forwarded host header used by consumers to choose a host-gate vocabulary record.",
                    namespace = "shared",
                    owner = "authz-model",
                    scope = "shared",
                    status = "active",
                ),
            )
    }

    public object Permissions {
        public val ALL: List<AuthzPermissionRecord> =
            listOf(
                AuthzPermissionRecord(
                    id = "personal-stack.permission.vault",
                    key = "VAULT",
                    authorityValue = "SERVICE_VAULT",
                    description = "Access vocabulary entry for the Vault service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.mail",
                    key = "MAIL",
                    authorityValue = "SERVICE_MAIL",
                    description = "Access vocabulary entry for the mail administration service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.n8n",
                    key = "N8N",
                    authorityValue = "SERVICE_N8N",
                    description = "Access vocabulary entry for the n8n service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.grafana",
                    key = "GRAFANA",
                    authorityValue = "SERVICE_GRAFANA",
                    description = "Access vocabulary entry for the Grafana service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.dashboard",
                    key = "DASHBOARD",
                    authorityValue = "SERVICE_DASHBOARD",
                    description = "Access vocabulary entry for the Kubernetes dashboard service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.traefik",
                    key = "TRAEFIK",
                    authorityValue = "SERVICE_TRAEFIK",
                    description = "Access vocabulary entry for the Traefik service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.rabbitmq",
                    key = "RABBITMQ",
                    authorityValue = "SERVICE_RABBITMQ",
                    description = "Access vocabulary entry for the RabbitMQ service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.assistant",
                    key = "ASSISTANT",
                    authorityValue = "SERVICE_ASSISTANT",
                    description = "Access vocabulary entry for the assistant service hosts.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.status",
                    key = "STATUS",
                    authorityValue = "SERVICE_STATUS",
                    description = "Access vocabulary entry for the status service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.jellyfin",
                    key = "JELLYFIN",
                    authorityValue = "SERVICE_JELLYFIN",
                    description = "Access vocabulary entry for the Jellyfin media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.jellyseerr",
                    key = "JELLYSEERR",
                    authorityValue = "SERVICE_JELLYSEERR",
                    description = "Access vocabulary entry for the Jellyseerr media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.sonarr",
                    key = "SONARR",
                    authorityValue = "SERVICE_SONARR",
                    description = "Access vocabulary entry for the Sonarr media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.radarr",
                    key = "RADARR",
                    authorityValue = "SERVICE_RADARR",
                    description = "Access vocabulary entry for the Radarr media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.bazarr",
                    key = "BAZARR",
                    authorityValue = "SERVICE_BAZARR",
                    description = "Access vocabulary entry for the Bazarr media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.prowlarr",
                    key = "PROWLARR",
                    authorityValue = "SERVICE_PROWLARR",
                    description = "Access vocabulary entry for the Prowlarr media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.qbittorrent",
                    key = "QBITTORRENT",
                    authorityValue = "SERVICE_QBITTORRENT",
                    description = "Access vocabulary entry for the qBittorrent media service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.immich",
                    key = "IMMICH",
                    authorityValue = "SERVICE_IMMICH",
                    description = "Access vocabulary entry for the Immich photo service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.adguard",
                    key = "ADGUARD",
                    authorityValue = "SERVICE_ADGUARD",
                    description = "Access vocabulary entry for the AdGuard Home service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.wolf",
                    key = "WOLF",
                    authorityValue = "SERVICE_WOLF",
                    description = "Access vocabulary entry for the WolfManager service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzPermissionRecord(
                    id = "personal-stack.permission.knowledge-api",
                    key = "KNOWLEDGE_API",
                    authorityValue = "SERVICE_KNOWLEDGE_API",
                    description = "Access vocabulary entry for the knowledge API service.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
            )
    }

    public object Groups {
        public val ALL: List<AuthzGroupRecord> =
            listOf(
                AuthzGroupRecord(
                    id = "personal-stack.group.k8s-admin",
                    key = "K8S_ADMIN",
                    value = "k8s-admin",
                    causes =
                        listOf(
                            AuthzGroupCause(
                                type = "role",
                                key = "ADMIN",
                            ),
                            AuthzGroupCause(
                                type = "permission",
                                key = "DASHBOARD",
                            ),
                        ),
                    description = "External group value emitted for Kubernetes dashboard access.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
            )
    }

    public object HostGates {
        public val ALL: List<AuthzHostGateRecord> =
            listOf(
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.vault",
                    key = "VAULT",
                    permissionKey = "VAULT",
                    aliases = listOf("vault"),
                    description = "Host aliases requiring the Vault service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.mail",
                    key = "MAIL",
                    permissionKey = "MAIL",
                    aliases = listOf("stalwart"),
                    description = "Host aliases requiring the mail service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.n8n",
                    key = "N8N",
                    permissionKey = "N8N",
                    aliases = listOf("n8n"),
                    description = "Host aliases requiring the n8n service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.grafana",
                    key = "GRAFANA",
                    permissionKey = "GRAFANA",
                    aliases = listOf("grafana"),
                    description = "Host aliases requiring the Grafana service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.dashboard",
                    key = "DASHBOARD",
                    permissionKey = "DASHBOARD",
                    aliases = listOf("dashboard"),
                    description = "Host aliases requiring the dashboard service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.traefik",
                    key = "TRAEFIK",
                    permissionKey = "TRAEFIK",
                    aliases = listOf("traefik"),
                    description = "Host aliases requiring the Traefik service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.rabbitmq",
                    key = "RABBITMQ",
                    permissionKey = "RABBITMQ",
                    aliases = listOf("rabbitmq"),
                    description = "Host aliases requiring the RabbitMQ service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.assistant",
                    key = "ASSISTANT",
                    permissionKey = "ASSISTANT",
                    aliases = listOf("assistant", "assistant-ws"),
                    description = "Host aliases requiring the assistant service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.status",
                    key = "STATUS",
                    permissionKey = "STATUS",
                    aliases = listOf("status"),
                    description = "Host aliases requiring the status service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.jellyfin",
                    key = "JELLYFIN",
                    permissionKey = "JELLYFIN",
                    aliases = listOf("jellyfin"),
                    description = "Host aliases requiring the Jellyfin service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.jellyseerr",
                    key = "JELLYSEERR",
                    permissionKey = "JELLYSEERR",
                    aliases = listOf("jellyseerr"),
                    description = "Host aliases requiring the Jellyseerr service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.sonarr",
                    key = "SONARR",
                    permissionKey = "SONARR",
                    aliases = listOf("sonarr"),
                    description = "Host aliases requiring the Sonarr service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.radarr",
                    key = "RADARR",
                    permissionKey = "RADARR",
                    aliases = listOf("radarr"),
                    description = "Host aliases requiring the Radarr service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.bazarr",
                    key = "BAZARR",
                    permissionKey = "BAZARR",
                    aliases = listOf("bazarr"),
                    description = "Host aliases requiring the Bazarr service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.prowlarr",
                    key = "PROWLARR",
                    permissionKey = "PROWLARR",
                    aliases = listOf("prowlarr"),
                    description = "Host aliases requiring the Prowlarr service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.qbittorrent",
                    key = "QBITTORRENT",
                    permissionKey = "QBITTORRENT",
                    aliases = listOf("qbittorrent"),
                    description = "Host aliases requiring the qBittorrent service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.immich",
                    key = "IMMICH",
                    permissionKey = "IMMICH",
                    aliases = listOf("immich"),
                    description = "Host aliases requiring the Immich service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.adguard",
                    key = "ADGUARD",
                    permissionKey = "ADGUARD",
                    aliases = listOf("adguard"),
                    description = "Host aliases requiring the AdGuard service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.wolf",
                    key = "WOLF",
                    permissionKey = "WOLF",
                    aliases = listOf("wolf"),
                    description = "Host aliases requiring the Wolf service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
                AuthzHostGateRecord(
                    id = "personal-stack.host-gate.knowledge-api",
                    key = "KNOWLEDGE_API",
                    permissionKey = "KNOWLEDGE_API",
                    aliases = listOf("kb"),
                    description = "Host aliases requiring the knowledge API service permission.",
                    namespace = "personal-stack",
                    owner = "personal-stack/auth-api",
                    scope = "consumer-specific",
                    status = "active",
                ),
            )
        public val ALIAS_TO_PERMISSION_KEY: Map<String, String> =
            mapOf(
                "vault" to PermissionKeys.VAULT,
                "stalwart" to PermissionKeys.MAIL,
                "n8n" to PermissionKeys.N8N,
                "grafana" to PermissionKeys.GRAFANA,
                "dashboard" to PermissionKeys.DASHBOARD,
                "traefik" to PermissionKeys.TRAEFIK,
                "rabbitmq" to PermissionKeys.RABBITMQ,
                "assistant" to PermissionKeys.ASSISTANT,
                "assistant-ws" to PermissionKeys.ASSISTANT,
                "status" to PermissionKeys.STATUS,
                "jellyfin" to PermissionKeys.JELLYFIN,
                "jellyseerr" to PermissionKeys.JELLYSEERR,
                "sonarr" to PermissionKeys.SONARR,
                "radarr" to PermissionKeys.RADARR,
                "bazarr" to PermissionKeys.BAZARR,
                "prowlarr" to PermissionKeys.PROWLARR,
                "qbittorrent" to PermissionKeys.QBITTORRENT,
                "immich" to PermissionKeys.IMMICH,
                "adguard" to PermissionKeys.ADGUARD,
                "wolf" to PermissionKeys.WOLF,
                "kb" to PermissionKeys.KNOWLEDGE_API,
            )
    }
}
