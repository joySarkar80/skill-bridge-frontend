"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { createReview } from "@/src/services/student/student.client";

export default function ReviewForm({
    booking,
    onClose,
    onSuccess,
}: any) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                bookingId: booking.id,
                tutorId: booking.tutorId,
                studentId: booking.studentId,
                rating,
                comment,
            };

            const { ok, data } = await createReview(payload);

            if (!ok) {
                toast.error(data?.message || "Failed to create review");
                return;
            }

            toast.success("Review created successfully");

            onSuccess?.();
            onClose();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <Label>Rating (1-5)</Label>
                <Input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
            </div>

            <div>
                <Label>Comment</Label>
                <textarea
                    className="w-full p-2 border rounded-md"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your experience..."
                    rows={4}
                />
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full cursor-pointer">
                {loading ? "Submitting..." : "Submit Review"}
            </Button>
        </div>
    );
}