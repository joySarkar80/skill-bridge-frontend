"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { updateAvailabilitySlot } from "@/src/services/tutor";

interface Props {
    slot: any;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditAvailabilityForm({
    slot,
    onClose,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        date: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (slot) {
            setFormData({
                date: slot.date.split("T")[0],
                startTime: slot.startTime,
                endTime: slot.endTime,
            });
        }
    }, [slot]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { ok, data } = await updateAvailabilitySlot(slot.id, formData);
            if (!ok) {
                toast.error(data?.message || "Update failed");
                return;
            }

toast.success("Slot updated successfully");

            onSuccess?.();
            onClose();
        } catch (err: any) {
            toast.error(err.message || "Something went wrong!!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Date</Label>
                <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            date: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <Label>Start Time</Label>
                <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            startTime: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <Label>End Time</Label>
                <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            endTime: e.target.value,
                        })
                    }
                />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Slot"}
            </Button>
        </form>
    );
}