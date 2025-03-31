import ProtectedRoute from "~/components/auth/ProtectedRoute";
import Navbar from "~/components/common/Navbar/Navbar";
import type { Route } from "./+types/product";
import MobileProductPage from "~/components/product/MobileProductPage";
import ProductPage from "~/components/product/ProductPage";
import { useFetchProduct } from "~/controllers/productController";

export function meta({ params }: Route.MetaArgs) {
    return [
        { title: `${params.productName} | DressAura` },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Product({ params }: Route.MetaArgs) {
    return (
        <ProtectedRoute>
            <Navbar />
            <ProductContainer productName={params.productName} />
        </ProtectedRoute>
    );
}

type Props = {
    productName: string;
};

const ProductContainer = ({ productName }: Props) => {
    const { data: product } = useFetchProduct(productName);
    if (product) {
        return (
            <div>
                <div className="hidden md:block">
                    <ProductPage product={product} />
                </div>

                <div className="block md:hidden">
                    <MobileProductPage product={product} />
                </div>
            </div>
        );
    }
};
