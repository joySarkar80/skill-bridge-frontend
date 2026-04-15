import TutorCard from "@/src/components/modules/public/session/TutorProfileCard";
import { getAllTutorProfiles } from "@/src/services/tutorProfiles";


const page = async () => {
    const { data } = await getAllTutorProfiles();

    return (
        <div className="grid grid-cols-4 gap-5">
            {data?.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
    )
}

export default page;