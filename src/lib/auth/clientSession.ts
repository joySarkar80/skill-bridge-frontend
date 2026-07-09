/** Parse token from common backend login/register JSON shapes. */
export function extractTokenFromAuthResponse(res: unknown): string | null {
  if (!res || typeof res !== "object") return null;
  const r = res as Record<string, unknown>;
  const data = r.data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.token === "string" && d.token) return d.token;
    if (typeof d.accessToken === "string" && d.accessToken) {
      return d.accessToken;
    }
  }
  if (typeof r.token === "string" && r.token) return r.token;
  if (typeof r.accessToken === "string" && r.accessToken) {
    return r.accessToken;
  }
  return null;
}

export async function persistTokenCookie(token: string): Promise<boolean> {
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
    credentials: "include",
  });
  return res.ok;
}

/** Normalize profile payload from GET /me or /me/:id responses. */
export function pickProfileFromApiResponse(json: unknown): Record<
  string,
  unknown
> | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  const data = o.data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (d.user && typeof d.user === "object") {
      return d.user as Record<string, unknown>;
    }
    return d as Record<string, unknown>;
  }
  if (o.user && typeof o.user === "object") {
    return o.user as Record<string, unknown>;
  }
  return o as Record<string, unknown>;
}
