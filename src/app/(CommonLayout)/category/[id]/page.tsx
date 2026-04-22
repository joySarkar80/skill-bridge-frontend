import CategoryCard from "@/src/components/modules/category/CategoryCard";
import TutorCard from "@/src/components/modules/public/session/TutorProfileCard";
import { getAllTutorProfilesByCategoryId } from "@/src/services/tutor";


export default async function Page({ params, }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await getAllTutorProfilesByCategoryId(id);
  const tutorsByCategoryId = result?.data || [];
  // console.log("id: ", id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {tutorsByCategoryId.length > 0 ? (
        tutorsByCategoryId.map((tutor: any) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          Ops!! no tutors found for this category.
        </p>
      )}
    </div>
  );
}