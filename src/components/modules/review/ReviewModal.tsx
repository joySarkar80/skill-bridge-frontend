"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription, 
    DialogHeader,
    DialogTitle
} from "@/src/components/ui/dialog";

export default function ReviewModal({ open, onClose, review }: any) {
    if (!review) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {review.student?.name}'s Review
                    </DialogTitle>
                    {/* একটি Description যোগ করুন */}
                    <DialogDescription>
                        Detailed feedback from the student.
                    </DialogDescription>
                </DialogHeader>

                <p>⭐ {review.rating}</p>
                <p className="text-muted-foreground">
                    {review.comment}
                </p>
            </DialogContent>
        </Dialog>
    );
}