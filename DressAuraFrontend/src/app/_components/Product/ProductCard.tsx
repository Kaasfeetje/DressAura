import { ProductType } from "@/types/productTypes";
import Link from "next/link";
import React from "react";

type Props = {
    product: ProductType;
};

const ProductCard = ({ product }: Props) => {
    return (
        <div className="rounded-lg p-4">
            {/* Product Image */}
            <Link href={`/product/${product.id}`}>
                <img
                    src={"https://placehold.co/300x450"}
                    alt={product.name}
                    className="w-full object-cover rounded-t-md aspect-[2/3]"
                />
            </Link>

            {/* Product Info */}
            <div className="">
                <Link href={`/product/${product.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:underline">
                        {product.name}
                    </h2>
                </Link>
                <div className="mt-2 text-green-600">
                    <p>From </p>
                    <span className="text-xl font-bold">${product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
