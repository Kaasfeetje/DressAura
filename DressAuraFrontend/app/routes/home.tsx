import ProtectedRoute from "~/components/auth/ProtectedRoute";
import type { Route } from "./+types/home";
import { useFetchProducts } from "~/controllers/productController";
import Navbar from "~/components/common/Navbar/Navbar";

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
        <div className="">
            {products?.map((product) => (
                <div key={product.id}>{product.name}</div>
            ))}
        </div>
    );
};
