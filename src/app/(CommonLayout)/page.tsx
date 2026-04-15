import HeroCarousel from "@/src/components/modules/home/Hero";
import TutorCard from "@/src/components/modules/public/session/TutorProfileCard";
import { getAllTutorProfiles } from "@/src/services/tutorProfiles";



export default async function Home() {
  const { data } = await getAllTutorProfiles();

  return (
    <div>
      <HeroCarousel />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="grid grid-cols-4 gap-5 mt-15">
        {data?.slice(0, 4).map((tutor: any) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>

    </div>
  );
}
