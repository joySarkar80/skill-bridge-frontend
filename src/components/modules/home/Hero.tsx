"use client"

import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"

export default function HeroCarousel() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1758685848208-e108b6af94cc?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Learn from Experts",
      description: "Connect with world-class tutors and master new skills today.",
    },
    {
      image: "https://images.unsplash.com/photo-1758611974775-39e307bc3da9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Flexible Learning",
      description: "Study at your own pace with schedules that fit your lifestyle.",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1723514457929-1ef8e553bec3?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Global Community",
      description: "Join thousands of students and tutors from around the world.",
    }
  ]

  return (
    <div className="w-full  mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">

                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="max-w-xl text-sm md:text-lg mb-6">
                    {slide.description}
                  </p>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}