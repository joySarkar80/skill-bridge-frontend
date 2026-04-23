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
    }
};

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

    return res.json();
};