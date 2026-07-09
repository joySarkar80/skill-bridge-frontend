// export default function StudentProfilePage() {
//   return (
//     <div className="p-6">
//       <h1>Student Profile Page Working</h1>
//     </div>
//   );
// }



import { getUser } from "@/src/lib/auth/getUser";
import { pickProfileFromApiResponse } from "@/src/lib/auth/clientSession";
import { getUserId } from "@/src/lib/auth/userId";
import { getSingleProfile } from "@/src/services/profile";
import ProfileDetails from "@/src/components/modules/profile/ProfileDetails";

export default async function ProfilePage() {
  const user = await getUser();
  const userId = getUserId(user);

  if (!userId) {
    return <p>Please login first</p>;
  }

  const result = await getSingleProfile(userId);
  const profile = pickProfileFromApiResponse(result);

  return <ProfileDetails profile={profile} />;
}