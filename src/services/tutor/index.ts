export const createTutorProfile = async (payload: {
    bio: FormDataEntryValue | null;
    hourlyRate: number;
    experience: number;
    categoryId: string;
}) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/profile`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    let data = null;

    try {
        data = await res.json();
    } catch {
        data = null;
    }

    return {
        ok: res.ok,
        data,
        status: res.status,
    };
};