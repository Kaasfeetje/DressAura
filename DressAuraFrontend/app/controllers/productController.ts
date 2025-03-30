import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./reactQueryKeys";
import { makeApiRequest } from "./api";

export type ProductType = {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    size?: string;
    color?: string;
    stockQuantity?: number;
    categoryId?: number;
    category?: Category;
};

export type Category = {
    id: number;
    name: string;
};

export const useFetchProducts = () => {
    return useQuery({
        queryKey: [queryKeys.products.fetchAll],
        queryFn: () => {
            return makeApiRequest<ProductType[]>("/api/products");
        },
    });
};
