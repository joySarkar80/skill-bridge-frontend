import CategoryCard from "@/src/components/modules/category/CategoryCard";
import HeroCarousel from "@/src/components/modules/home/Hero";
import TutorCard from "@/src/components/modules/public/session/TutorProfileCard";
import { Button } from "@/src/components/ui/button";
import { getAllTutorProfiles } from "@/src/services/tutor";
import { getAllCategory } from "@/src/services/getCategory";
import Link from "next/link";
import ReviewCard from "@/src/components/modules/review/ReviewCard";
import { getReviewsPublic } from "@/src/services/review";
import Reviews from "@/src/components/modules/review/Reviews";


export default async function Home() {
  const { data } = await getAllTutorProfiles();
  const categories = await getAllCategory();
  const profiles = data?.slice(0, 4) || [];
  const topCategories = categories.data?.slice(0, 4) || [];
  
  // const reviews = await getReviewsPublic();
  // console.log("Reviews data:", reviews.data); // Debugging line to check the reviews data
  return (
    <div>
      <HeroCarousel />

      <div className="border mt-10 p-6 rounded-lg shadow-sm">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-center">Explore Top Tutors</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {profiles.map((tutor: any) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/tutors">
            <Button className="mt-6 rounded-xl cursor-pointer">
              View All Tutors
            </Button>
          </Link>
        </div>
      </div>


      <div className="border mt-10 p-6 rounded-lg shadow-sm">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-center">Explore More Subjects</h2>
        </div>

        {/* Mobile-first Approach:
        - ডিফল্ট: ১ কলাম (Mobile)
        - sm (640px+): ২ কলাম
        - md (768px+): ৩ কলাম
        - lg (1024px+): ৪ কলাম 
      */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {topCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/category">
            <Button className="mt-6 rounded-xl cursor-pointer">
              View All Subjects
            </Button>
          </Link>
        </div>
      </div>


      <div className="border mt-10 p-6 rounded-lg shadow-sm">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">Reviews</h2>
        </div>
        <div className="mt-6">
          <Reviews />
        </div>
      </div>
    </div>
  );
}
