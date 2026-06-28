package dev.jorisjonkers.authz.model

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class AuthzVocabularyTest {
    @Test
    fun `role authority constants match helper format`() {
        assertEquals("ROLE_ADMIN", AuthzVocabulary.RoleAuthorities.ADMIN)
        assertEquals("ROLE_READONLY", AuthzVocabulary.roleAuthority(AuthzVocabulary.RoleKeys.READONLY))
        assertEquals(listOf("ADMIN", "USER", "READONLY"), AuthzVocabulary.RoleKeys.ALL)
    }

    @Test
    fun `service permission authority constants match helper format`() {
        assertEquals("SERVICE_DASHBOARD", AuthzVocabulary.PermissionAuthorities.DASHBOARD)
        assertEquals(
            "SERVICE_KNOWLEDGE_API",
            AuthzVocabulary.servicePermissionAuthority(AuthzVocabulary.PermissionKeys.KNOWLEDGE_API),
        )
        assertEquals(20, AuthzVocabulary.PermissionKeys.ALL.size)
    }

    @Test
    fun `host aliases resolve to permission keys and unknown hosts are unmapped`() {
        assertEquals(AuthzVocabulary.PermissionKeys.VAULT, AuthzVocabulary.permissionKeyForHost("VAULT.example.test"))
        assertEquals(
            AuthzVocabulary.PermissionKeys.ASSISTANT,
            AuthzVocabulary.permissionKeyForHost("assistant-ws.example.test"),
        )
        assertEquals(AuthzVocabulary.PermissionKeys.KNOWLEDGE_API, AuthzVocabulary.permissionKeyForHostAlias("kb"))
        assertNull(AuthzVocabulary.permissionKeyForHost("unknown.example.test"))
        assertNull(AuthzVocabulary.permissionKeyForHost(null))
        assertNull(AuthzVocabulary.permissionKeyForHost(""))
    }

    @Test
    fun `group values stay separate from role and permission authorities`() {
        val group = AuthzVocabulary.Groups.ALL.single { it.value == AuthzVocabulary.GroupValues.K8S_ADMIN }

        assertEquals("k8s-admin", group.value)
        assertTrue(group.causes.any { it.type == "role" && it.key == AuthzVocabulary.RoleKeys.ADMIN })
        assertTrue(group.causes.any { it.type == "permission" && it.key == AuthzVocabulary.PermissionKeys.DASHBOARD })
    }

    @Test
    fun `claim constants include token claims and forwarded identity headers`() {
        assertEquals("roles", AuthzVocabulary.ClaimNames.ROLES)
        assertEquals("username", AuthzVocabulary.ClaimNames.USERNAME)
        assertEquals("groups", AuthzVocabulary.ClaimNames.GROUPS)
        assertEquals("X-User-Id", AuthzVocabulary.ClaimNames.FORWARDED_USER_ID)
        assertEquals("X-User-Roles", AuthzVocabulary.ClaimNames.FORWARDED_USER_ROLES)
        assertEquals("X-Forwarded-Host", AuthzVocabulary.ClaimNames.FORWARDED_HOST)
    }

    @Test
    fun `generated record collections match constant indexes`() {
        assertEquals(
            AuthzVocabulary.RoleKeys.ALL.map(AuthzVocabulary::roleAuthority),
            AuthzVocabulary.RoleAuthorities.ALL,
        )
        assertEquals(
            AuthzVocabulary.PermissionKeys.ALL.map(AuthzVocabulary::servicePermissionAuthority),
            AuthzVocabulary.PermissionAuthorities.ALL,
        )
        assertEquals(AuthzVocabulary.Roles.ALL.map { it.key }, AuthzVocabulary.RoleKeys.ALL)
        assertEquals(AuthzVocabulary.Roles.ALL.map { it.authorityValue }, AuthzVocabulary.RoleAuthorities.ALL)
        assertEquals(AuthzVocabulary.Claims.ALL.map { it.name }, AuthzVocabulary.ClaimNames.ALL)
        assertEquals(AuthzVocabulary.Permissions.ALL.map { it.key }, AuthzVocabulary.PermissionKeys.ALL)
        assertEquals(AuthzVocabulary.Permissions.ALL.map { it.authorityValue }, AuthzVocabulary.PermissionAuthorities.ALL)
        assertEquals(AuthzVocabulary.Groups.ALL.map { it.value }, AuthzVocabulary.GroupValues.ALL)

        val aliasIndex =
            AuthzVocabulary.HostGates.ALL
                .flatMap { gate -> gate.aliases.map { alias -> alias to gate.permissionKey } }
                .toMap()
        assertEquals(aliasIndex, AuthzVocabulary.HostGates.ALIAS_TO_PERMISSION_KEY)
    }

    @Test
    fun `generated records expose complete active metadata`() {
        AuthzVocabulary.Roles.ALL.forEach { role ->
            assertTrue(role.id.isNotBlank())
            assertTrue(role.key in AuthzVocabulary.RoleKeys.ALL)
            assertEquals(AuthzVocabulary.roleAuthority(role.key), role.authorityValue)
            assertActiveMetadata(role.description, role.namespace, role.owner, role.scope, role.status)
        }

        AuthzVocabulary.Claims.ALL.forEach { claim ->
            assertTrue(claim.id.isNotBlank())
            assertTrue(claim.key.isNotBlank())
            assertTrue(claim.name in AuthzVocabulary.ClaimNames.ALL)
            assertTrue(claim.channel.isNotBlank())
            assertTrue(claim.valueShape.isNotBlank())
            assertTrue(claim.allowedAuthorityFormats.all { it == "role" || it == "service-permission" })
            assertActiveMetadata(claim.description, claim.namespace, claim.owner, claim.scope, claim.status)
        }

        AuthzVocabulary.Permissions.ALL.forEach { permission ->
            assertTrue(permission.id.isNotBlank())
            assertTrue(permission.key in AuthzVocabulary.PermissionKeys.ALL)
            assertEquals(AuthzVocabulary.servicePermissionAuthority(permission.key), permission.authorityValue)
            assertActiveMetadata(
                permission.description,
                permission.namespace,
                permission.owner,
                permission.scope,
                permission.status,
            )
        }

        AuthzVocabulary.Groups.ALL.forEach { group ->
            assertTrue(group.id.isNotBlank())
            assertTrue(group.key.isNotBlank())
            assertTrue(group.value in AuthzVocabulary.GroupValues.ALL)
            assertTrue(group.causes.isNotEmpty())
            group.causes.forEach { cause ->
                assertTrue(cause.type == "role" || cause.type == "permission")
                assertTrue(cause.key.isNotBlank())
            }
            assertActiveMetadata(group.description, group.namespace, group.owner, group.scope, group.status)
        }

        AuthzVocabulary.HostGates.ALL.forEach { gate ->
            assertTrue(gate.id.isNotBlank())
            assertTrue(gate.key in AuthzVocabulary.PermissionKeys.ALL)
            assertTrue(gate.permissionKey in AuthzVocabulary.PermissionKeys.ALL)
            assertTrue(gate.aliases.isNotEmpty())
            assertTrue(gate.aliases.all { it == it.lowercase() && it.isNotBlank() })
            assertActiveMetadata(gate.description, gate.namespace, gate.owner, gate.scope, gate.status)
        }
    }

    private fun assertActiveMetadata(
        description: String,
        namespace: String,
        owner: String,
        scope: String,
        status: String,
    ) {
        assertTrue(description.isNotBlank())
        assertTrue(namespace.isNotBlank())
        assertTrue(owner.isNotBlank())
        assertTrue(scope.isNotBlank())
        assertEquals("active", status)
    }
}
