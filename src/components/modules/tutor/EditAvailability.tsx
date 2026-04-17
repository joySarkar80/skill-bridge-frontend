"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { formatTo12Hour } from "@/src/utils/time";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/src/components/ui/dialog";

import EditAvailabilityForm from "./EditAvailabilityForm";

export default function EditAvailability({ tutorProfile }: any) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    const availability = tutorProfile.data?.tutorProfile.availability;

    return (
        <Card className="border shadow-lg">
            <CardHeader>
                <CardTitle>Available Slots</CardTitle>
            </CardHeader>

            <CardContent>
                {availability?.length === 0 ? (
                    <p>No available slots found</p>
                ) : (
                    <div className="space-y-3">
                        {availability.map((slot: any) => (
                            <div
                                key={slot.id}
                                className="flex justify-between items-center border rounded-xl p-4"
                            >
                                <div>
                                    {new Date(slot.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                    {" | "}
                                    {formatTo12Hour(slot.startTime)} -{" "}
                                    {formatTo12Hour(slot.endTime)}
                                </div>

                                <Button  size="sm" onClick={() => { 
                                    setSelectedSlot(slot); 
                                    setOpen(true); 
                                }}
                                >
                                    Edit
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Slot</DialogTitle>
                        <DialogDescription>
                            Update your availability slot time and date.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSlot && (
                        <EditAvailabilityForm
                            slot={selectedSlot}
                            onClose={() => setOpen(false)}
                            onSuccess={() => router.refresh()}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}