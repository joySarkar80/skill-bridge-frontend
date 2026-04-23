"use server";
import { cookies } from "next/headers";
import { getApiUrl } from "@/src/utils/apiConfig";

export const getSingleUserProfile = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

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
    return null;
  }
};