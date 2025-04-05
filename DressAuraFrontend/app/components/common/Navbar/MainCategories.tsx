import { Link } from "react-router";

type Props = {
    isMobile?: boolean;
};

const MainCategories = ({ isMobile }: Props) => {
    return (
        <div
            className={`${isMobile ? "flex max-w-full md:hidden" : "ml-4 hidden md:flex"} text-lg text-gray-600`}
        >
            <CategoryItem href="/c/women" title="WOMEN" />
            <CategoryItem href="/c/men" title="MEN" />
            <CategoryItem href="/c/children" title="CHILDREN" />
            <CategoryItem href="/c/beauty" title="BEAUTY" />
        </div>
    );
};

type CategoryItemProps = {
    href: string;
    title: string;
};

const CategoryItem = ({ href, title }: CategoryItemProps) => {
    return (
        <div className="flex items-center px-4 hover:text-gray-900">
            <Link to={href}>{title}</Link>
        </div>
    );
};

export default MainCategories;
