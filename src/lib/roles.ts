export type Role = "admin" | "manager" | "worker";

export function canPublish(role: Role) {
  return role === "admin" || role === "manager";
}

export function canManageTeam(role: Role) {
  return role === "admin";
}
