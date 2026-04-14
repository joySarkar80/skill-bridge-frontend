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

interface Booking {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
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

export default async function BookingTable({
    id,
}: BookingTableProps) {
    console.log(id);

    const response = await getMyBookings(id);
    const bookings: Booking[] = response?.data || [];

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tutor Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cancel Booking</TableHead>
                        <TableHead>Review</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>
                                {booking.tutor.name}
                            </TableCell>

                            <TableCell>
                                {
                                    booking.tutor.tutorProfile.category
                                        .name
                                }
                            </TableCell>

                            <TableCell>{booking.date}</TableCell>

                            <TableCell>
                                {booking.startTime} - {booking.endTime}
                            </TableCell>

                            <TableCell>{booking.status}</TableCell>

                            <TableCell>
                                <Button
                                    variant="destructive"
                                    disabled={
                                        booking.status !== "CONFIRMED"
                                    }
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                            </TableCell>

                            <TableCell>
                                <Button
                                    disabled={
                                        booking.status !== "COMPLETED"
                                    }
                                    className="cursor-pointer"
                                >
                                    Review
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}