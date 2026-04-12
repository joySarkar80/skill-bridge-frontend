// "use client";

// import { useState } from "react";
// import { toast } from "sonner";

// const CreateSessionForm = () => {
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (
//         e: React.FormEvent<HTMLFormElement>
//     ) => {
//         e.preventDefault();

//         const form = e.currentTarget;
//         const formData = new FormData(form);

//         const payload = {
//             bio: formData.get("bio"),
//             hourlyRate: Number(formData.get("hourlyRate")),
//             experience: Number(formData.get("experience")),
//             categoryId: formData.get("categoryId"),
//         };

//         try {
//             setLoading(true);

//             const res = await fetch("/api/tutor/profile", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const result = await res.json();

//             if (result.success) {
//                 toast.success("Session created successfully");
//                 form.reset();
//             } else {
//                 toast.error(result.message);
//             }
//         } catch {
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="space-y-4 max-w-lg"
//         >
//             <textarea
//                 name="bio"
//                 placeholder="Enter bio"
//                 required
//                 className="w-full border p-2 rounded"
//             />

//             <input
//                 type="number"
//                 name="hourlyRate"
//                 placeholder="Hourly Rate"
//                 required
//                 className="w-full border p-2 rounded"
//             />

//             <input
//                 type="number"
//                 name="experience"
//                 placeholder="Experience"
//                 required
//                 className="w-full border p-2 rounded"
//             />

//             <input
//                 type="text"
//                 name="categoryId"
//                 placeholder="Category ID"
//                 required
//                 className="w-full border p-2 rounded"
//             />

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-black text-white rounded"
//             >
//                 {loading ? "Creating..." : "Create Session"}
//             </button>
//         </form>
//     );
// };

// export default CreateSessionForm;



"use client";

import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
}

const days = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
];

export default function CreateSessionForm() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedDay, setSelectedDay] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] =
        useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("#");
            const data = await res.json();

            setCategories(data?.data || []);
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
            availability: {
                dayOfWeek: selectedDay,
                startTime: formData.get("startTime"),
                endTime: formData.get("endTime"),
            },
        };

        console.log(payload);

        await fetch("#", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-xl"
        >
            <textarea
                name="bio"
                placeholder="Enter bio"
                className="w-full border rounded p-2"
            />

            <input
                type="number"
                name="hourlyRate"
                placeholder="Hourly Rate"
                className="w-full border rounded p-2"
            />

            <input
                type="number"
                name="experience"
                placeholder="Experience"
                className="w-full border rounded p-2"
            />

            <div>
                <h2 className="font-semibold mb-2">
                    Select Category
                </h2>

                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category.id}
                                checked={
                                    selectedCategory === category.id
                                }
                                onChange={() =>
                                    setSelectedCategory(category.id)
                                }
                            />
                            {category.name}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold mb-2">
                    Select Day
                </h2>

                <div className="space-y-2">
                    {days.map((day) => (
                        <label
                            key={day.value}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="radio"
                                name="day"
                                checked={selectedDay === day.value}
                                onChange={() =>
                                    setSelectedDay(day.value)
                                }
                            />
                            {day.label}
                        </label>
                    ))}
                </div>
            </div>

            <input
                type="time"
                name="startTime"
                className="w-full border rounded p-2"
            />

            <input
                type="time"
                name="endTime"
                className="w-full border rounded p-2"
            />

            <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white"
            >
                Create Session
            </button>
        </form>
    );
}