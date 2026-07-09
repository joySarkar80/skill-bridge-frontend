"use server";
import { cookies } from "next/headers";
import { getApiUrl } from "@/src/utils/apiConfig";

<<<<<<< HEAD:src/services/profile/index.ts
const authHeaders = (token: string | undefined) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const getSingleProfile = async (id: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) return null;

=======
export const getSingleUserProfile = async (id: string) => {
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6:src/services/userProfile/index.ts
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

<<<<<<< HEAD:src/services/profile/index.ts
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
=======
    const res = await fetch(
      `${getApiUrl()}/me/${id}`, // ডাইনামিক URL
      {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error: any) {
    console.error(error);
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6:src/services/userProfile/index.ts
    return null;
  }
};