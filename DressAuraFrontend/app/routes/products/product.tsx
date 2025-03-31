import ProtectedRoute from "~/components/auth/ProtectedRoute";
import Navbar from "~/components/common/Navbar/Navbar";
import type { Route } from "./+types/product";
import MobileProductPage from "~/components/product/MobileProductPage";
import ProductPage from "~/components/product/ProductPage";

export function meta({ params }: Route.MetaArgs) {
    return [
        { title: `${params.productName} | DressAura` },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Product() {
    return (
        <ProtectedRoute>
            <Navbar />
            <ProductContainer />
        </ProtectedRoute>
    );
}

const ProductContainer = () => {
    return (
        <div>
            <div className="hidden md:block">
                <ProductPage />
            </div>

            <div className="block md:hidden">
                <MobileProductPage />
            </div>
        </div>
    );
};
