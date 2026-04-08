import SessionDetailsPage from "@/src/components/modules/session/SessionDetails";
import { getUser } from "@/src/services/auth";
import { getSingleSession } from "@/src/services/session";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const { id } = await params;

  const result = await getSingleSession(id);

  return (
    <div>
      <SessionDetailsPage
        session={result?.data}
        user={user}
      />
    </div>
  );
}