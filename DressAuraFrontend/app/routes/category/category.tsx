import {
    fetchCategory,
    type ProductType,
} from "~/controllers/productController";
import Navbar from "~/components/common/Navbar/Navbar";
import ProductCard from "~/components/product/ProductCard";
import type { Route } from "./+types/category";
import {
    Notification,
    NotificationType,
} from "~/components/common/Notification";
import { capitalizeFirstLetter } from "~/utils/helperFunction";

export function meta({ params }: Route.MetaArgs) {
    return [
        {
            title: `${capitalizeFirstLetter(params.categoryName)} Category | DressAura`,
        },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    try {
        console.log(params.categoryName);
        const products = await fetchCategory(params.categoryName);
        return { products };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { products: [], error: { message: "Could not find category" } };
    }
}

export default function Category({ loaderData }: Route.ComponentProps) {
    console.log(loaderData);
    return (
        <>
            {loaderData.error && (
                <Notification
                    type={NotificationType.Error}
                    message={loaderData.error.message}
                />
            )}
            <Navbar />
            <CategoryPage products={loaderData.products} />
        </>
    );
}

type Props = {
    products: ProductType[];
};

const CategoryPage = ({ products }: Props) => {
    return (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-2 pt-4 sm:px-6 md:pt-8 lg:px-8">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
