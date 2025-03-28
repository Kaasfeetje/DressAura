import { ProductType } from "@/types/productTypes";
import { fetchData } from "./api";

export const fetchProducts = async () => {
    return fetchData<ProductType[]>("/api/products");
};

export const fetchProductById = async (id: number | string) => {
    return fetchData<ProductType>(`/api/products/${id}`);
};
