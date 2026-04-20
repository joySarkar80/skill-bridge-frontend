"use client";

import Link from "next/link";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardFooter } from "../../../ui/card";

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
    <Card className="flex flex-col h-full rounded-2xl shadow-sm hover:shadow-md transition-all border">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-center mb-2">
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

      <CardFooter className="flex justify-center pb-6 mt-auto">
        <Link href={`/tutors/${tutor.id}`} passHref className="w-full">
          <Button className="w-full rounded-xl cursor-pointer">Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}