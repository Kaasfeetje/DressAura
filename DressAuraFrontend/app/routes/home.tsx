import type { Route } from "./+types/home";
import {
    fetchProducts,
    type ProductType,
} from "~/controllers/productController";
import Navbar from "~/components/common/Navbar/Navbar";
import ProductCard from "~/components/product/ProductCard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const products = await fetchProducts();
        return { products };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { products: [] };
    }
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <Navbar />
            <HomePage products={loaderData.products} />
        </>
    );
}

type Props = {
    products: ProductType[];
};

const HomePage = ({ products }: Props) => {
    return (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-2 pt-4 sm:px-6 md:pt-8 lg:px-8">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
