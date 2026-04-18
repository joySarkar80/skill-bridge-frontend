export const getReviews = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/review`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return res.json();
};
