"use server"

export const getAllSession = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutor`, {
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
    } catch {
        return { data: [] };
    }
}

export const getSingleSession = async (
  id: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/${id}`,
      {
        next: {
          revalidate: 20,
        },
      }
    );

    return res.json();
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load session";
    throw new Error(message);
  }
};