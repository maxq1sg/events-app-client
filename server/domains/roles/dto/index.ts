export interface AddPermissionsToRoleDto {
  role_id: number;
  permission_ids: number[];
}
export interface NewRoleWithPermissions {
  name: string;
  permission_ids: number[];
}
export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
  EDITOR = "EDITOR",
  GUEST = "GUEST",
}
