import { FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router";
import type { ProductType } from "~/controllers/productController";

type Props = {
    product: ProductType;
};

const ProductCard = ({ product }: Props) => {
    return (
        <div className="relative w-48 overflow-hidden rounded-lg bg-white shadow-md md:w-64">
            <Link to={`/p/${product.name}`}>
                <img
                    src={product.thumbnailImage?.imageUrl}
                    alt={product.name}
                    className="h-64 w-full object-contain"
                />
            </Link>
            <div className="p-4">
                <Link to={`/p/${product.name}`} className="hover:underline">
                    <h3 className="truncate text-lg font-semibold text-gray-900">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2">
                    <p className="text-md font-bold text-gray-800">
                        € {product.price}
                    </p>
                </div>
                <button className="absolute top-2 right-4 flex cursor-pointer items-center justify-between">
                    <div className="flex items-center text-gray-500">
                        <FaRegHeart size={16} className="mr-1" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
