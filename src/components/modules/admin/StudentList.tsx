"use client";

import { getAllStudents } from "@/src/services/admin";
import { toggleUserStatus } from "@/src/services/user";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import { toast } from "sonner";

interface Student {
    id: string;
    name: string;
    email: string;
    status: "ACTIVE" | "BANNED";
}

export default function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const fetchTutors = async () => {
        const res = await getAllStudents();
        setStudents(res?.data || []);
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

            setStudents((prev) =>
                prev.map((s) =>
                    s.id === id ? {
                        ...s,
                        status: s.status === "ACTIVE" ? "BANNED" : "ACTIVE",
                    }
                        : s
                )
            );
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoadingId(null);
        }
    };

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
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>

                            <TableCell>
                                <span
                                    className={`font-medium ${student.status === "ACTIVE"
                                        ? "text-green-600"
                                        : "text-red-600"
                                        }`}
                                >
                                    {student.status}
                                </span>
                            </TableCell>

                            <TableCell>
                                <Button
                                    className="cursor-pointer"
                                    variant={
                                        student.status === "ACTIVE"
                                            ? "destructive"
                                            : "default"
                                    }
                                    disabled={loadingId === student.id}
                                    onClick={() => handleToggle(student.id)}
                                >
                                    {loadingId === student.id
                                        ? "Processing..."
                                        : student.status === "ACTIVE"
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