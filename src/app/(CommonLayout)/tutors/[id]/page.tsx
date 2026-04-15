import SessionDetailsPage from "@/src/components/modules/public/session/TutorProfileDetails";
import { getUser } from "@/src/services/auth";
import { getSingleTutorProfile } from "@/src/services/tutorProfiles";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const { id } = await params;

  const result = await getSingleTutorProfile(id);

  return (
    <div>
      <SessionDetailsPage
        session={result?.data}
        user={user}
      />
    </div>
  );
}