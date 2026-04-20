"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Button } from "@/src/components/ui/button";
import { completeBooking } from "@/src/services/tutor";
import { formatTo12Hour } from "@/src/utils/time";
import { useRouter } from "next/navigation";
import { getTutorBookings } from "@/src/services/tutor";

export default function ViewAllBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();

  const fetchBookings = async () => {
    const res = await getTutorBookings();
    setBookings(res?.data || []);
    setIsDataLoaded(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      setLoadingId(id);

      const { ok, data } = await completeBooking(id);

      if (!ok) {
        toast.error(data?.message || "Failed");
        return;
      }

      toast.success("Marked as completed");

      fetchBookings();

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!isDataLoaded) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead>Class Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.student?.name}</TableCell>

              <TableCell>{b.categoryName}</TableCell>

              <TableCell>
                {new Date(b.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>

              <TableCell>
                {new Date(b.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>

              <TableCell>
                {formatTo12Hour(b.startTime)} -{" "}  {formatTo12Hour(b.endTime)}
              </TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold
                      ${b.status === "CONFIRMED"
                      ? "bg-yellow-200 text-yellow-700"
                      : b.status === "COMPLETED"
                        ? "bg-green-400 text-white"
                        : "bg-red-200 text-red-700"
                    }`}
                >
                  {b.status}
                </span>
              </TableCell>

              <TableCell>
                <Button className="cursor-pointer"
                  disabled={b.status !== "CONFIRMED" || loadingId === b.id}
                  onClick={() => handleComplete(b.id)}
                >
                  {b.status === "CONFIRMED"
                    ? loadingId === b.id
                      ? "Processing..."
                      : "Complete"
                    : "Completed"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}