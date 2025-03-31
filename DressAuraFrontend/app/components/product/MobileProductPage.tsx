import { product } from "~/controllers/productController";
import ProductHeader from "./ProductHeader";
import ProductImageViewer from "./ProductImageViewer";
import ColorChoice from "./ColorChoice";
import SizeChoice from "./SizeChoice";
import CartButton from "./CartButton";
import FavoriteButton from "./FavoriteButton";

type Props = {};

const MobileProductPage = (props: Props) => {
    return (
        <div className="mx-auto mt-2 max-w-7xl p-2 px-2">
            <ProductHeader product={product} />
            <div className="relative">
                <ProductImageViewer images={product.images} />
                <div className="absolute top-2 right-2">
                    <FavoriteButton />
                </div>
            </div>
            <div className="mt-2">
                <div className="flex flex-col gap-2">
                    <ColorChoice colors={product.colors} />
                    <SizeChoice sizes={product.sizes} />
                    <div className="text-lg font-semibold text-gray-800">
                        €{product.price}
                    </div>
                    <CartButton />
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Product description
                </h2>
                <p className="whitespace-pre-line">{product.description}</p>
            </div>
        </div>
    );
};

export default MobileProductPage;
