"use server";

import { cookies } from "next/headers";

const authHeaders = (token: string | undefined) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const getSingleProfile = async (id: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) return null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    let res = await fetch(`${base}/me`, {
      method: "GET",
      headers: authHeaders(token),
      cache: "no-store",
    });

    if (!res.ok) {
      res = await fetch(`${base}/me/${id}`, {
        method: "GET",
        headers: authHeaders(token),
        cache: "no-store",
      });
    }

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};