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
import { getAllTutors } from "@/src/services/admin";
import { toggleUserStatus } from "@/src/services/user";

interface Tutor {
    id: string;
    name: string;
    email: string;
    status: "ACTIVE" | "BANNED";
}

export default function TutorList() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchTutors = async () => {
        const res = await getAllTutors();
        setTutors(res?.data || []);
        setIsDataLoaded(true);
    };

    useEffect(() => {
        fetchTutors();
    }, []);

    const handleToggle = async (id: string) => {
        try {
            setLoadingId(id);

            const { ok, data } = await toggleUserStatus(id);

            if (!ok) {
                toast.error(data?.message || "Failed");
                return;
            }

            toast.success(data?.message);

            setTutors((prev) =>
                prev.map((t) =>
                    t.id === id ? {
                        ...t,
                        status: t.status === "ACTIVE" ? "BANNED" : "ACTIVE",
                    }
                        : t
                )
            );
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoadingId(null);
        }
    };

    if (!isDataLoaded) {
        return <p>Loading tutors...</p>;
    }
    
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tutors.map((tutor) => (
                        <TableRow key={tutor.id}>
                            <TableCell>{tutor.name}</TableCell>
                            <TableCell>{tutor.email}</TableCell>

                            <TableCell>
                                <span
                                    className={`font-medium ${tutor.status === "ACTIVE"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {tutor.status}
                                </span>
                            </TableCell>

                            <TableCell>
                                <Button
                                    className="cursor-pointer"
                                    variant={
                                        tutor.status === "ACTIVE"
                                            ? "destructive"
                                            : "default"
                                    }
                                    disabled={loadingId === tutor.id}
                                    onClick={() => handleToggle(tutor.id)}
                                >
                                    {loadingId === tutor.id
                                        ? "Processing..."
                                        : tutor.status === "ACTIVE"
                                            ? "Ban"
                                            : "Unban"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}