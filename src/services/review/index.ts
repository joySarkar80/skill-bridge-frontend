export const getReviews = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review/private`, {
        method: "GET",
        credentials: "include",
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/review`, {
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
