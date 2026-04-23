"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

import { updateTutorProfile } from "@/src/services/tutor";
import { getUserFromToken } from "@/src/services/auth";
import { getSingleUserProfile } from "@/src/services/userProfile";
import { getApiUrl } from "@/src/utils/apiConfig";

interface Category {
    id: string;
    name: string;
}

export default function UpdateProfileForm() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);

    const [formData, setFormData] = useState({
        bio: "",
        hourlyRate: "",
        experience: "",
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const user = await getUserFromToken();

            if (!user?.id) {
                toast.error("User not found");
                return;
            }

            const [catRes, profileRes] = await Promise.all([
                // এখানে getApiUrl() ব্যবহার করুন
                fetch(`${getApiUrl()}/categories`, {
                    credentials: "include",
                }),
                getSingleUserProfile(user.id),
            ]);

            const catData = await catRes.json();
            const profile = profileRes?.data;

            setCategories(catData?.data || []);

            if (profile?.tutorProfile) {
                const tutorProfile = profile.tutorProfile;

                setHasProfile(true);

                setFormData({
                    bio: tutorProfile.bio || "",
                    hourlyRate: String(tutorProfile.hourlyRate || ""),
                    experience: String(tutorProfile.experience || ""),
                });

                setSelectedCategory(tutorProfile.categoryId);
            } else {
                setHasProfile(false);
            }

            setIsDataLoaded(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load profile data");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            bio: formData.bio,
            hourlyRate: Number(formData.hourlyRate),
            experience: Number(formData.experience),
            categoryId: selectedCategory,
        };

        try {
            setLoading(true);

            const result = await updateTutorProfile(payload);

            if (!result.ok) {
                toast.error(
                    result.data?.message || "Failed to update profile"
                );
                return;
            }

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    if (!isDataLoaded) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    if (hasProfile === false) {
        return (
            <div className="text-center mt-10 space-y-4">
                <p className="text-lg font-medium text-red-500">
                    Please create profile first
                </p>

                <Button
                    onClick={() => router.push("/dashboard/create-profile")}
                    className="cursor-pointer"
                >
                    Go to Create Profile
                </Button>
            </div>
        );
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-6 p-6"
        >
            <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                    value={formData.bio}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            bio: e.target.value,
                        })
                    }
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label>Hourly Rate</Label>
                    <Input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                hourlyRate: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div>
                    <Label>Experience</Label>
                    <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                experience: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div>
                    <Label>Category</Label>

                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
            >
                {loading ? "Updating..." : "Update Profile"}
            </Button>
        </form>
    );
}