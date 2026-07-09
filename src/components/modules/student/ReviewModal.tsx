"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import ReviewForm from "./ReviewForm";

export default function ReviewModal({
    booking,
    disabled,
}: {
    booking: any;
    disabled: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="cursor-pointer">
                    Review
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Give Review</DialogTitle>
                </DialogHeader>

                <ReviewForm
                    booking={booking}
                    onClose={() => setOpen(false)}
                    onSuccess={() => {
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}