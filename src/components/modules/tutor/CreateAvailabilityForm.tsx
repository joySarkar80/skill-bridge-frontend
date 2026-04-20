"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function CreateAvailabilityForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            date: formData.get("date"),
            startTime: formData.get("startTime"),
            endTime: formData.get("endTime"),
        };

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/availability`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(
                    data?.message || "Failed to add slot"
                );
                return;
            }

            toast.success(
                data?.message ||
                "Availability added successfully"
            );

            form.reset();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-6 p-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label>Date</Label>
                    <Input
                        type="date"
                        name="date"
                        required
                    />
                </div>

                <div>
                    <Label>Start Time</Label>
                    <Input
                        type="time"
                        name="startTime"
                        required
                    />
                </div>

                <div>
                    <Label>End Time</Label>
                    <Input
                        type="time"
                        name="endTime"
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
            >
                {loading ? "Adding..." : "Add Availability"}
            </Button>
        </form>
    );
}