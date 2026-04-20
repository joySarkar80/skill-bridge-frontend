// CategoryCard.tsx
"use client";

import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  tutorCount: number; // dynamic
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="flex flex-col h-full rounded-2xl shadow-sm hover:shadow-md transition-all border">
      <CardContent className="p-6 text-center flex-grow">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Worlds teachers take session with this subject.
        </p>
      </CardContent>

      <CardFooter className="flex justify-center pb-6 mt-auto">
        <Link href={`/category/${category.id}`} passHref className="w-full">
          <Button className="w-full cursor-pointer rounded-xl">
            Select
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}