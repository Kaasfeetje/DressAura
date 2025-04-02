import Navbar from "~/components/common/Navbar/Navbar";
import type { Route } from "./+types/product";
import MobileProductPage from "~/components/product/MobileProductPage";
import ProductPage from "~/components/product/ProductPage";
import {
    fetchProduct,
    type ProductType,
} from "~/controllers/productController";

export function meta({ params }: Route.MetaArgs) {
    return [
        { title: `${params.productName} | DressAura` },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const product = await fetchProduct(params.productName);
        return { product };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { product: undefined };
    }
}

export default function Product({ loaderData }: Route.ComponentProps) {
    if (loaderData.product == undefined) {
        return <div>Something went wrong</div>;
    }
    return (
        <>
            <Navbar />
            <ProductContainer product={loaderData.product} />
        </>
    );
}

type Props = {
    product: ProductType;
};

const ProductContainer = ({ product }: Props) => {
    // const { data: product } = useFetchProduct(productName);
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
