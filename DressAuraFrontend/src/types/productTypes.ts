import { CategoryType } from "./categoryTypes";

export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    size: string;
    color: string;
    stockQuantity: number;
    categoryId: number;
    category: CategoryType;
};
