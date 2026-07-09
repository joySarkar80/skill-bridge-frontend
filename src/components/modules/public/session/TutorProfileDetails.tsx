"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem, } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";

import { formatTo12Hour } from "@/src/utils/time";
import ReviewCard from "../../review/ReviewCard";
import ReviewModal from "../../review/ReviewModal";

interface AvailabilitySlot {
  id: string;
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface TutorProfileDetailsProps {
  tutorProfile: any;
  user: any;
}

export default function TutorProfileDetailsPage({
  tutorProfile,
  user,
}: TutorProfileDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedSlot, setSelectedSlot] =
    useState<AvailabilitySlot | null>(null);

  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error("Please select a slot");
      return;
    }

    if (!user?.id) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          pathname
        )}`
      );
      return;
    }

    try {
      setIsBooking(true);

      const payload = {
        availabilityId: selectedSlot.id,
        tutorId: tutorProfile.userId,
        tutorName: tutorProfile.user?.name,
        categoryId: tutorProfile.categoryId,
        categoryName: tutorProfile.category?.name,
        hourlyRate: tutorProfile.hourlyRate,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bookings`,
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
        toast.error(data?.message || "Booking failed");
        return;
      }

      toast.success("Booking confirmed successfully");

      setSelectedSlot(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsBooking(false);
    }
  };

  if (!tutorProfile) {
    return (
      <p className="text-center mt-10">
        Tutor profile not found
      </p>
    );
  }
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Tutor Info */}
      <Card className="border shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">
            {tutorProfile.user?.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>{tutorProfile.bio}</p>

          <p>
            <strong>Rate:</strong> ৳
            {tutorProfile.hourlyRate} / hr
          </p>

          <p>
            <strong>
              Experience:
            </strong>{" "}
            {tutorProfile.experience}{" "}
            years
          </p>

          <p>
            <strong>
              Subject:
            </strong>{" "}
            {
              tutorProfile.category?.name
            }
          </p>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card className="border shadow-lg">
        <CardHeader>
          <CardTitle>
            Available Slots
          </CardTitle>
        </CardHeader>

        <CardContent>
          {tutorProfile.availability?.length === 0 ? (
            <p>No available slots found</p>
          ) : (
            <RadioGroup
              value={selectedSlot?.id || ""}
              onValueChange={(slotId) => {
                const slot = tutorProfile.availability.find((item: AvailabilitySlot) => item.id === slotId);

                setSelectedSlot(slot || null);
              }}
              className="space-y-3"
            >
              {tutorProfile.availability.map((slot: AvailabilitySlot) => (
                <div
                  key={slot.id}
                  className="flex items-center space-x-3 border rounded-xl p-4 hover:bg-gray-50"
                >
                  <RadioGroupItem
                    value={slot.id}
                    id={slot.id}
                  />

                  <Label htmlFor={slot.id} className="cursor-pointer w-full">
                    {new Date(slot.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    {" | "}
                    {formatTo12Hour(slot.startTime)} {" - "} {formatTo12Hour(slot.endTime)}
                  </Label>
                </div>
              )
              )}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Reviews
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutorProfile.reviews?.map((r: any) => (
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

      </div>

      {/* Booking Button */}
      <div className="text-center">
        <Button onClick={handleBooking}
          disabled={isBooking}
          className="px-8 py-3 text-lg cursor-pointer"
        >
          {isBooking ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </div>
  );
}