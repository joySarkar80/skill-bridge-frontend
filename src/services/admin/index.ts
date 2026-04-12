import { cookies } from "next/headers";

export const getAllTutors = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tutors`,
            {
                method: "GET",
                headers: {
                    Cookie: `token=${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch tutors");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};



// "use server";

// import { cookies } from "next/headers";

// export const getSingleProfile = async (id: string) => {
//     try {
//         const cookieStore = await cookies();
//         const token = cookieStore.get("token")?.value;
//         // console.log(token)
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/me/${id}`,
//             {
//                 method: "GET",
//                 headers: {
//                     Cookie: `token=${token}`,
//                     "Content-Type": "application/json",
//                 },
//                 cache: "no-store",
//             }
//         );

//         return res.json();
//     } catch (error: any) {
//         console.log(error);
//         return null;
//     }
// };