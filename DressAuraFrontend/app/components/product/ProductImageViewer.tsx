import { useCallback, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import type { ImageType } from "~/controllers/productController";

type Props = {
    images: ImageType[] | undefined;
};

const ProductImageViewer = ({ images }: Props) => {
    const [index, setIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);

    if (!images || images.length === 0) {
        return <div>You need to get your stuff together</div>;
    }

    const checkScrollButtons = useCallback(() => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    }, []);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
            setTimeout(checkScrollButtons, 100);
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
            setTimeout(checkScrollButtons, 100);
        }
    };

    return (
        <div className="w-full max-w-[500px]">
            <div className="flex h-full w-full items-center justify-center">
                <img
                    className="h-full max-h-[500px] w-full max-w-[500px] object-contain"
                    src={images[index].imageUrl}
                />
            </div>
            <div className="relative px-10">
                <div ref={containerRef} className="flex gap-2 overflow-hidden">
                    {canScrollLeft && (
                        <ScrollButton
                            Icon={FaArrowCircleLeft}
                            onClick={scrollLeft}
                            isPrevious
                        />
                    )}
                    {images.map((image, idx) => (
                        <div
                            key={image.id}
                            className={`w-[100px] cursor-pointer rounded-md border ${index === idx ? "border-blue-600" : "border-gray-300 hover:border-gray-800"}`}
                            onClick={() => setIndex(idx)}
                        >
                            <img
                                className="max-h-[100px] min-h-[100px] max-w-[100px] min-w-[100px] object-contain"
                                src={image.imageUrl}
                                alt={"Product image"}
                            />
                        </div>
                    ))}
                    {canScrollRight && (
                        <ScrollButton
                            Icon={FaArrowCircleRight}
                            onClick={scrollRight}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

type ScrollButtonProps = {
    Icon: IconType;
    isPrevious?: boolean;
    onClick: () => void;
};

const ScrollButton = ({ Icon, isPrevious, onClick }: ScrollButtonProps) => {
    return (
        <button
            className={`translate absolute top-1/2 -translate-y-1/2 cursor-pointer ${isPrevious ? "left-2" : "right-2"} text-gray-800 hover:text-gray-500`}
            onClick={onClick}
        >
            <Icon className="h-10 w-10" />
        </button>
    );
};

export default ProductImageViewer;
