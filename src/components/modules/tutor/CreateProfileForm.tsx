"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { createTutorProfile } from "@/src/services/tutor";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

interface Category {
    id: string;
    name: string;
}

export default function CreateProfileForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                const data = await res.json();
                setCategories(data?.data || []);
            } catch (error) {
                toast.error("Failed to load categories");
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const payload = {
            bio: formData.get("bio"),
            hourlyRate: Number(formData.get("hourlyRate")),
            experience: Number(formData.get("experience")),
            categoryId: selectedCategory,
        };

        try {
            setLoading(true);

            const result = await createTutorProfile(payload);

            if (!result.ok) {
                toast.error(
                    result.data?.message || "Profile creation failed"
                );
                return;
            }

            toast.success("Profile created successfully");

            form.reset();
            setSelectedCategory("");
        } catch (error) {
            console.error("Create profile error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-6 p-6"
        >
            <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                    name="bio"
                    placeholder="Write your tutoring bio"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label>Hourly Rate</Label>
                    <Input
                        type="number"
                        name="hourlyRate"
                        required
                    />
                </div>

                <div>
                    <Label>Experience</Label>
                    <Input
                        type="number"
                        name="experience"
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
                {loading ? "Creating..." : "Create Profile"}
            </Button>
        </form>
    );
}