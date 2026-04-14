import BookingTable from "@/src/components/modules/student/BookingTable";
import { getUser } from "@/src/services/auth"

export default async function page() {
    const user = await getUser();
    return <BookingTable id={user.id} />
}