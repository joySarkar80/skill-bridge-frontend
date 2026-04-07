"use client";

import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";

type TutorCardProps = {
  tutor: {
    id: string;
    bio: string;
    hourlyRate: number;
    experience: number;
    user: {
      name: string;
      email: string;
    };
    category: {
      name: string;
    };
  };
};

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border">
      <CardContent className="p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold">{tutor.user.name}</h2>
          <p className="text-sm text-muted-foreground">
            {tutor.category.name} Tutor
          </p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">{tutor.bio}</p>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {tutor.experience} years
          </p>
          <p>
            <span className="font-semibold">Hourly Rate:</span> ৳
            {tutor.hourlyRate}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full rounded-xl">Details</Button>
      </CardFooter>
    </Card>
  );
}