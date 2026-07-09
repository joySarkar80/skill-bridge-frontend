import BookingTable from "@/src/components/modules/student/BookingTable";
import { getUserFromToken } from "@/src/services/auth";


export default async function page() {
    const user = await getUserFromToken();
    return <BookingTable id={user.id} />
}