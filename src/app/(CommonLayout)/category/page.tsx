import CategoryCard from "@/src/components/modules/category/CategoryCard";
import { getAllCategory } from "@/src/services/getCategory";
import { getAllTutorProfilesByCategoryId } from "@/src/services/tutor";

export default async function Page() {
  const categories = await getAllCategory();
    const topCategories = categories.data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
      {topCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}