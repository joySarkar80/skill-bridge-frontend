import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import { getMyBookings } from "@/src/services/student";
import { formatTo12Hour } from "@/src/utils/time";
import ReviewModal from "./ReviewModal";
import CancelBookingButton from "./CancelBookingButton";

interface Booking {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    categoryName: string;
    status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
    tutor: {
        name: string;
        tutorProfile: {
            category: {
                name: string;
            };
        };
    };
}

interface BookingTableProps {
    id: string;
}


export default async function BookingTable({ id, }: BookingTableProps) {
    // console.log(id);

    const response = await getMyBookings(id);
    const bookings: Booking[] = response?.data || [];
    // console.log(bookings);

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tutor Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>Class Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cancel Booking</TableHead>
                        <TableHead>Create Review</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings?.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>
                                {booking.tutor.name}
                            </TableCell>

                            <TableCell>
                                {booking.categoryName}
                            </TableCell>

                            <TableCell>
                                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </TableCell>

                            <TableCell>
                                {new Date(booking.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </TableCell>

                            <TableCell>
                                {formatTo12Hour(booking.startTime)} -{" "}  {formatTo12Hour(booking.endTime)}
                            </TableCell>

                            <TableCell>{booking.status}</TableCell>

                            <TableCell>
                                <CancelBookingButton
                                    bookingId={booking.id}
                                    disabled={booking.status !== "CONFIRMED"}
                                />
                            </TableCell>

                            <TableCell>
                                <ReviewModal
                                    booking={booking}
                                    disabled={booking.status !== "COMPLETED"}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}