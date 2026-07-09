<<<<<<< HEAD
// "use server";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";

// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     const result = await res.json();
//     const storeCookie = await cookies();
//     if (result.success) {
//       storeCookie.set("token", result?.data?.token);
//     }
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUser = async () => {
//   const storeCookie = await cookies();
//   const token = storeCookie.get("token")?.value;
//   let decodedData = null;
//   if (token) {
//     decodedData = await jwtDecode(token);
//     return decodedData;
//   } else {
//     return null;
//   }
// };

// export const UserLogOut = async () => {
//   const storeCookie = await cookies();
//   storeCookie.delete("token");
// };

// export const registerUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   role: "STUDENT" | "TUTOR";
// }) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// };



// gpt
// import { FieldValues } from "react-hook-form";

// export const loginUser = async (userData: FieldValues) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
//     {
//       method: "POST",
//       credentials: "include", // VERY IMPORTANT
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     }
//   );

//   return res.json();
// };

// export const loginUser = async (data: FieldValues) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//       credentials: "include",
//     }
//   );

//   return res.json();
// };

// export const registerUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   role: "STUDENT" | "TUTOR";
// }) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   return res.json();
// };

"use client";

export const loginUser = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
=======
"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { getApiUrl } from "@/src/utils/apiConfig";

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${getApiUrl()}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
        });
        const result = await res.json();
        const storeCookie = await cookies();

        if (result.success) {
            storeCookie.set("token", result?.data?.token);
        }
        return result;
    } catch (error) {
        console.error(error);
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
    }
  );

  return res.json();
};

<<<<<<< HEAD
export const registerUser = async (data: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
=======
export const getUserFromToken = async () => {
    const storeCookie = await cookies();
    const token = storeCookie.get("token")?.value;
    let decodedData = null;
    if (token) {
        decodedData = await jwtDecode(token);
        return decodedData;
    } else {
        return null;
    }
};

export const UserLogOut = async () => {
    const storeCookie = await cookies();
    storeCookie.delete("token");
};

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
    role: "STUDENT" | "TUTOR";
}) => {
    const res = await fetch(`${getApiUrl()}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6

    return res.json();
};