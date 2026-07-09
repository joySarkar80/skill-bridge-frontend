<<<<<<< HEAD
// import SessionDetailsPage from "@/src/components/modules/session/SessionDetails";
// import { getUser } from "@/src/lib/auth/getUser";
// // import { getUser } from "@/src/services/auth";
// import { getSingleSession } from "@/src/services/session";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const user = await getUser();
//   const { id } = await params;

//   const result = await getSingleSession(id);

//   return (
//     <div>
//       <SessionDetailsPage
//         session={result?.data}
//         user={user}
//       />
//     </div>
//   );
// }







import SessionDetailsPage from "@/src/components/modules/session/SessionDetails";
import { getUser } from "@/src/lib/auth/getUser";
import { getSingleSession } from "@/src/services/session";
=======
import TutorProfileDetailsPage from "@/src/components/modules/public/session/TutorProfileDetails";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleTutorProfile } from "@/src/services/tutor";
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6

export default async function Page({ params, }: { params: Promise<{ id: string }> }) {
  const user = await getUserFromToken();
  const { id } = await params;
<<<<<<< HEAD
  const result = await getSingleSession(id);

  return (
    <SessionDetailsPage
      session={result?.data}
      user={user}
    />
=======

  const result = await getSingleTutorProfile(id);
  return (
    <div>
      <TutorProfileDetailsPage
        tutorProfile={result?.data}
        user={user}
      />
    </div>
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
  );
}