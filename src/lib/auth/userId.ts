import type { AuthUser } from "@/src/lib/auth/getUser";

export function getUserId(user: AuthUser | null): string | null {
  if (!user) return null;
  if (typeof user.id === "string" && user.id) return user.id;
  if (user.sub != null && String(user.sub)) return String(user.sub);
  return null;
}
