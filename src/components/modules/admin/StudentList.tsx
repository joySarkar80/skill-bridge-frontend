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
    const tutors: Student[] = studentsResponse?.data || [];

    return (
        <div className="space-y-4">
            {tutors.map((tutor) => (
                <Card key={tutor.id}>
                    <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                            <h2 className="font-semibold text-lg">
                                {tutor.name}
                            </h2>
                            <p>{tutor.email}</p>
                            <p>
                                Status:{" "}
                                <span className="font-medium">
                                    {tutor.status}
                                </span>
                            </p>
                        </div>

                        <Button variant="destructive">
                            {tutor.status === "ACTIVE"
                                ? "Ban"
                                : "Unbanned"}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}