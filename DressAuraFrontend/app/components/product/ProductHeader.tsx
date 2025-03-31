import { Link } from "react-router";
import type { ProductType } from "~/controllers/productController";

type Props = {
    product: ProductType;
};

const ProductHeader = ({ product }: Props) => {
    return (
        <div className="">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="flex gap-4 text-gray-500">
                <div>
                    Brand:{" "}
                    <Link
                        to={`/b/${product.brand}`}
                        className="text-blue-600 underline"
                    >
                        {product.brand}
                    </Link>
                </div>
                <div>
                    <span className="text-gray-800">4.75/5</span> (3 reviews)
                </div>
            </div>
        </div>
    );
};

export default ProductHeader;
