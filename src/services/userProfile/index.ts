"use server";

import { cookies } from "next/headers";

export const getSingleUserProfile = async (id: string) => {

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    // console.log(token)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/me/${id}`,
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
    console.log(error);
    return null;
  }
};