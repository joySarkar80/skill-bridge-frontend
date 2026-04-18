"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
export default function ReviewModal({ open, onClose, review }: any) {
    if (!review) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {review.student?.name}'s Review
                    </DialogTitle>
                </DialogHeader>

                <p>⭐ {review.rating}</p>
                <p className="text-muted-foreground">
                    {review.comment}
                </p>
            </DialogContent>
        </Dialog>
    );
}