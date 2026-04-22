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

export const updateTutorProfile = async (
    payload: any
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/profile`,
        {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type":
                    "application/json",
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


export const getAllTutorProfiles = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors`, {
            next: { revalidate: 20 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch tutors");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { data: [] }; 
    }
};

export const getAllTutorProfilesByCategoryId = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor/category/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // cache: "no-store",    
            next: {
                revalidate: 20,
            }
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const getSingleTutorProfile = async (id: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/${id}`,
            // {
            //     next: {
            //         revalidate: 10,
            //     },
            // }
            {
                method: "GET",
                credentials: "include",
            }
        );

        return res.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateAvailabilitySlot = async (slotId: string, payload: any) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/availability/${slotId}`,
        {
            method: "PUT",
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

export const getTutorBookings = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/tutor`,
        {
            method: "GET",
            credentials: "include",
        }
    );
    return res.json();
};

export const completeBooking = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${id}/status`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    const data = await res.json();

    return {
        ok: res.ok,
        data,
    };
};