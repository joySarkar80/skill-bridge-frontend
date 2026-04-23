"use server";

import { getApiUrl } from "@/src/utils/apiConfig";
import { cookies } from "next/headers";

export const getAllTutors = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${getApiUrl()}/admin/tutors`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch tutors");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllStudents = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${getApiUrl()}/admin/students`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch students");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllBooking = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${getApiUrl()}/admin/bookings`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch students");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createCategory = async (name: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${getApiUrl()}/admin/category`,
            {
                method: "POST",
                headers: {
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            }
        );

        if (!res.ok) {
            throw new Error("Failed to create category");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


