"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { completeBooking } from "@/src/services/tutor";


export default function CancelBookingButton({
    bookingId,
    disabled,
}: {
    bookingId: string;
    disabled: boolean;
}) {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        try {
            setLoading(true);

            const { ok, data } = await completeBooking(bookingId);

            if (!ok) {
                toast.error(data?.message || "Failed to cancel");
                return;
            }

            toast.success("Marked as cancelled");

            // 🔥 page refresh (server component refetch)
            window.location.reload();

        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="destructive"
            disabled={disabled || loading}
            onClick={handleCancel}
            className="cursor-pointer"
        >
            {loading ? "Cancelling..." : "Cancel"}
        </Button>
    );
}