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
    } catch (error: any) {
        return Error(error)
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};