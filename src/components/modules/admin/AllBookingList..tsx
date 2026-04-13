import { getAllBooking } from "@/src/services/admin";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

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
    status: "CONFIRMED" | "PENDING" | "CANCELLED";
    student: UserInfo;
    tutor: UserInfo;
}

export default async function BookingList() {
    const bookingsResponse = await getAllBooking();
    const bookings: Booking[] = bookingsResponse?.data || [];

    return (
        <div className="space-y-4">
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <Card key={booking.id}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="space-y-1">
                                <div className=" gap-2 items-baseline">
                                    <h4 className="font-bold text-md text-gray-800">
                                        Student name: {booking.student.name}
                                    </h4>
                                    <h4 className="font-bold text-md text-gray-800">
                                        Tutor name: {booking.tutor.name}
                                    </h4>
                                </div>

                                <p className="text-sm text-gray-600">
                                    Email: {booking.student.email}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Schedule: <strong>{booking.date}</strong> | {booking.startTime} - {booking.endTime}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Subject: <strong>{booking.tutor.tutorProfile.category.name}</strong>
                                </p>

                                <p className="text-sm">
                                    Status:{" "}
                                    <span className={`font-semibold ${booking.status === 'CONFIRMED' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </p>
                            </div>

                            <Button
                                variant={booking.status === "CONFIRMED" ? "destructive" : "default"}
                            >
                                {booking.status === "CONFIRMED" ? "Cancel Booking" : "Approve"}
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center py-10 text-gray-500">No bookings found.</p>
            )}
        </div>
    );
}