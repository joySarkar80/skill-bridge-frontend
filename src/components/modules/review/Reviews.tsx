"use client";

import { useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewModal from "./ReviewModal";

export default function Reviews({ reviews = [] }: { reviews?: any[] }) {
    const [selected, setSelected] = useState<any>(null);
    const [open, setOpen] = useState(false);

    if (reviews.length === 0) {
        return (
            <p className="text-center py-10 text-muted-foreground">
                No reviews found
            </p>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r: any) => (
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