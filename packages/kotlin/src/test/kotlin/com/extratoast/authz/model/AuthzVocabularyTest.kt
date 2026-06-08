package com.extratoast.authz.model

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
}
