import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./reactQueryKeys";
import { makeApiRequest } from "./api";

export type ProductType = {
    id: number;
    name: string;
    description?: string;
    price: number;
    stockQuantity?: number;
    brand?: Brand;
    brandId?: number;
    categoryId?: number;
    category?: Category;
    thumbnailImage?: ImageType;
    thumbnailImageId?: number;
    images?: ImageType[];
    colors?: ColorType[];
    sizes?: SizeType[];
};

export type Category = {
    id: number;
    name: string;
};

export type Brand = {
    id: number;
    name: string;
};

export type ImageType = {
    id: number;
    imageUrl: string;
    fileName?: string;
    filePath?: string;
    contentType?: string;
    productId?: number;
    product?: ProductType;
};

export type ColorType = {
    id: number;
    name: string;
    hexValue: string;
};

export type SizeType = {
    id: number;
    name: string;
};

export const product = {
    id: 1,
    name: "Blauwe Broek met Wijde Pijpen",
    price: 49.95,
    category: {
        id: 1,
        name: "Kleding",
    },
    categoryId: 1,
    colors: [
        {
            id: 1,
            name: "Blue",
            hexValue: "#0000FF",
        },
        {
            id: 2,
            name: "Green",
            hexValue: "#00FF00",
        },
    ],
    description:
        "Op zoek naar een broek die comfortabel, ademend en duurzaam is? Zoek niet verder dan deze broek van Angelle Milan, specialist in travelkleding voor dames! Gemaakt van travelstof, is deze broek kreukherstellend en perfect voor elke actieve dag. Of je nu op het werk bent of aan het reizen, deze broek zal je comfortabel houden terwijl je er stijlvol uitziet. Bestel deze broek van Angelle Milan vandaag nog en voeg deze toe aan jouw kledingcollectie! De collectie van Angelle Milan is geschikt voor elke gelegenheid, of je nu een casual of chique look wilt. Onze heerlijke broeken zijn van hoge kwaliteit travelstof, strijkvrij en mooi vrouwelijk die je met veel stijlen kunt combineren. Deze broek is perfect voor de trendy vrouw die er elegant uit wilt zien, zonder in te leveren op comfort. De ademende en kreukherstellende travelstof is bovendien wasbaar in de wasmachine. Hierdoor kun jij er altijd stijlvol, fris en trendy uitzien terwijl je kleding heerlijk zit! Pasvorm De broek valt ruim. Bestel daarom een maat kleiner dan je gebruikelijke maat.",
    images: [
        {
            id: 1,
            imageUrl:
                "https://media.s-bol.com/xmGzmoGXXp4J/AR0vq9/484x1200.jpg",
        },
        {
            id: 2,
            imageUrl:
                "https://media.s-bol.com/BygXy1g3xrPx/AR0vq9/414x1200.jpg",
        },
        {
            id: 3,
            imageUrl:
                "https://media.s-bol.com/KRO7RAO30ZrJ/AR0vq9/330x1200.jpg",
        },
        {
            id: 4,
            imageUrl:
                "https://media.s-bol.com/BygXy1g44kYW/AR0vq9/885x1200.jpg",
        },
        {
            id: 5,
            imageUrl:
                "https://media.s-bol.com/DARZAwR44mV5/AR0vq9/832x1200.jpg",
        },
        {
            id: 6,
            imageUrl:
                "https://media.s-bol.com/JRZKREZ3Jq6v/AR0vq9/433x1200.jpg",
        },
        {
            id: 7,
            imageUrl:
                "https://media.s-bol.com/yn8Anp8YYqgV/AR0vq9/445x1200.jpg",
        },
    ],
    sizes: [
        { id: 1, name: "XS" },
        { id: 2, name: "S" },
        { id: 3, name: "M" },
        { id: 4, name: "L" },
        { id: 5, name: "XL" },
        { id: 6, name: "XXL" },
    ],
    thumbnailImage: {
        id: 1,
        imageUrl: "https://media.s-bol.com/xmGzmoGXXp4J/AR0vq9/484x1200.jpg",
    },
    thumbnailImageId: 1,
    brand: { id: 1, name: "Angelle Milan" },
    stockQuantity: 100,
} satisfies ProductType;

export const useFetchProducts = () => {
    return useQuery({
        queryKey: [queryKeys.products.fetchAll],
        queryFn: fetchProducts,
    });
};

export const fetchProducts = () => {
    return makeApiRequest<ProductType[]>("/api/products");
};

// export const useFetchProduct = (productName: string) => {
//     return useQuery({
//         queryKey: [queryKeys.products.fetchByName, productName],
//         queryFn: () => {
//             return fetchProduct(productName);
//         },
//     });
// };

export const fetchProduct = (productName: string) => {
    return makeApiRequest<ProductType>(`/api/products/${productName}`);
};
