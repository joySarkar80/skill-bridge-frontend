import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const base = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
  if (!base) {
    return NextResponse.json({ user: null }, { status: 500 });
  }

  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const res = await fetch(`${base}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const data = await res.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return NextResponse.json({ user: null });
  }

  const root = data as Record<string, unknown>;
  const inner = root.data;
  let user: unknown = null;
  if (inner && typeof inner === "object") {
    const d = inner as Record<string, unknown>;
    user = d.user ?? d;
  } else {
    user = root.user ?? root;
  }

  return NextResponse.json({
    user: user && typeof user === "object" ? user : null,
  });
}
