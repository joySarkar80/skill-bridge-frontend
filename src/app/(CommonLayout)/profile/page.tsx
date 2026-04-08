// export default function StudentProfilePage() {
//   return (
//     <div className="p-6">
//       <h1>Student Profile Page Working</h1>
//     </div>
//   );
// }



import { getUser } from "@/src/services/auth";
import { getSingleProfile } from "@/src/services/profile";
import ProfileDetails from "@/src/components/modules/profile/ProfileDetails";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user?.id) {
    return <p>Please login first</p>;
  }

  const result = await getSingleProfile(user.id);

  return (
    <ProfileDetails profile={result?.data} />
  );
}