"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";

interface ProfileProps {
    profile: any;
}

export default function ProfileDetails({
    profile,
}: ProfileProps) {
    // console.log(profile)
    if (!profile) {
        return (
            <p className="text-center mt-10">
                No profile data found
            </p>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl">
                        My Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                    <p>
                        <strong>Name:</strong>{" "}
                        {profile.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {profile.email}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {profile.role}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {profile.status}
                    </p>
                </CardContent>
            </Card>

            {profile.tutorProfile && (
                <Card className="shadow-lg mt-6">
                    <CardHeader>
                        <CardTitle>
                            Published Session
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p>
                            <strong>Bio:</strong>{" "}
                            {profile.tutorProfile.bio}
                        </p>

                        <p>
                            <strong>Rate:</strong> ৳
                            {
                                profile.tutorProfile
                                    .hourlyRate
                            }
                        </p>

                        <p>
                            <strong>
                                Experience:
                            </strong>{" "}
                            {
                                profile.tutorProfile
                                    .experience
                            }{" "}
                            years
                        </p>

                        <p>
                            <strong>
                                Category:
                            </strong>{" "}
                            {
                                profile.tutorProfile
                                    .category?.name
                            }
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}