import { fetchProducts } from "@/api/productService";
import ProductCard from "./_components/Product/ProductCard";

export default async function Home() {
    const { data: products } = await fetchProducts();

    if (products) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full lg:max-w-5xl">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    }
    return <div>ERROR</div>;
}
