import { fetchProductById } from "@/api/productService";
import React from "react";

type Props = {
    params: {
        id: string;
    };
};

const ProductPage = async ({ params: { id } }: Props) => {
    const { data: product, error } = await fetchProductById(id);

    if (error) {
        return <div>Error</div>;
    }

    return (
        <div>
            <h1>{product?.name}</h1>
        </div>
    );
};

export default ProductPage;
