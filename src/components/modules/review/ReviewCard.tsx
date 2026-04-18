"use client";

import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";


export default function ReviewCard({ review, onOpen }: any) {
    const words = review.comment?.split(" ") || [];
    const shortText = words.slice(0, 20).join(" ");
    const isLong = words.length > 20;
    
    return (
        <Card className="rounded-2xl shadow-sm">
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">
                        Teacher Name: {review.tutor?.name}
                    </h3>
                    <span>⭐ {review.rating}</span>
                </div>
                <h2>Student Name: {review.student?.name}</h2>

                <p className="text-sm text-muted-foreground">
                    {isLong ? shortText + "..." : review.comment}
                </p>

                {isLong && (
                    <Button className="cursor-pointer" variant="link" onClick={() => onOpen(review)}>
                        See more
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}