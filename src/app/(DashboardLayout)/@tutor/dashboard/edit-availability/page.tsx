import EditAvailability from "@/src/components/modules/tutor/EditAvailability";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleUserProfile } from "@/src/services/userProfile";

export default async function Page() {
    const user = await getUserFromToken();
    const result = await getSingleUserProfile(user?.id);
    return < EditAvailability tutorProfile={result} />
}