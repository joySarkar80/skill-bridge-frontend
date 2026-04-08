"use server";

import { cookies } from "next/headers";

export const getSingleProfile = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/me/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        cache: "no-store",
      }
    );

    return res.json();
  } catch (error: any) {
    console.log(error);
    return null;
  }
};