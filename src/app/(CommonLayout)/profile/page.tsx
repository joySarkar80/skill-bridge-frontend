import UserProfileDetails from "@/src/components/modules/userProfile/UserProfileDetails";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleUserProfile } from "@/src/services/userProfile";


export default async function ProfilePage() {
  const user = await getUserFromToken();   // this will return decoded user data from token from cookies..

  if (!user?.id) {
    return <p>Please login first</p>;
  }

  const result = await getSingleUserProfile(user.id);

  return (
    <UserProfileDetails profile={result?.data} />
  );


}