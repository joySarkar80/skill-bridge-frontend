import Reviews from "@/src/components/modules/review/Reviews";
import { getReviews } from "@/src/services/review";

export default async function Page() {
    const reviewsForPrivate = await getReviews();
    return <Reviews reviews={reviewsForPrivate?.data || []} />
}