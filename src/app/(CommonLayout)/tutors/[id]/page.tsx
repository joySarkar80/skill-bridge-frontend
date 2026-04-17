import TutorProfileDetailsPage from "@/src/components/modules/public/session/TutorProfileDetails";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleTutorProfile } from "@/src/services/tutor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserFromToken();
  const { id } = await params;

  const result = await getSingleTutorProfile(id);
  return (
    <div>
      <TutorProfileDetailsPage
        tutorProfile={result?.data}
        user={user}
      />
    </div>
  );
}