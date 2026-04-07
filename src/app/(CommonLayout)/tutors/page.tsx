import TutorCard from "@/src/components/modules/session/SessionCard";
import { getAllSession } from "@/src/services/session"
import { CloudCog } from "lucide-react";

const page = async () => {
    const { data } = await getAllSession();
    
    return (
        <div className="grid grid-cols-4 gap-5">
            {data?.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </div>
    )
}

export default page;