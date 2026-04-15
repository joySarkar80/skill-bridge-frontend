"use client";

import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem, } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { formatTo12Hour } from "@/src/utils/time";

interface SessionDetailsProps {
  session: any;
  user: any;
}

export default function SessionDetailsPage({
  session,
  user,
}: SessionDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedSlot, setSelectedSlot] =
    useState<any>(null);

  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    // console.log("selected slot:", selectedSlot);
    // console.log("payload:", {
    //   tutorId: session.userId,
    //   date: new Date().toISOString().split("T")[0],
    //   startTime: selectedSlot.startTime,
    //   endTime: selectedSlot.endTime,
    //   dayOfWeek: selectedSlot.dayOfWeek,
    // });
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

    setIsBooking(true);

    try {
      const payload = {
        tutorId: session.userId,
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
        toast.error(
          data?.message ||
          "Booking failed"
        );
        return;
      }

      toast.success(
        "Booking confirmed"
      );
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setIsBooking(false);
    }
  };

  if (!session) {
    return (
      <p className="text-center mt-10">
        Session not found
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Tutor Info */}
      <Card className="border shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">
            {session.user.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>{session.bio}</p>
          <p>
            <strong>Rate:</strong> ৳
            {session.hourlyRate} / hr
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {session.experience} years
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {session.category.name}
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
          <RadioGroup
            value={selectedSlot?.id || ""}
            onValueChange={(val) => {
              const slot =
                session.availability.find(
                  (s: any) => s.id === val
                );

              setSelectedSlot(slot);
            }}
            className="space-y-3"
          >
            {session.availability.map(
              (slot: any) => (
                <div
                  key={slot.id}
                  className="flex items-center space-x-3 border rounded-xl p-4 hover:bg-gray-50"
                >
                  <RadioGroupItem
                    value={slot.id}
                    id={slot.id}
                  />

                  <Label
                    htmlFor={slot.id}
                    className="cursor-pointer w-full"
                  >
                    {new Date(slot.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {" | "}
                    {formatTo12Hour(slot.startTime)} -{" "}  {formatTo12Hour(slot.endTime) }
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Reviews
        </h2>

        {session.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.reviews.map(
              (review: any) => (
                <Card
                  key={review.id}
                  className="border shadow-sm"
                >
                  <CardContent className="space-y-2 pt-4">
                    <p className="font-semibold">
                      {
                        review.student
                          .name
                      }
                    </p>
                    <p>
                      ⭐ {review.rating}
                      /5
                    </p>
                    <p>
                      {review.comment}
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </div>

      {/* Book button */}
      <div className="text-center">

        <Button
          onClick={handleBooking}
          disabled={isBooking}
          className="px-8 py-3 text-lg"
        >
          {isBooking
            ? "Booking..."
            : "Book Now"}
        </Button>
      </div>
    </div>
  );
}