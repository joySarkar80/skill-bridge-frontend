// "use client";

// import { useEffect, useState } from "react";

// import ReviewCard from "./ReviewCard";
// import ReviewModal from "./ReviewModal";
// import { getReviews } from "@/src/services/review";



// export default function Reviews({ userId, role }: any) {
//     const [reviews, setReviews] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [open, setOpen] = useState(false);

//     useEffect(() => {
//         const fetch = async () => {
//             const data =
//                 role === "STUDENT"
//                     ? await getReviews({ studentId: userId })
//                     : await getReviews({ tutorId: userId });

//             setReviews(data);
//         };

//         fetch();
//     }, [userId, role]);

//     return (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {reviews.map((r: any) => (
//                 <ReviewCard
//                     key={r.id}
//                     review={r}
//                     onOpen={(review: any) => {
//                         setSelected(review);
//                         setOpen(true);
//                     }}
//                 />
//             ))}

//             <ReviewModal
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 review={selected}
//             />
//         </div>
//     );
// }




"use client";

import { useEffect, useState } from "react";


import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import { getReviews } from "@/src/services/review";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await getReviews(); // ✅ token based
            console.log("Fetched reviews:", data); // Debugging log
            setReviews(data.data);
        };

        fetch();
    }, []);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews?.map((r: any) => (
                <ReviewCard
                    key={r.id}
                    review={r}
                    onOpen={(review: any) => {
                        setSelected(review);
                        setOpen(true);
                    }}
                />
            ))}

            <ReviewModal
                open={open}
                onClose={() => setOpen(false)}
                review={selected}
            />
        </div>
    );
}