"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";

interface SessionDetailsProps {
  session: any;
  user: any;
}

const getDayName = (day: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day] || "Unknown";
};

export default function SessionDetailsPage({
  session,
  user,
}: SessionDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedSlot, setSelectedSlot] =
    useState<any>(null);

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    // login না থাকলে login page
    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          pathname
        )}`
      );
      return;
    }

    const payload = {
      tutorId: session.userId,
      date: new Date()
        .toISOString()
        .split("T")[0],
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };

    const res = await fetch("api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status === 401) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          pathname
        )}`
      );
      return;
    }

    alert(data.message);
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
                    {getDayName(
                      slot.dayOfWeek
                    )}{" "}
                    | {slot.startTime} -{" "}
                    {slot.endTime}
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
          className="px-8 py-3 text-lg"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}