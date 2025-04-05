import { Link } from "react-router";
import Logo from "../Logo";
import { FaX } from "react-icons/fa6";
import MainCategories from "./MainCategories";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const NavbarMenu = ({ isOpen, onClose }: Props) => {
    return (
        <div
            className={`fixed top-0 z-10 h-full w-full transition-colors duration-200 ${isOpen ? "left-0 bg-black/50" : "-left-full bg-black/0"}`}
            onClick={onClose}
        >
            <div
                className={`fixed h-full w-full bg-white transition-all duration-200 md:w-1/2 ${isOpen ? "left-0" : "-left-full"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-2 md:justify-start md:p-4">
                    <Link to="/" className="md:hidden">
                        <Logo blackVariant />
                    </Link>
                    <button
                        className="group flex h-12 w-12 items-center justify-center hover:cursor-pointer"
                        onClick={onClose}
                    >
                        <FaX className="fill-gray-800 transition-all duration-200 group-hover:fill-gray-500" />
                    </button>
                    <MainCategories />
                </header>
                <MainCategories isMobile />
                <div className="mx-4 mt-10">
                    <Link to="/new" className="mb-6 block text-xl md:mb-2">
                        NEW
                    </Link>
                    <Link
                        to="/last-chance"
                        className="mb-6 block text-xl md:mb-2"
                    >
                        LAST CHANCE
                    </Link>
                    <Link to="/c/clothing" className="mt-10 mb-6 block md:mb-2">
                        CLOTHING
                    </Link>
                    <Link to="/c/accessories" className="mb-6 block md:mb-2">
                        ACCESSORIES
                    </Link>
                    <Link to="/c/shoes" className="mb-6 block md:mb-2">
                        SHOES
                    </Link>
                    <Link to="/c/beauty" className="mb-6 block md:mb-2">
                        BEAUTY
                    </Link>
                    <Link to="/c/sport" className="mb-6 block md:mb-2">
                        SPORT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavbarMenu;
