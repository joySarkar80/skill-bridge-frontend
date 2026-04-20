import { getAllBooking } from "@/src/services/admin";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import { formatTo12Hour } from "@/src/utils/time";

interface UserInfo {
    id: string;
    name: string;
    email: string;
    tutorProfile: {
        category: {
            name: string;
        };
    };
}

interface Booking {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
    student: UserInfo;
    tutor: UserInfo;
    createdAt: string;
    categoryName: string;

}

export default async function BookingList() {
    const bookingsResponse = await getAllBooking();
    const bookings: Booking[] = bookingsResponse?.data || [];

    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Student Email</TableHead>
                        <TableHead>Tutor</TableHead>
                        <TableHead>Tutor Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Class Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-medium">
                                    {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {booking.student.name}
                                </TableCell>

                                <TableCell>
                                    {booking.student.email}
                                </TableCell>

                                <TableCell>
                                    {booking.tutor.name}
                                </TableCell>

                                <TableCell>
                                    {booking.tutor.email}
                                </TableCell>

                                <TableCell>
                                    {booking.categoryName}
                                </TableCell>

                                <TableCell>
                                    <div className="text-sm">
                                        {new Date(booking.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                        <p className="text-gray-500">
                                            {formatTo12Hour(booking.startTime)} -{" "}  {formatTo12Hour(booking.endTime)}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold
                                                ${booking.status === "CONFIRMED"
                                                ? "bg-yellow-200 text-yellow-700"
                                                : booking.status === "COMPLETED"
                                                    ? "bg-green-400 text-white"
                                                    : "bg-red-200 text-red-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                                No bookings found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}