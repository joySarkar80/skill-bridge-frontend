export const createReview = async (payload: any) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/review/create`,
        {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    return {
        ok: res.ok,
        data,
    };
};


