"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";
import { getReviewsPublic } from "@/src/services/review";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const reviews = await getReviewsPublic();
            setReviews(reviews.data);
            setIsDataLoaded(true);
        };

        fetch();
    }, []);

    if (!isDataLoaded) {
        return <p>Loading reviews...</p>;
    }

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