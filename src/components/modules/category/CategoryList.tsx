import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import { getAllCategory } from "@/src/services/getCategory";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";


interface Category {
    id: string;
    name: string;
    createdAt: string;
}

export default async function CategoryList() {
    const categoryResponse = await getAllCategory();
    const categories: Category[] = categoryResponse?.data || [];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Created At</TableHead>
                            {/* <TableHead className="text-right">Action</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono text-xs text-gray-500">
                                        {item.id.slice(0, 8)}...
                                    </TableCell>
                                    <TableCell className="font-medium capitalize">
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {/* <button className="text-sm text-blue-600 hover:underline">
                                            Edit
                                        </button> */}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}