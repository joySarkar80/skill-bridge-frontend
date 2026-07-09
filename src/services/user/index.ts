export const toggleUserStatus = async (userId: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
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