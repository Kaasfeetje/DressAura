import { useState } from "react";
import { FaBars, FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import NavbarMenu from "./NavbarMenu";
import Logo from "../Logo";
import MainCategories from "./MainCategories";
import type { IconType } from "react-icons";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white-600 shadow-lg">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center md:mr-12">
                            <Link to="/">
                                <Logo blackVariant />
                            </Link>
                        </div>
                        <OpenNavbarButton
                            toggleMenu={toggleMenu}
                            isMobile={false}
                        />
                        <div className="md:align-items hidden w-full md:flex md:w-auto">
                            <div className="flex w-full space-x-4">
                                <MainCategories />
                            </div>
                        </div>
                        <div className="ml-auto flex items-center">
                            <NavbarLink
                                href="/profile"
                                srText="Navigate to profile"
                                Icon={FaUser}
                            />
                            <NavbarLink
                                href="/favorites"
                                srText="Navigate to favorites"
                                Icon={FaHeart}
                            />
                            {/* TODO: Open cart overview on hover */}
                            <NavbarLink
                                href="/cart"
                                srText="Navigate to cart"
                                Icon={FaShoppingBag}
                            />
                        </div>
                    </div>
                    <OpenNavbarButton toggleMenu={toggleMenu} isMobile />
                </div>
            </div>

            <NavbarMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </nav>
    );
};

type OpenNavbarButtonProps = {
    toggleMenu: () => void;
    isMobile?: boolean;
};

const OpenNavbarButton = ({ toggleMenu, isMobile }: OpenNavbarButtonProps) => {
    return (
        <button
            onClick={toggleMenu}
            type="button"
            className={`group h-12 w-12 items-center justify-center rounded-md p-2 hover:cursor-pointer ${isMobile === false ? "hidden md:inline-flex" : ""} ${isMobile ? "inline-flex md:hidden" : "hidden"}`}
        >
            <span className="sr-only">Open main menu</span>
            <FaBars className="fill-gray-800 transition-all duration-200 group-hover:fill-gray-500" />
        </button>
    );
};

type NavbarLinkProps = {
    href: string;
    Icon: IconType;
    srText: string;
};

const NavbarLink = ({ href, srText, Icon }: NavbarLinkProps) => {
    return (
        <Link
            to={href}
            className={`group inline-flex h-12 w-12 items-center justify-center rounded-md p-2 hover:cursor-pointer`}
        >
            <span className="sr-only">{srText}</span>
            <Icon className="fill-gray-800 transition-all duration-200 group-hover:fill-gray-500" />
        </Link>
    );
};

export default Navbar;
