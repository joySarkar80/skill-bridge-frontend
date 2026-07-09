import { getApiUrl } from "@/src/utils/apiConfig";

export const getAllCategory = async () => {
    try {
        const res = await fetch(
            `${getApiUrl()}/categories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch categorys");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};