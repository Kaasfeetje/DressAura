import ProtectedRoute from "~/components/auth/ProtectedRoute";
import type { Route } from "./+types/home";
import { useFetchProducts } from "~/controllers/productController";
import Navbar from "~/components/common/Navbar/Navbar";
import ProductCard from "~/components/product/ProductCard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home | DressAura" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <ProtectedRoute>
            <Navbar />
            <HomePage />
        </ProtectedRoute>
    );
}

const HomePage = () => {
    const { data: products } = useFetchProducts();
    return (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-2 pt-4 sm:px-6 md:pt-8 lg:px-8">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
