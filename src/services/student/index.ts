import { cookies } from "next/headers";

export const getMyBookings = async (id: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${id}`,
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
            throw new Error("Failed to fetch booking");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


