import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getAllStudents } from "@/src/services/admin";


interface Student {
    id: string;
    name: string;
    email: string;
    status: "ACTIVE" | "BANNED";
}

export default async function StudentList() {
    const studentsResponse = await getAllStudents();
    const students: Student[] = studentsResponse?.data || [];

    return (
        <div className="space-y-4">
            {students.map((student) => (
                <Card key={student.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                            <h2 className="font-semibold text-lg">
                                {student.name}
                            </h2>
                            <p>{student.email}</p>
                            <p>
                                Status:{" "}
                                <span className="font-medium">
                                    {student.status}
                                </span>
                            </p>
                        </div>

                        <Button variant="destructive">
                            {student.status === "ACTIVE"
                                ? "Ban"
                                : "Unbanned"}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}