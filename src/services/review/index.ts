import { getApiUrl } from '@/src/utils/apiConfig';
import { cookies } from 'next/headers';

export const getReviews = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${getApiUrl()}/review/private`, {
        method: "GET",
        headers: {
            Cookie: `token=${token}`,
        },
        next: {
            revalidate: 20,
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch reviews");
    }

    return res.json();
};

export const getReviewsPublic = async () => {
    const res = await fetch(`${getApiUrl()}/review`, {
        method: "GET",

        next: {
            revalidate: 20,
        }
    });


    if (!res.ok) {
        throw new Error("Failed to fetch reviews");
    }

    return res.json();
};
