import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROLE = ["STUDENT", "ADMIN", "TUTOR"];
const PUBLIC_ROUTE = ["/login", "/register"];

function base64UrlToUint8Array(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = (4 - (base64.length % 4)) % 4;
  const padded = base64 + "=".repeat(pad);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeJwtPayload(token: string): { role?: string; exp?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const json = new TextDecoder().decode(base64UrlToUint8Array(parts[1]));
    return JSON.parse(json) as { role?: string; exp?: number };
  } catch {
    return null;
  }
}

async function verifyHs256Jwt(
  token: string,
  secret: string
): Promise<{ role?: string; exp?: number } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const headerJson = new TextDecoder().decode(base64UrlToUint8Array(parts[0]));
    const header = JSON.parse(headerJson) as { alg?: string };
    if (header.alg !== "HS256") return null;

    const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const sig = base64UrlToUint8Array(parts[2]);

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, data));

    if (signature.length !== sig.length) return null;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) {
      diff |= signature[i] ^ sig[i];
    }
    if (diff !== 0) return null;

    const payload = decodeJwtPayload(token);
    if (!payload) return null;
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

async function getTokenPayload(token: string) {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return verifyHs256Jwt(token, secret);
  }
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
    return null;
  }
  return payload;
}

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (PUBLIC_ROUTE.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, origin)
    );
  }

  const decoded = await getTokenPayload(token);

  if (!decoded) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, origin)
    );
  }

  if (decoded.role && !ALLOWED_ROLE.includes(decoded.role)) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
