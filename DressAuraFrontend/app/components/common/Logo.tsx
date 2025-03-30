type Props = {
    blackVariant?: boolean;
};

const Logo = ({ blackVariant }: Props) => {
    return (
        <h1
            className={`${
                blackVariant ? "text-black" : "text-white"
            } font-bold text-2xl`}
        >
            DressAura
        </h1>
    );
};

export default Logo;
