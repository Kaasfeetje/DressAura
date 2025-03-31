import { FaShoppingBag } from "react-icons/fa";

type Props = {};

const CartButton = (props: Props) => {
    return (
        <button
            className={`flex w-full max-w-sm cursor-pointer items-center gap-4 rounded-lg bg-black p-4 py-3 text-lg font-semibold text-white shadow-md transition duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none`}
        >
            <FaShoppingBag className="h-6 w-6" />
            Add to cart
        </button>
    );
};

export default CartButton;
