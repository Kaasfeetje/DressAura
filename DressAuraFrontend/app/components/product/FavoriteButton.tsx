import { FaRegHeart } from "react-icons/fa6";

type Props = {};

const FavoriteButton = (props: Props) => {
    return (
        <button>
            <FaRegHeart className="h-6 w-6" />
        </button>
    );
};

export default FavoriteButton;
