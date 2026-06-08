import {
  ClaimNames,
  GroupValues,
  PermissionAuthorities,
  PermissionKeys,
  RoleAuthorities,
  RoleKeys,
  permissionKeyForHost,
  permissionKeyForHostAlias,
  roleAuthority,
  servicePermissionAuthority
} from "./authz-vocabulary.js";
import type { PermissionKey, RoleKey } from "./authz-vocabulary.js";

const adminRole: RoleKey = RoleKeys.ADMIN;
const dashboardPermission: PermissionKey = PermissionKeys.DASHBOARD;
const roleAuthorityValue: string = roleAuthority(adminRole);
const serviceAuthorityValue: string = servicePermissionAuthority(dashboardPermission);
const forwardedRolesHeaderName: "X-User-Roles" = ClaimNames.forwardedUserRoles;
const groupValue: "k8s-admin" = GroupValues.K8S_ADMIN;
const maybePermissionFromAlias: PermissionKey | undefined = permissionKeyForHostAlias("assistant-ws");
const maybePermissionFromHost: PermissionKey | undefined = permissionKeyForHost("kb.example.test");
const adminAuthority: "ROLE_ADMIN" = RoleAuthorities.ADMIN;
const dashboardAuthority: "SERVICE_DASHBOARD" = PermissionAuthorities.DASHBOARD;
