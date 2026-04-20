import TutorCard from "@/src/components/modules/public/session/TutorProfileCard";
import { getAllTutorProfiles } from "@/src/services/tutor";

const page = async () => {
    const { data } = await getAllTutorProfiles();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
            {data?.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
    )
}

export default page;