import UserProfileDetails from "@/src/components/modules/userProfile/UserProfileDetails";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleUserProfile } from "@/src/services/userProfile";


<<<<<<< HEAD

import { getUser } from "@/src/lib/auth/getUser";
import { pickProfileFromApiResponse } from "@/src/lib/auth/clientSession";
import { getUserId } from "@/src/lib/auth/userId";
import { getSingleProfile } from "@/src/services/profile";
import ProfileDetails from "@/src/components/modules/profile/ProfileDetails";

export default async function ProfilePage() {
  const user = await getUser();
  const userId = getUserId(user);
=======
export default async function ProfilePage() {
  const user = await getUserFromToken();  
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6

  if (!userId) {
    return <p>Please login first</p>;
  }

<<<<<<< HEAD
  const result = await getSingleProfile(userId);
  const profile = pickProfileFromApiResponse(result);

  return <ProfileDetails profile={profile} />;
=======
  const result = await getSingleUserProfile(user.id);

  return (
    <UserProfileDetails profile={result?.data} />
  );
>>>>>>> 29f12c8c8870ac18ded89f1bdb6a9bee53b840b6
}